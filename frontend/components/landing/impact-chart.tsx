"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { label: "Manual marking", hours: 120, fill: "oklch(0.55 0 0)" },
  { label: "With Evalio", hours: 12, fill: "#00b67b" },
];

export function ImpactChart() {
  return (
    <section className="border-t border-border/60 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Impact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hours back for your faculty every season
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Schools, colleges, and universities typically spend weeks on a single
              exam cycle. Evalio compresses that workload so staff can return papers
              faster and focus on teaching.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>Illustrative comparison for a class of ~100 scripts</li>
              <li>Faster turnaround for students and parents</li>
              <li>More consistent marking across the cohort</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm backdrop-blur-sm md:p-6">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Staff hours per exam cycle (illustrative)
            </p>
            <ChartBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartBlock() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--foreground)" }}
          />
          <Bar dataKey="hours" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
