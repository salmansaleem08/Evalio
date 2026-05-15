const stats = [
  { value: "Weeks", label: "Typical time schools lose per exam season" },
  { value: "Minutes", label: "Target time to return marked work with Evalio" },
  { value: "100%", label: "Focus on fair, consistent feedback for every student" },
];

export function StatsBar() {
  return (
    <section className="border-y border-border/60 bg-card/50 px-6 py-14 backdrop-blur-sm dark:bg-card/30">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
