"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { submitWaitlistAction, type WaitlistState } from "@/app/actions/waitlist";
import { GradientHeading } from "@/components/gradient-heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: WaitlistState = {};

export function Waitlist() {
  const [state, formAction, pending] = useActionState(
    submitWaitlistAction,
    initialState,
  );

  return (
    <section id="waitlist" className="border-t border-border/60 px-6 py-20 md:py-28">
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
            Not on the pilot list yet? Share your details and our team will reach
            out when a place opens.
          </p>
        </div>

        <form action={formAction} className="mt-10 flex flex-col gap-5">
          {state.success && (
            <Alert variant="success">
              <AlertDescription>{state.success}</AlertDescription>
            </Alert>
          )}
          {state.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <fieldset className="space-y-2" disabled={pending}>
            <Label htmlFor="waitlist-name">Your name</Label>
            <Input
              id="waitlist-name"
              name="name"
              placeholder="Sarah Ahmed"
              className="h-11 text-base md:text-base"
            />
          </fieldset>

          <fieldset className="space-y-2" disabled={pending}>
            <Label htmlFor="waitlist-school">School or institution</Label>
            <Input
              id="waitlist-school"
              name="school"
              placeholder="Springfield Academy"
              required
              className="h-11 text-base md:text-base"
            />
          </fieldset>

          <fieldset className="space-y-2" disabled={pending}>
            <Label htmlFor="waitlist-email">Work email</Label>
            <Input
              id="waitlist-email"
              name="email"
              type="email"
              placeholder="admin@yourschool.edu"
              required
              className="h-11 text-base md:text-base"
            />
          </fieldset>

          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Submit request"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
