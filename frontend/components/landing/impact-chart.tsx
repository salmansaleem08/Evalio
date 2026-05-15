"use client";

import dynamic from "next/dynamic";

const ImpactChartInner = dynamic(
  () =>
    import("@/components/landing/impact-chart-inner").then(
      (m) => m.ImpactChartInner,
    ),
  {
    ssr: false,
    loading: () => (
      <ChartLoadingPlaceholder />
    ),
  },
);

function ChartLoadingPlaceholder() {
  return (
    <div className="flex h-[280px] w-full items-center justify-center rounded-lg bg-muted/30 text-sm text-muted-foreground">
      Loading chart…
    </div>
  );
}

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
            <p className="mt-4 leading-relaxed text-muted-foreground">
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
            <ImpactChartInner />
          </div>
        </div>
      </div>
    </section>
  );
}
