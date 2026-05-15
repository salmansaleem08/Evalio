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
    name: "Now — Pilot",
    tag: "Current",
    description:
      "Invite-only access for partner schools. Core upload-and-grade flow with up to 5 papers per run.",
    features: [
      "Email sign-up for invited teachers",
      "PDF & image answer sheets",
      "Marking scheme upload",
      "Per-question marks & feedback",
    ],
    cta: "Join pilot",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Next — Schools",
    tag: "Coming",
    description:
      "Institution accounts, batch processing, and admin dashboards for heads of department.",
    features: [
      "Whole-class uploads",
      "Shared marking schemes",
      "Export to spreadsheets",
      "Usage analytics",
    ],
    cta: "Request access",
    href: "#waitlist",
    highlighted: false,
  },
  {
    name: "Future — Platform",
    tag: "Vision",
    description:
      "Full assessment lifecycle: item banks, moderation, parent reports, and LMS integrations.",
    features: [
      "Custom rubrics",
      "Blind double-marking aids",
      "API for SIS systems",
      "Multi-language papers",
    ],
    cta: "Stay updated",
    href: "#waitlist",
    highlighted: false,
  },
];

export function Plans() {
  return (
    <section id="roadmap" className="border-t bg-muted/30 px-6 py-20 md:py-28">
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
            We are shipping fast with schools in the loop — starting with a focused
            pilot, then scaling what teachers actually need.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {phases.map((phase) => (
            <Card
              key={phase.name}
              className={
                phase.highlighted
                  ? "border-primary/40 shadow-md ring-1 ring-primary/20"
                  : ""
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
                    <li key={f} className="flex gap-2 text-sm">
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
