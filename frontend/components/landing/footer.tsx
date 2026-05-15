import Link from "next/link";

import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="#mission" className="hover:text-foreground hover:underline">
            Mission
          </Link>
          <Link href="#how-it-works" className="hover:text-foreground hover:underline">
            How it works
          </Link>
          <Link href="/login" className="hover:text-foreground hover:underline">
            Log in
          </Link>
          <Link href="/signup" className="hover:text-foreground hover:underline">
            Sign up
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Evalio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
