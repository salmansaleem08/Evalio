"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-secondary/20 bg-secondary px-8 py-16 text-center text-secondary-foreground shadow-lg md:px-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00b67b40,_transparent_60%)]"
          aria-hidden
        />
        <div className="relative z-10">
          <GradientHeading
            as="h2"
            className="text-3xl font-bold tracking-tight sm:text-4xl dark:from-white dark:via-[#b8ffe8] dark:to-[#7ee8c8]"
          >
            Ready to reclaim your exam season?
          </GradientHeading>
          <p className="mx-auto mt-4 max-w-xl text-secondary-foreground/85">
            Join the pilot, upload your first batch, and see how much time your
            team can win back. No credit card. Just your school email.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="h-11 gap-2 bg-primary px-8 hover:bg-primary/90">
                Create account
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="h-11 border-secondary-foreground/25 bg-transparent px-8 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
