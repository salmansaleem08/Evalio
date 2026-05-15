import json
import re

import google.generativeai as genai

from app.config import settings

SYSTEM_PROMPT = """You are an expert exam marker. Compare each student script to the marking scheme.
Return ONLY valid JSON (no markdown fences) with this shape:
{
  "students": [
    {
      "label": "Student 1",
      "total_score": 42,
      "max_score": 50,
      "percentage": 84,
      "questions": [
        {
          "question": "Q1",
          "score": 8,
          "max": 10,
          "feedback": "Brief constructive feedback"
        }
      ],
      "summary": "One paragraph overall feedback"
    }
  ]
}
Be fair, consistent, and align strictly with the marking scheme."""


def grade_scripts(marking_key_text: str, students: list[dict]) -> list[dict]:
    if not settings.gemini_api_key:
        raise ValueError("GEMINI_API_KEY is not configured")

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")

    payload = {
        "marking_scheme": marking_key_text,
        "student_scripts": [
            {"label": s["label"], "text": s["text"]} for s in students
        ],
    }

    prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"Marking scheme:\n{marking_key_text}\n\n"
        f"Student scripts (JSON):\n{json.dumps(payload['student_scripts'], ensure_ascii=False)}"
    )

    response = model.generate_content(prompt)
    raw = (response.text or "").strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    data = json.loads(raw)
    return data.get("students", [])
