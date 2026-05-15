import { notFound } from "next/navigation";

import { SessionResults } from "@/components/dashboard/session-results";
import { serverApiFetch } from "@/lib/api/server";
import type {
  GradingResult,
  GradingSession,
  SessionPaper,
} from "@/lib/types/grading";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await serverApiFetch<{
    session: GradingSession;
    papers: SessionPaper[];
    results: GradingResult[];
  }>(`/sessions/${id}`);

  if (!data?.session) {
    notFound();
  }

  return (
    <SessionResults
      session={data.session}
      papers={data.papers}
      results={data.results}
    />
  );
}
