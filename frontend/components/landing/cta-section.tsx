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
        className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-secondary px-8 py-16 text-center text-secondary-foreground shadow-sm md:px-16"
      >
        <GradientHeading
          as="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl [&]:from-primary [&]:via-[#00e6a8] [&]:to-white"
        >
          Ready to reclaim your exam season?
        </GradientHeading>
        <p className="mx-auto mt-4 max-w-xl text-secondary-foreground/80">
          Join the pilot, upload your first batch, and see detailed grading in
          minutes. No credit card — just your school email.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg" className="h-11 gap-2 bg-primary px-8 hover:bg-primary/90">
              Create free account
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-secondary-foreground/20 bg-transparent px-8 text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground"
            >
              Log in
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
