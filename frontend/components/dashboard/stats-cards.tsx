import { BarChart3, CheckCircle2, FileText, Percent } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardStats } from "@/lib/types/grading";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const items = [
    {
      label: "Paper checks",
      value: stats.total_sessions,
      icon: FileText,
    },
    {
      label: "Completed",
      value: stats.completed_sessions,
      icon: CheckCircle2,
    },
    {
      label: "Scripts graded",
      value: stats.papers_graded,
      icon: BarChart3,
    },
    {
      label: "Class average",
      value:
        stats.average_percentage != null
          ? `${stats.average_percentage}%`
          : "N/A",
      icon: Percent,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="border-border/80 bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
            <item.icon className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
