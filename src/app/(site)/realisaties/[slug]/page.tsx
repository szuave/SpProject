import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { getPublishedRealisatie } from "@/lib/db";
import { SERVICE_TYPE_LABELS } from "@/content/seed";
import { renderMarkdown } from "@/lib/markdown";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonLd";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const fmt = new Intl.DateTimeFormat("nl-BE", { year: "numeric", month: "long" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getPublishedRealisatie(slug);
  if (!r) return buildMetadata({ title: "Realisatie niet gevonden" });
  return buildMetadata({
    title: `${r.title} — Realisatie`,
    description: r.summary ?? `${r.title} door SP-Projects in ${r.location ?? "Oost-Vlaanderen"}.`,
    path: `/realisaties/${r.slug}`,
    image: r.cover_image,
  });
}

export default async function RealisatieDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getPublishedRealisatie(slug);
  if (!r) notFound();

  const meta: { label: string; value: string }[] = [];
  if (r.service_type) meta.push({ label: "Categorie", value: SERVICE_TYPE_LABELS[r.service_type] ?? r.service_type });
  if (r.location) meta.push({ label: "Locatie", value: r.location });
  if (r.surface_m2) meta.push({ label: "Oppervlakte", value: `${r.surface_m2} m²` });
  if (r.completed_on) meta.push({ label: "Opgeleverd", value: fmt.format(new Date(r.completed_on)) });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: "Realisaties", url: `${site.url}/realisaties` },
          { name: r.title, url: `${site.url}/realisaties/${r.slug}` },
        ])}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Realisaties", href: "/realisaties" },
          { label: r.title },
        ]}
        title={r.title}
        intro={r.summary ?? undefined}
      />

      <Section padding="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] items-start">
            <div>
              {r.cover_image && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-3 shadow-elev-2">
                  <Image src={r.cover_image} alt={r.title} fill sizes="(min-width:1024px) 760px, 100vw" className="object-cover" priority />
                </div>
              )}
              {r.description_md && (
                <div
                  className="prose-sp mt-8 max-w-none text-ink-2 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-600 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(r.description_md) }}
                />
              )}

              {r.gallery.length > 0 && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {r.gallery.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-3">
                      <Image src={src} alt={`${r.title} — foto ${i + 1}`} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 rounded-2xl border border-border bg-surface-2 p-6">
              <h2 className="font-display text-lg font-extrabold">Projectdetails</h2>
              <dl className="mt-4 space-y-3">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <dt className="text-sm text-ink-3">{m.label}</dt>
                    <dd className="text-sm font-semibold text-ink text-right">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      <CallToAction title="Ook zo'n project in gedachten?" intro="Vraag vrijblijvend uw offerte aan — we bekijken samen wat er mogelijk is." />
    </>
  );
}
