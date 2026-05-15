import { NewSessionForm } from "@/components/dashboard/new-session-form";

export default function NewSessionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New paper check</h1>
        <p className="text-muted-foreground">
          Upload up to five student PDFs and your marking key. Evalio will extract
          text and return marks in a results table.
        </p>
      </div>
      <NewSessionForm />
    </div>
  );
}
