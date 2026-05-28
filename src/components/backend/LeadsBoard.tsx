"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLeadAction } from "@/app/backend/aanvragen/actions";
import { Trash, Phone, Mail, Check } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import type { Lead, LeadStatus } from "@/lib/db";

const fmt = new Intl.DateTimeFormat("nl-BE", {
  day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
});

const TABS: { key: LeadStatus; label: string }[] = [
  { key: "new", label: "Nieuw" },
  { key: "accepted", label: "Geaccepteerd" },
  { key: "rejected", label: "Verwijderd" },
];

export function LeadsBoard({ leads }: { leads: Lead[] }) {
  const [tab, setTab] = useState<LeadStatus>("new");
  const counts: Record<LeadStatus, number> = {
    new: leads.filter((l) => l.status === "new").length,
    accepted: leads.filter((l) => l.status === "accepted").length,
    rejected: leads.filter((l) => l.status === "rejected").length,
  };
  const shown = leads.filter((l) => l.status === tab);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-border">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition-colors",
                active ? "border-brand-500 text-ink" : "border-transparent text-ink-3 hover:text-ink",
              )}
            >
              {t.label}
              <span className={cn(
                "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-[3px] text-[11px] font-bold",
                active ? "bg-brand-500 text-white" : "bg-surface-3 text-ink-3",
              )}>
                {counts[t.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lijst */}
      <div className="space-y-4">
        {shown.map((l) => (
          <article
            key={l.id}
            className={cn(
              "rounded-[4px] border bg-white p-5 sm:p-6",
              l.status === "new" ? "border-brand-300 ring-1 ring-brand-100" : "border-border",
            )}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-lg font-extrabold">{l.naam}</h2>
                  <StatusBadge status={l.status} />
                  {l.dienst && (
                    <span className="inline-flex items-center h-5 px-2 rounded-[3px] bg-surface-3 text-ink-2 text-[11px] font-semibold">{l.dienst}</span>
                  )}
                  <span className="inline-flex items-center h-5 px-2 rounded-[3px] bg-ink/5 text-ink-3 text-[11px] font-medium">via {l.bron}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                  <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 text-ink-2 hover:text-brand-600">
                    <Mail className="h-3.5 w-3.5" /> {l.email}
                  </a>
                  {l.tel && (
                    <a href={`tel:${l.tel}`} className="inline-flex items-center gap-1.5 text-ink-2 hover:text-brand-600">
                      <Phone className="h-3.5 w-3.5" /> {l.tel}
                    </a>
                  )}
                </div>
              </div>
              <time className="text-xs text-ink-3 shrink-0">{fmt.format(new Date(l.created_at))}</time>
            </div>

            <p className="mt-4 text-[15px] text-ink-2 leading-relaxed whitespace-pre-wrap border-t border-border pt-4">
              {l.bericht}
            </p>

            <div className="mt-4 flex items-center gap-2 flex-wrap">
              {l.status !== "accepted" && (
                <StatusButton id={l.id} status="accepted" variant="accept">
                  <Check className="h-4 w-4" /> Accepteren
                </StatusButton>
              )}
              {l.status === "new" && (
                <StatusButton id={l.id} status="rejected" variant="reject">Verwijderen</StatusButton>
              )}
              {l.status !== "new" && (
                <StatusButton id={l.id} status="new" variant="ghost">Terug naar nieuw</StatusButton>
              )}
              {l.status === "rejected" && (
                <form action={deleteLeadAction} className="ml-auto">
                  <input type="hidden" name="id" value={l.id} />
                  <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-[3px] text-ink-3 hover:text-white hover:bg-brand-500 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors">
                    <Trash className="h-4 w-4" /> Definitief
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}

        {shown.length === 0 && (
          <div className="rounded-[4px] border border-border bg-white p-12 text-center text-ink-3">
            {tab === "new"
              ? "Geen nieuwe aanvragen. Inzendingen via het contactformulier verschijnen hier."
              : tab === "accepted"
              ? "Nog geen geaccepteerde aanvragen."
              : "Geen verwijderde aanvragen."}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusButton({
  id, status, variant, children,
}: {
  id: number; status: LeadStatus; variant: "accept" | "reject" | "ghost"; children: React.ReactNode;
}) {
  const cls = {
    accept: "bg-emerald-600 hover:bg-emerald-700 text-white",
    reject: "bg-ink hover:bg-ink-2 text-white",
    ghost: "border border-border text-ink hover:border-ink",
  }[variant];
  return (
    <form action={updateLeadStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className={cn("inline-flex items-center gap-1.5 h-9 px-4 rounded-[3px] text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors", cls)}>
        {children}
      </button>
    </form>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const map = {
    new: { label: "Nieuw", cls: "bg-brand-500 text-white" },
    accepted: { label: "Geaccepteerd", cls: "bg-emerald-50 text-emerald-700" },
    rejected: { label: "Verwijderd", cls: "bg-surface-3 text-ink-3" },
  }[status];
  return (
    <span className={cn("inline-flex items-center h-5 px-2 rounded-[3px] text-[10px] font-bold uppercase tracking-wide", map.cls)}>
      {map.label}
    </span>
  );
}
