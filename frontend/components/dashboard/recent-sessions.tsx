import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GradingSession } from "@/lib/types/grading";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

export function RecentSessions({ sessions }: { sessions: GradingSession[] }) {
  const recent = sessions.slice(0, 6);

  return (
    <Card className="border-border/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent results</CardTitle>
          <CardDescription>Your latest paper check sessions</CardDescription>
        </div>
        <Link href="/dashboard/sessions/new">
          <Button size="sm">New check</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No paper checks yet. Start your first session to see results here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((session) => (
              <li key={session.id}>
                <Link
                  href={`/dashboard/sessions/${session.id}`}
                  className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-muted/40 -mx-2 px-2 rounded-lg"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{session.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(session.created_at).toLocaleDateString()}
                      <span className="mx-1">·</span>
                      {statusLabel[session.status] ?? session.status}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
