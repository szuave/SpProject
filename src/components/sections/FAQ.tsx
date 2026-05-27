"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type FAQItem = { q: string; a: string };

export function FAQ({
  items,
  variant = "default",
}: {
  items: FAQItem[];
  variant?: "default" | "muted";
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section variant={variant} padding="default" className="border-t border-border">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
              Veelgestelde vragen
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] text-balance">
              Antwoord op de meest gestelde vragen.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-ink hover:text-brand-600 transition-colors"
                    >
                      <span className="text-lg">{item.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-ink-3 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-5 text-ink-2 leading-relaxed text-[16px] pr-4 max-w-2xl">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
