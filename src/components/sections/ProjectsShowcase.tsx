import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { listPublishedRealisaties } from "@/lib/db";
import { SERVICE_TYPE_LABELS } from "@/content/seed";

export function ProjectsShowcase() {
  const featured = listPublishedRealisaties({ limit: 4 });
  if (featured.length === 0) return null;

  return (
    <Section variant="default" padding="default" className="border-t border-border">
      <Container>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Realisaties</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] text-balance">
              Werk waar we trots op zijn.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/realisaties" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
              Alle realisaties
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 60}>
              <Link href={`/realisaties/${p.slug}`} className="group block">
                <figure className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-3">
                  {p.cover_image && (
                    <Image
                      src={p.cover_image}
                      alt={`${p.title} — ${p.location ?? "Oost-Vlaanderen"}`}
                      fill
                      sizes="(min-width: 1024px) 320px, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brand-200">
                      {p.service_type ? SERVICE_TYPE_LABELS[p.service_type] ?? p.service_type : "Project"}
                    </span>
                    <span className="block text-white font-semibold">{p.title}</span>
                    {p.location && <span className="block text-white/70 text-sm">{p.location}</span>}
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
