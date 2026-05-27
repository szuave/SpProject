import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "dark" | "brand";
  padding?: "default" | "tight" | "none";
};

const variants = {
  default: "bg-surface text-ink",
  muted: "bg-surface-2 text-ink",
  dark: "bg-ink text-white",
  brand: "bg-brand-500 text-white",
};

const paddings = {
  none: "",
  tight: "py-14 sm:py-16",
  default: "py-20 sm:py-24",
};

export function Section({ id, children, className, variant = "default", padding = "default" }: Props) {
  return (
    <section id={id} className={cn("relative", variants[variant], paddings[padding], className)}>
      {children}
    </section>
  );
}
