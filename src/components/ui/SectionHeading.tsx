import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", invert, className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className={cn("text-sm font-semibold uppercase tracking-wider", invert ? "text-brand-200" : "text-brand-600")}>
          {eyebrow}
        </div>
      )}
      <h2 className={cn("mt-3 text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12]", invert ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-pretty text-base sm:text-lg leading-relaxed", invert ? "text-white/80" : "text-ink-2")}>
          {intro}
        </p>
      )}
    </div>
  );
}
