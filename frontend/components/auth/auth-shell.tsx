import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthShell({
  children,
  panelPosition = "left",
}: {
  children: React.ReactNode;
  panelPosition?: "left" | "right";
}) {
  const formColumn = (
    <section className="flex min-h-screen flex-1 flex-col">
      <header className="flex h-[var(--header-height)] items-center justify-between border-b px-6 lg:px-10">
        <Logo />
        <ThemeToggle />
      </header>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-10">
        {children}
      </div>
    </section>
  );

  const panel = <AuthSidePanel />;

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {panelPosition === "left" ? (
        <>
          {panel}
          {formColumn}
        </>
      ) : (
        <>
          {formColumn}
          {panel}
        </>
      )}
    </main>
  );
}
