import { FileCheck, FileUp, Sparkles } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";

const steps = [
  {
    step: "01",
    icon: FileUp,
    title: "Upload papers",
    description:
      "Add up to five scanned student answer sheets — PDF or image — plus your marking scheme (model answers).",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "AI reads & compares",
    description:
      "Our system extracts every answer, matches it to your scheme, and applies consistent criteria across all students.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Review results",
    description:
      "Get per-question marks, totals, and written feedback for each student — ready to export or adjust.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Simple workflow
          </p>
          <GradientHeading
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Three steps from stack to scored
          </GradientHeading>
          <p className="mt-4 text-muted-foreground">
            Teacher uploads papers and answer key → system grades everything →
            teacher gets results.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-5xl font-bold text-primary/15">
                {item.step}
              </span>
              <item.icon className="mt-4 size-8 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
