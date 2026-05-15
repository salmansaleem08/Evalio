import { FileCheck, FileUp, Sparkles } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";

const steps = [
  {
    step: "01",
    icon: FileUp,
    title: "Upload student work",
    description:
      "Add scanned or photographed answer sheets alongside your completed marking guide.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Every answer is reviewed",
    description:
      "Each response is read and matched against your marking guide with the same criteria for every student.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Receive marks and feedback",
    description:
      "Review per-question scores, totals, and written comments you can share or adjust before returning papers.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            How it works
          </p>
          <GradientHeading
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            From paper stack to marked class
          </GradientHeading>
          <p className="mt-4 text-muted-foreground">
            A simple flow designed around how schools already run exams: upload,
            grade, and return work with confidence.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border border-border/80 bg-card/80 p-8 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
            >
              <span className="text-5xl font-bold text-primary/20">
                {item.step}
              </span>
              <item.icon className="mt-4 size-8 text-primary" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
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
