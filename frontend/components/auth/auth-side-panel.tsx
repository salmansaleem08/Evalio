import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Upload up to 5 student answer sheets per session",
  "Add your marking scheme — PDF, scan, or typed",
  "AI reads every answer and compares to your model",
  "Per-question marks and feedback in minutes",
  "Built for teachers drowning in exam cycles",
];

export function AuthSidePanel() {
  return (
    <aside className="relative hidden h-full flex-col justify-between overflow-hidden bg-secondary p-10 text-secondary-foreground lg:flex lg:p-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#00b67b33,_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 space-y-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Evalio
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
          Give teachers their weekends back
        </h2>
        <p className="max-w-md text-base text-secondary-foreground/80">
          Every exam cycle, educators spend weeks manually checking hundreds of
          papers. Evalio automates reading, comparison, and grading — so you
          focus on teaching, not marking.
        </p>
        <ul className="space-y-4">
          {highlights.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-secondary-foreground/90">{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="relative z-10 text-xs text-secondary-foreground/50">
        Pilot program · Invited institutions only
      </p>
    </aside>
  );
}
