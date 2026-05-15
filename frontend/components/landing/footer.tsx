import Link from "next/link";

import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Logo />
          <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
            Fair, fast exam marking for schools that care about teachers and
            students.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="#mission" className="hover:text-foreground hover:underline">
            Mission
          </Link>
          <Link href="#how-it-works" className="hover:text-foreground hover:underline">
            How it works
          </Link>
          <Link href="#waitlist" className="hover:text-foreground hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/login" className="hover:text-foreground hover:underline">
            Log in
          </Link>
        </nav>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Evalio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
