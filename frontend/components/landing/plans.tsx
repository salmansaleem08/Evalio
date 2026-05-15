import {
  Building2,
  Check,
  Layers,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { GradientHeading } from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = {
  name: string;
  tag: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
  icon: LucideIcon;
  step: number;
};

const phases: Phase[] = [
  {
    step: 1,
    name: "Pilot",
    tag: "Current",
    icon: Rocket,
    description:
      "Invite-only access for partner schools. Experience the core grading flow with a focused, hands-on rollout.",
    features: [
      "Up to 5 student scripts per grading session",
      "Email access for invited teachers",
      "Upload marking guides and answer sheets",
      "Per-question marks and written feedback",
    ],
    cta: "Join pilot",
    href: "/signup",
    highlighted: true,
  },
  {
    step: 2,
    name: "Schools",
    tag: "Coming",
    icon: Building2,
    description:
      "Institution accounts, batch processing, and leadership dashboards for departments and principals.",
    features: [
      "Whole-class uploads",
      "Shared marking guides across teams",
      "Export results for records",
      "Visibility for school leaders",
    ],
    cta: "Request access",
    href: "#waitlist",
    highlighted: false,
  },
  {
    step: 3,
    name: "Platform",
    tag: "Vision",
    icon: Layers,
    description:
      "The full assessment journey: item banks, moderation workflows, parent summaries, and deeper school-wide reporting.",
    features: [
      "Custom rubrics and schemes",
      "Moderation and quality checks",
      "Parent-friendly summaries",
      "Fits alongside your school systems",
    ],
    cta: "Stay updated",
    href: "#waitlist",
    highlighted: false,
  },
];

function StepBadge({
  step,
  tag,
  highlighted,
}: {
  step: number;
  tag: string;
  highlighted: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
          highlighted
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground",
        )}
      >
        {tag}
      </span>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        Step {step}
      </span>
    </div>
  );
}

function RoadmapCard({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 md:p-7",
        phase.highlighted
          ? "border-primary/50 bg-card shadow-lg shadow-primary/10 ring-1 ring-primary/25 lg:-translate-y-2"
          : "border-border/80 bg-card/90 shadow-sm hover:border-primary/30 hover:shadow-md backdrop-blur-sm",
      )}
    >
      <div
        className="absolute -top-10 left-1/2 hidden size-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_12px_rgba(0,182,123,0.5)] lg:block"
        aria-hidden
      />

      <StepBadge step={phase.step} tag={phase.tag} highlighted={phase.highlighted} />

      <div
        className={cn(
          "mb-5 flex size-14 items-center justify-center rounded-2xl transition-colors",
          phase.highlighted
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-primary/10 text-primary group-hover:bg-primary/15",
        )}
      >
        <Icon className="size-7" strokeWidth={1.75} />
      </div>

      <h3 className="text-xl font-semibold text-foreground">{phase.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {phase.description}
      </p>

      <ul className="mt-6 space-y-3 border-t border-border/60 pt-6">
        {phase.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-foreground">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-3 text-primary" strokeWidth={2.5} />
            </span>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={phase.href} className="mt-8 block">
        <Button
          variant={phase.highlighted ? "default" : "outline"}
          className="h-11 w-full"
        >
          {phase.cta}
        </Button>
      </Link>

      {index < phases.length - 1 && (
        <div
          className="absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 bg-border lg:hidden"
          aria-hidden
        />
      )}
    </article>
  );
}

export function Plans() {
  return (
    <section id="roadmap" className="relative overflow-hidden px-6 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,182,123,0.08),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(93,255,200,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Roadmap
          </p>
          <GradientHeading
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Where we are headed
          </GradientHeading>
          <p className="mt-4 text-muted-foreground">
            We are building alongside schools, starting with a focused pilot and
            expanding based on what teachers and leaders ask for most.
          </p>
        </div>

        <div className="relative mx-auto mt-16 hidden max-w-4xl lg:block" aria-hidden>
          <div className="absolute left-[16.67%] right-[16.67%] top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          <div className="flex justify-between px-[8%]">
            {phases.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.step}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-primary/30 bg-card shadow-sm"
                >
                  <PhaseIcon className="size-4 text-primary" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-10 grid gap-8 lg:mt-6 lg:grid-cols-3 lg:gap-6">
          {phases.map((phase, index) => (
            <RoadmapCard key={phase.name} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
