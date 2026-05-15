"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { apiFetch, apiUpload } from "@/lib/api/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GradingSession } from "@/lib/types/grading";

export function NewSessionForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [papers, setPapers] = useState<FileList | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!papers?.length) {
      setError("Upload at least one student PDF.");
      return;
    }
    if (papers.length > 5) {
      setError("Maximum 5 student PDFs per session.");
      return;
    }
    if (!keyFile) {
      setError("Upload your marking key PDF.");
      return;
    }

    try {
      setStep("Creating session…");
      const created = await apiFetch<{ session: GradingSession }>("/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() || "Paper check" }),
      });
      const sessionId = created.session.id;

      setStep("Extracting student papers…");
      const paperForm = new FormData();
      Array.from(papers).forEach((file) => paperForm.append("files", file));
      await apiUpload(`/sessions/${sessionId}/papers`, paperForm);

      setStep("Extracting marking key…");
      const keyForm = new FormData();
      keyForm.append("file", keyFile);
      await apiUpload(`/sessions/${sessionId}/marking-key`, keyForm);

      setStep("Grading with Evalio…");
      await apiFetch(`/sessions/${sessionId}/grade`, { method: "POST" });

      router.push(`/dashboard/sessions/${sessionId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {step && (
        <Alert variant="success">
          <AlertDescription className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {step}
          </AlertDescription>
        </Alert>
      )}

      <fieldset className="space-y-2" disabled={!!step}>
        <Label htmlFor="title">Session name</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Year 10 Biology Mock"
          className="h-11"
        />
      </fieldset>

      <fieldset className="space-y-2" disabled={!!step}>
        <Label htmlFor="papers">Student papers (PDF, up to 5)</Label>
        <div className="flex flex-col gap-2 rounded-lg border border-dashed border-input p-6 text-center">
          <Upload className="mx-auto size-8 text-muted-foreground" />
          <Input
            id="papers"
            type="file"
            accept="application/pdf"
            multiple
            className="h-11"
            onChange={(e) => setPapers(e.target.files)}
          />
          <p className="text-xs text-muted-foreground">
            Text is extracted from each PDF for marking.
          </p>
        </div>
      </fieldset>

      <fieldset className="space-y-2" disabled={!!step}>
        <Label htmlFor="key">Marking key (PDF)</Label>
        <Input
          id="key"
          type="file"
          accept="application/pdf"
          className="h-11"
          onChange={(e) => setKeyFile(e.target.files?.[0] ?? null)}
        />
      </fieldset>

      <Button type="submit" className="h-11 w-full" disabled={!!step}>
        {step ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing…
          </>
        ) : (
          "Run paper check"
        )}
      </Button>
    </form>
  );
}
