"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { apiFetch } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  GradingResult,
  GradingSession,
  SessionPaper,
} from "@/lib/types/grading";

export function SessionResults({
  session,
  papers,
  results,
}: {
  session: GradingSession;
  papers: SessionPaper[];
  results: GradingResult[];
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const paperMap = Object.fromEntries(papers.map((p) => [p.id, p]));

  async function handleDelete() {
    if (!confirm("Delete this paper check and all results?")) return;
    setDeleting(true);
    try {
      await apiFetch(`/sessions/${session.id}`, { method: "DELETE" });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  const statusColors: Record<string, string> = {
    completed: "text-primary",
    processing: "text-muted-foreground",
    failed: "text-destructive",
    draft: "text-muted-foreground",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{session.title}</h1>
          <p className={`mt-1 text-sm capitalize ${statusColors[session.status] ?? ""}`}>
            Status: {session.status}
          </p>
          {session.error_message && (
            <p className="mt-2 text-sm text-destructive">{session.error_message}</p>
          )}
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
          className="gap-2"
        >
          <Trash2 className="size-4" />
          Delete session
        </Button>
      </div>

      {results.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {session.status === "processing"
              ? "Grading in progress…"
              : "No results yet. Complete a paper check to see marks here."}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Per-student marks and feedback for this session
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Student</th>
                  <th className="pb-3 pr-4 font-medium">Score</th>
                  <th className="pb-3 pr-4 font-medium">%</th>
                  <th className="pb-3 font-medium">Summary</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => {
                  const paper = paperMap[result.paper_id];
                  return (
                    <tr key={result.id} className="border-b border-border/60">
                      <td className="py-4 pr-4 font-medium">
                        {paper?.label ?? "Student"}
                      </td>
                      <td className="py-4 pr-4">
                        {result.total_score ?? "-"} / {result.max_score ?? "-"}
                      </td>
                      <td className="py-4 pr-4">
                        {result.percentage != null
                          ? `${result.percentage}%`
                          : "-"}
                      </td>
                      <td className="py-4 text-muted-foreground">
                        {result.feedback_summary ?? "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {results.map((result) => {
        const paper = paperMap[result.paper_id];
        const questions = result.question_breakdown ?? [];
        if (!questions.length) return null;
        return (
          <Card key={`detail-${result.id}`}>
            <CardHeader>
              <CardTitle className="text-lg">{paper?.label ?? "Student"}</CardTitle>
              <CardDescription>Question breakdown</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-3 font-medium">Question</th>
                    <th className="pb-2 pr-3 font-medium">Marks</th>
                    <th className="pb-2 font-medium">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, i) => (
                    <tr key={i} className="border-b border-border/40">
                      <td className="py-3 pr-3 font-medium">{q.question}</td>
                      <td className="py-3 pr-3">
                        {q.score} / {q.max}
                      </td>
                      <td className="py-3 text-muted-foreground">{q.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
