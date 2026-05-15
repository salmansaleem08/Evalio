import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "#mission", label: "Mission" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#waitlist", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between gap-4 px-6">
        <Logo size="sm" />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="shadow-xs">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
