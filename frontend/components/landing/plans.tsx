import { Check } from "lucide-react";
import Link from "next/link";

import { GradientHeading } from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const phases = [
  {
    name: "Pilot",
    tag: "Current",
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
    name: "Schools",
    tag: "Coming",
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
    name: "Platform",
    tag: "Vision",
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

export function Plans() {
  return (
    <section id="roadmap" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {phases.map((phase) => (
            <Card
              key={phase.name}
              className={
                phase.highlighted
                  ? "border-primary/40 bg-card/90 shadow-md ring-1 ring-primary/20 backdrop-blur-sm"
                  : "border-border/80 bg-card/80 backdrop-blur-sm"
              }
            >
              <CardHeader>
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {phase.tag}
                </span>
                <CardTitle className="text-xl">{phase.name}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {phase.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {phase.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={phase.href} className="w-full">
                  <Button
                    variant={phase.highlighted ? "default" : "outline"}
                    className="h-11 w-full"
                  >
                    {phase.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
