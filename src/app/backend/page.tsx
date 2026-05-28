import Link from "next/link";
import { getCounts } from "@/lib/db";
import { Hammer, Newspaper, Inbox, ArrowRight } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export default function BackendDashboard() {
  const c = getCounts();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Goedemorgen" : hour < 18 ? "Goedemiddag" : "Goedenavond";

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header>
        <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-3">
          <span aria-hidden className="h-2 w-2 bg-brand-500" />
          Dashboard
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.02em]">
          {greeting}.
        </h1>
        <p className="mt-3 text-ink-3">Beheer je aanvragen, realisaties en blog op één plek.</p>
      </header>

      {/* Stat panels */}
      <section className="grid gap-px bg-border border border-border sm:grid-cols-3">
        <StatCard index="01" href="/backend/aanvragen" icon={<Inbox className="h-5 w-5" />} label="Aanvragen" value={c.leadsNew} sub={`${c.leadsTotal} totaal`} accent />
        <StatCard index="02" href="/backend/realisaties" icon={<Hammer className="h-5 w-5" />} label="Realisaties" value={c.realisatiesPublished} sub={`${c.realisatiesDrafts} concept${c.realisatiesDrafts === 1 ? "" : "en"}`} />
        <StatCard index="03" href="/backend/blog" icon={<Newspaper className="h-5 w-5" />} label="Blog" value={c.blogPublished} sub={`${c.blogDrafts} concept${c.blogDrafts === 1 ? "" : "en"}`} />
      </section>

      {/* Snelle acties */}
      <section>
        <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-3 mb-4">
          <span aria-hidden className="h-2 w-2 bg-brand-500" />
          Snel toevoegen
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <QuickAction href="/backend/realisaties/new" label="Nieuwe realisatie" />
          <QuickAction href="/backend/blog/new" label="Nieuw blogartikel" />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  index, href, icon, label, value, sub, accent = false,
}: {
  index: string; href: string; icon: React.ReactNode; label: string; value: number; sub: string; accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block p-7 transition-colors ${accent ? "bg-ink text-white hover:bg-ink-2" : "bg-white hover:bg-surface-2"}`}
    >
      {/* rode accentbalk bij hover */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-brand-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
          <span className="inline-flex items-center justify-center h-5 px-1.5 bg-brand-500 text-white text-[10px]">{index}</span>
          <span className={accent ? "text-white/70" : "text-ink-3"}>{label}</span>
        </span>
        <span className={accent ? "text-brand-500" : "text-ink-3 group-hover:text-brand-500 transition-colors"}>{icon}</span>
      </div>
      <div className="mt-6 font-display text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">{value}</div>
      <div className={`mt-3 flex items-center justify-between text-sm ${accent ? "text-white/60" : "text-ink-3"}`}>
        <span>{sub}</span>
        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
    </Link>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 bg-white border border-border px-6 h-16 hover:border-ink transition-colors"
    >
      <span className="inline-flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center bg-ink text-white text-lg leading-none group-hover:bg-brand-500 transition-colors">+</span>
        <span className="font-bold uppercase tracking-[0.06em] text-[13px]">{label}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-ink-3 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
