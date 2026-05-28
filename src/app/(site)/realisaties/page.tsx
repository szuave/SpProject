import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { listPublishedRealisaties } from "@/lib/db";
import { SERVICE_TYPE_LABELS } from "@/content/seed";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Realisaties — Gerealiseerde projecten",
  description:
    "Een greep uit de recent opgeleverde dak-, gevel- en renovatieprojecten van SP-Projects in Gent en Oost-Vlaanderen.",
  path: "/realisaties",
});

export default function RealisatiesPage() {
  const items = listPublishedRealisaties();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Realisaties" }]}
        title="Realisaties"
        intro="Een greep uit onze recent opgeleverde dak-, gevel- en renovatieprojecten in Oost-Vlaanderen."
      />
      <Section padding="default">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 70}>
                <Link href={`/realisaties/${p.slug}`} className="group block">
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-3">
                    {p.cover_image && (
                      <Image
                        src={p.cover_image}
                        alt={`${p.title} — ${p.location ?? "Oost-Vlaanderen"}`}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-12">
                      <span className="block text-xs font-bold uppercase tracking-wider text-brand-200">
                        {p.service_type ? SERVICE_TYPE_LABELS[p.service_type] ?? p.service_type : "Project"}
                      </span>
                      <span className="block text-white font-semibold text-lg">{p.title}</span>
                      {p.location && <span className="block text-white/70 text-sm">{p.location}</span>}
                    </figcaption>
                  </figure>
                </Link>
              </Reveal>
            ))}
          </ul>
          {items.length === 0 && (
            <p className="text-center text-ink-3 py-12">Binnenkort verschijnen hier onze projecten.</p>
          )}
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
