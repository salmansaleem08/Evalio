"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { GradientHeading } from "@/components/gradient-heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
    setEmail("");
    setSchool("");
  }

  return (
    <section id="waitlist" className="border-t px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Early access
          </p>
          <GradientHeading
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight"
          >
            Request school access
          </GradientHeading>
          <p className="mt-4 text-muted-foreground">
            Not on the pilot list yet? Leave your details and we will reach out
            when a slot opens.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          {status === "done" && (
            <Alert variant="success">
              <AlertDescription>
                Thank you — we have received your request and will be in touch.
              </AlertDescription>
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="destructive">
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
          )}

          <fieldset className="space-y-2" disabled={status === "loading"}>
            <Label htmlFor="waitlist-email">Work email</Label>
            <Input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourschool.edu"
              required
              className="h-11 text-base md:text-base"
            />
          </fieldset>

          <fieldset className="space-y-2" disabled={status === "loading"}>
            <Label htmlFor="waitlist-school">School / institution</Label>
            <Input
              id="waitlist-school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Springfield Academy"
              required
              className="h-11 text-base md:text-base"
            />
          </fieldset>

          <Button type="submit" className="h-11 w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Join waitlist"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
