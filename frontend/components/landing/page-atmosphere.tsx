export function PageAtmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark:hidden"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0, 182, 123, 0.14), transparent 55%),
            radial-gradient(ellipse 50% 40% at 100% 0%, rgba(0, 0, 50, 0.06), transparent 50%),
            radial-gradient(ellipse 40% 30% at 0% 100%, rgba(0, 182, 123, 0.08), transparent 45%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{
          background: `
            radial-gradient(ellipse 85% 55% at 50% -5%, rgba(0, 182, 123, 0.12), transparent 50%),
            radial-gradient(ellipse 45% 35% at 100% 20%, rgba(0, 0, 50, 0.35), transparent 55%),
            radial-gradient(ellipse 50% 40% at 0% 80%, rgba(0, 182, 123, 0.07), transparent 50%),
            linear-gradient(180deg, oklch(0.145 0 0) 0%, oklch(0.16 0.02 165) 50%, oklch(0.145 0 0) 100%)
          `,
        }}
      />
    </>
  );
}
