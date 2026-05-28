import { listLeads } from "@/lib/db";
import { LeadsBoard } from "@/components/backend/LeadsBoard";

export const dynamic = "force-dynamic";

export default function AanvragenPage() {
  const leads = listLeads();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
          <span aria-hidden className="h-2 w-2 bg-brand-500" />
          Aanvragen
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Aanvragen</h1>
        <p className="mt-1 text-ink-3 text-sm">
          Inzendingen via het contact- en offerteformulier. Sorteer met de tabs hieronder.
        </p>
      </header>

      <LeadsBoard leads={leads} />
    </div>
  );
}
