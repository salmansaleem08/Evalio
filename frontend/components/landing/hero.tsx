"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-12 md:pb-36 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <Logo size="lg" className="mb-10 flex-col gap-3 sm:flex-row" />

        <span className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground dark:border-primary/30 dark:bg-primary/10">
          Exam marking for schools, colleges, and universities
        </span>

        <GradientHeading className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Stop losing weeks to every exam cycle
        </GradientHeading>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Evalio helps teachers turn stacks of student papers into clear marks and
          thoughtful feedback in minutes. Upload scripts and your model answers,
          then focus on teaching again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="#waitlist">
            <Button size="lg" className="h-11 gap-2 px-8 shadow-sm">
              Request pilot access
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-sm text-muted-foreground"
        >
          Trusted by educators who believe marking should not cost their evenings
        </motion.p>
      </motion.div>
    </section>
  );
}
