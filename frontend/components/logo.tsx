import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { img: 32, className: "size-8" },
  md: { img: 40, className: "size-10" },
  lg: { img: 56, className: "size-14" },
};

export function Logo({
  className,
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const dim = sizes[size];

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-semibold", className)}
    >
      <Image
        src="/logo.png"
        alt="Evalio"
        width={dim.img}
        height={dim.img}
        className={cn(dim.className, "object-contain")}
        priority
      />
      {showWordmark && (
        <span className="text-lg tracking-tight text-foreground">Evalio</span>
      )}
    </Link>
  );
}
