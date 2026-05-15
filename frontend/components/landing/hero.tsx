"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#00b67b22,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 size-[28rem] rounded-full bg-secondary/5 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          AI-powered exam checking for schools
        </span>

        <GradientHeading className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Stop spending weeks on every exam cycle
        </GradientHeading>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Evalio reads scanned student papers, compares every answer to your
          marking scheme, and returns detailed marks and feedback — in minutes,
          not weeks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/signup">
            <Button size="lg" className="h-11 gap-2 px-8">
              Start grading free
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="h-11 px-8 shadow-xs">
              See how it works
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Pilot program · Up to 5 papers per session · Invited schools
        </motion.p>
      </motion.div>
    </section>
  );
}
