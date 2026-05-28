import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-[3px] border border-border bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-colors";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-3">{hint}</p>}
      {error && <p className="mt-1 text-xs text-brand-600 font-medium">{error}</p>}
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-[4px] border border-border bg-white p-6">
      {title && <h2 className="font-display text-lg font-extrabold mb-4">{title}</h2>}
      <div className="space-y-5">{children}</div>
    </div>
  );
}
