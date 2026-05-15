import { Quote } from "lucide-react";

import { getRandomQuote } from "@/lib/quotes";

export function QuoteBanner() {
  const quote = getRandomQuote();

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm md:p-8">
      <Quote className="absolute right-4 top-4 size-10 text-primary/15" aria-hidden />
      <p className="relative text-lg font-medium leading-relaxed text-foreground md:text-xl">
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="relative mt-3 text-sm text-muted-foreground">
        {quote.author}
      </p>
    </div>
  );
}
