import Link from "next/link";

import { QuoteBanner } from "@/components/dashboard/quote-banner";
import { RecentSessions } from "@/components/dashboard/recent-sessions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { serverApiFetch } from "@/lib/api/server";
import type { DashboardStats, GradingSession } from "@/lib/types/grading";

export default async function DashboardPage() {
  const stats = (await serverApiFetch<DashboardStats>("/sessions/stats")) ?? {
    total_sessions: 0,
    completed_sessions: 0,
    papers_graded: 0,
    average_percentage: null,
  };

  const sessionsData = await serverApiFetch<{ sessions: GradingSession[] }>(
    "/sessions",
  );
  const sessions = sessionsData?.sessions ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your marking activity and open recent paper checks.
          </p>
        </div>
        <Link href="/dashboard/sessions/new">
          <Button className="h-11">New paper check</Button>
        </Link>
      </div>

      <QuoteBanner />
      <StatsCards stats={stats} />
      <RecentSessions sessions={sessions} />
    </div>
  );
}
