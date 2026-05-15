import Link from "next/link";
import { FilePlus, LayoutDashboard } from "lucide-react";

import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sessions/new", label: "New paper check", icon: FilePlus },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-[var(--header-height)] items-center justify-between border-b px-4 md:px-6">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      <DashboardBody>{children}</DashboardBody>
    </div>
  );
}

function DashboardBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:flex-row md:p-6">
      <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto md:w-56 md:flex-col md:gap-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 whitespace-nowrap"
            >
              <link.icon className="size-4" />
              {link.label}
            </Button>
          </Link>
        ))}
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
