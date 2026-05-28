import Link from "next/link";
import Image from "next/image";
import { listAllBlog } from "@/lib/db";
import { deleteBlogPostAction } from "./actions";
import { Plus, Pencil, Trash, ExternalLink } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

const fmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "short", year: "numeric" });

export default function BlogListPage() {
  const items = listAllBlog();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
            <span aria-hidden className="h-2 w-2 bg-brand-500" />
            Blog
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Blogartikels</h1>
          <p className="mt-1 text-ink-3 text-sm">{items.length} artikel{items.length === 1 ? "" : "s"} in totaal.</p>
        </div>
        <Link
          href="/backend/blog/new"
          className="inline-flex items-center gap-2 h-11 px-5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em] rounded-[3px] transition-colors"
        >
          <Plus className="h-4 w-4" /> Nieuw artikel
        </Link>
      </header>

      <div className="rounded-[4px] border border-border bg-white overflow-hidden divide-y divide-border">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[3px] bg-surface-3">
              {p.cover_image && <Image src={p.cover_image} alt={p.title} fill sizes="80px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{p.title}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-0.5 text-sm text-ink-3 truncate">
                {p.published_at ? fmt.format(new Date(p.published_at)) : "Niet gepubliceerd"}
                {p.tags.length > 0 ? ` · ${p.tags.join(", ")}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {p.status === "published" && (
                <Link href={`/blog/${p.slug}`} target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-brand-600 hover:bg-surface-2" aria-label="Bekijk online">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              <Link href={`/backend/blog/${p.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-ink hover:bg-surface-2" aria-label="Bewerk">
                <Pencil className="h-4 w-4" />
              </Link>
              <form action={deleteBlogPostAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" aria-label="Verwijder" className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] text-ink-3 hover:text-white hover:bg-brand-500 transition-colors">
                  <Trash className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-12 text-center text-ink-3">Nog geen artikels. Schrijf je eerste blog.</div>
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
