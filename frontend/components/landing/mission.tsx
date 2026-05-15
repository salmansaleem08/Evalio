import { Heart, Target, Users } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "Free teachers from the repetitive burden of manual marking so they can invest time where it matters: in the classroom and with students.",
  },
  {
    icon: Heart,
    title: "The problem",
    description:
      "Every exam season, educators check hundreds of handwritten papers by hand. It is slow, inconsistent, and burns out the people who shape the next generation.",
  },
  {
    icon: Users,
    title: "Who we serve",
    description:
      "Schools, colleges, universities, and tutoring centres that run formal assessments and need fair, fast grading their teams can trust.",
  },
];

export function Mission() {
  return (
    <section id="mission" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Why Evalio exists
          </p>
          <GradientHeading
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Built for educators who lead with care
          </GradientHeading>
          <p className="mt-4 text-muted-foreground">
            We believe marking should not steal evenings and weekends from the
            people who change lives every day.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <Card key={item.title} className="border-border/80 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <item.icon className="mb-2 size-8 text-primary" />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
