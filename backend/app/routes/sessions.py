from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

from app.config import settings
from app.deps.auth import get_current_user_id
from app.services.db import get_supabase
from app.services.gemini_grade import grade_scripts
from app.services.pdf_extract import extract_text_from_pdf

router = APIRouter(prefix="/sessions", tags=["sessions"])


class CreateSessionBody(BaseModel):
    title: str = "New paper check"


@router.get("")
def list_sessions(user_id: str = Depends(get_current_user_id)):
    sb = get_supabase()
    rows = (
        sb.table("grading_sessions")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    return {"sessions": rows.data or []}


@router.get("/stats")
def dashboard_stats(user_id: str = Depends(get_current_user_id)):
    sb = get_supabase()
    sessions = (
        sb.table("grading_sessions")
        .select("id, status")
        .eq("user_id", user_id)
        .execute()
    ).data or []

    session_ids = [s["id"] for s in sessions]
    results: list[dict] = []
    if session_ids:
        results = (
            sb.table("grading_results")
            .select("percentage, session_id")
            .in_("session_id", session_ids)
            .execute()
        ).data or []

    completed = [s for s in sessions if s.get("status") == "completed"]
    percentages = [float(r["percentage"]) for r in results if r.get("percentage") is not None]

    return {
        "total_sessions": len(sessions),
        "completed_sessions": len(completed),
        "papers_graded": len(results),
        "average_percentage": round(sum(percentages) / len(percentages), 1)
        if percentages
        else None,
    }


@router.post("")
def create_session(
    body: CreateSessionBody,
    user_id: str = Depends(get_current_user_id),
):
    sb = get_supabase()
    row = (
        sb.table("grading_sessions")
        .insert({"user_id": user_id, "title": body.title, "status": "draft"})
        .execute()
    )
    return {"session": row.data[0]}


@router.get("/{session_id}")
def get_session(session_id: str, user_id: str = Depends(get_current_user_id)):
    session = _get_owned_session(session_id, user_id)
    sb = get_supabase()
    papers = (
        sb.table("session_papers")
        .select("*")
        .eq("session_id", session_id)
        .order("sort_order")
        .execute()
    ).data or []
    results = (
        sb.table("grading_results")
        .select("*")
        .eq("session_id", session_id)
        .execute()
    ).data or []
    return {"session": session, "papers": papers, "results": results}


@router.delete("/{session_id}")
def delete_session(session_id: str, user_id: str = Depends(get_current_user_id)):
    _get_owned_session(session_id, user_id)
    sb = get_supabase()
    sb.table("grading_sessions").delete().eq("id", session_id).execute()
    return {"ok": True}


@router.post("/{session_id}/papers")
async def upload_papers(
    session_id: str,
    user_id: str = Depends(get_current_user_id),
    files: list[UploadFile] = File(...),
):
    _get_owned_session(session_id, user_id)
    if len(files) > settings.max_student_sheets:
        raise HTTPException(
            status_code=400,
            detail=f"Maximum {settings.max_student_sheets} student PDFs allowed",
        )

    sb = get_supabase()
    sb.table("session_papers").delete().eq("session_id", session_id).execute()

    inserted = []
    for index, upload in enumerate(files):
        if not upload.filename or not upload.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")
        content = await upload.read()
        text = extract_text_from_pdf(content, upload.filename or "student.pdf")
        if not text:
            raise HTTPException(
                status_code=400,
                detail=f"Could not extract text from {upload.filename}. Use a text-based PDF.",
            )
        label = upload.filename.replace(".pdf", "").replace(".PDF", "")
        row = (
            sb.table("session_papers")
            .insert(
                {
                    "session_id": session_id,
                    "label": label or f"Student {index + 1}",
                    "file_name": upload.filename,
                    "extracted_text": text,
                    "sort_order": index,
                }
            )
            .execute()
        )
        inserted.append(row.data[0])

    return {"papers": inserted}


@router.post("/{session_id}/marking-key")
async def upload_marking_key(
    session_id: str,
    user_id: str = Depends(get_current_user_id),
    file: UploadFile = File(...),
):
    _get_owned_session(session_id, user_id)
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Marking key must be a PDF")

    content = await file.read()
    text = extract_text_from_pdf(content, file.filename or "marking-key.pdf")
    if not text:
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from marking key. Use a text-based PDF.",
        )

    sb = get_supabase()
    row = (
        sb.table("grading_sessions")
        .update({"marking_key_text": text})
        .eq("id", session_id)
        .execute()
    )
    return {"session": row.data[0]}


@router.post("/{session_id}/grade")
def run_grading(session_id: str, user_id: str = Depends(get_current_user_id)):
    session = _get_owned_session(session_id, user_id)
    sb = get_supabase()

    sb.table("grading_sessions").update({"status": "processing", "error_message": None}).eq(
        "id", session_id
    ).execute()

    try:
        papers = (
            sb.table("session_papers")
            .select("*")
            .eq("session_id", session_id)
            .order("sort_order")
            .execute()
        ).data or []

        if not papers:
            raise HTTPException(status_code=400, detail="Upload student papers first")

        marking_key = session.get("marking_key_text")
        if not marking_key:
            raise HTTPException(status_code=400, detail="Upload marking key first")

        students_input = [
            {"label": p["label"], "text": p["extracted_text"]} for p in papers
        ]
        graded = grade_scripts(marking_key, students_input)

        sb.table("grading_results").delete().eq("session_id", session_id).execute()

        for index, item in enumerate(graded):
            paper = papers[index] if index < len(papers) else None
            if not paper:
                label = item.get("label", "")
                paper = next(
                    (p for p in papers if p["label"] == label),
                    None,
                )
            if not paper:
                continue

            sb.table("grading_results").insert(
                {
                    "session_id": session_id,
                    "paper_id": paper["id"],
                    "total_score": item.get("total_score"),
                    "max_score": item.get("max_score"),
                    "percentage": item.get("percentage"),
                    "question_breakdown": item.get("questions", []),
                    "feedback_summary": item.get("summary", ""),
                }
            ).execute()

        sb.table("grading_sessions").update({"status": "completed"}).eq(
            "id", session_id
        ).execute()

        return get_session(session_id, user_id)

    except Exception as exc:
        sb.table("grading_sessions").update(
            {"status": "failed", "error_message": str(exc)[:500]}
        ).eq("id", session_id).execute()
        raise HTTPException(status_code=500, detail=str(exc)) from exc


def _get_owned_session(session_id: str, user_id: str) -> dict:
    sb = get_supabase()
    rows = (
        sb.table("grading_sessions")
        .select("*")
        .eq("id", session_id)
        .eq("user_id", user_id)
        .execute()
    ).data or []
    if not rows:
        raise HTTPException(status_code=404, detail="Session not found")
    return rows[0]
