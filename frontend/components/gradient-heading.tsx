import * as React from "react";

import { cn } from "@/lib/utils";

export function GradientHeading({
  as: Tag = "h1",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-br from-primary via-[#00d4aa] to-secondary bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
