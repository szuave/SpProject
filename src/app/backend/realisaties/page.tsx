import Link from "next/link";
import Image from "next/image";
import { listAllRealisaties } from "@/lib/db";
import { deleteRealisatieAction } from "./actions";
import { Plus, Pencil, Trash, ExternalLink } from "@/components/ui/Icons";
import { SERVICE_TYPE_LABELS } from "@/content/seed";

export const dynamic = "force-dynamic";

export default function RealisatiesListPage() {
  const items = listAllRealisaties();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
            <span aria-hidden className="h-2 w-2 bg-brand-500" />
            Realisaties
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Realisaties</h1>
          <p className="mt-1 text-ink-3 text-sm">{items.length} project{items.length === 1 ? "" : "en"} in totaal.</p>
        </div>
        <Link
          href="/backend/realisaties/new"
          className="inline-flex items-center gap-2 h-11 px-5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em] rounded-[3px] transition-colors"
        >
          <Plus className="h-4 w-4" /> Nieuwe realisatie
        </Link>
      </header>

      <div className="rounded-[4px] border border-border bg-white overflow-hidden divide-y divide-border">
        {items.map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[3px] bg-surface-3">
              {r.cover_image && (
                <Image src={r.cover_image} alt={r.title} fill sizes="80px" className="object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{r.title}</span>
                <StatusBadge status={r.status} />
              </div>
              <div className="mt-0.5 text-sm text-ink-3 truncate">
                {r.service_type ? SERVICE_TYPE_LABELS[r.service_type] ?? r.service_type : "—"}
                {r.location ? ` · ${r.location}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {r.status === "published" && (
                <Link href={`/realisaties/${r.slug}`} target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-brand-600 hover:bg-surface-2" aria-label="Bekijk online">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              <Link href={`/backend/realisaties/${r.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-ink hover:bg-surface-2" aria-label="Bewerk">
                <Pencil className="h-4 w-4" />
              </Link>
              <form action={deleteRealisatieAction}>
                <input type="hidden" name="id" value={r.id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-12 text-center text-ink-3">Nog geen realisaties. Voeg je eerste project toe.</div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span className={`inline-flex items-center h-5 px-2 rounded-[3px] text-[11px] font-bold uppercase tracking-wide ${published ? "bg-ink text-white" : "bg-surface-3 text-ink-3"}`}>
      {published ? "Online" : "Concept"}
    </span>
  );
}

function DeleteButton() {
  return (
    <button
      type="submit"
      aria-label="Verwijder"
      className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-white hover:bg-brand-500 transition-colors"
    >
      <Trash className="h-4 w-4" />
    </button>
  );
}
