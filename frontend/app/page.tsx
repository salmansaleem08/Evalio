export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="text-sm font-medium text-primary">Evalio</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Grade exam papers in minutes, not weeks
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload student answer sheets and a marking scheme — get per-question
          marks and feedback for every student. Landing page and live demo
          coming next.
        </p>
      </div>
    </main>
  );
}
