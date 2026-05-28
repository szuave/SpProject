import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { ArrowRight, Roof, Wall, Home } from "@/components/ui/Icons";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Diensten — Dakwerken, Gevelwerken & Renovatie",
  description:
    "Ontdek alle diensten van SP-Projects: platte en hellende daken, crepi, steenstrips, gevelsteen en algemene renovatiewerken in Gent en Oost-Vlaanderen.",
  path: "/diensten",
});

const iconByCategory = { Dakwerken: Roof, Gevelwerken: Wall, Renovatie: Home } as const;

export default function DienstenPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }]}
        title="Onze diensten"
        intro="Eén aanspreekpunt voor uw volledige renovatie — van dak tot gevel, met dezelfde precisie en hetzelfde vakmanschap."
      />
      <Section padding="default">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = iconByCategory[service.category];
              return (
                <Reveal as="li" key={service.slug} delay={(i % 3) * 70}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="group flex h-full flex-col p-7 bg-white border border-border rounded-2xl hover:border-brand-300 hover:shadow-elev-2 transition-all"
                  >
                    <Icon className="h-8 w-8 text-brand-500" />
                    <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-3">
                      {service.category}
                    </span>
                    <h2 className="mt-1 text-xl font-bold text-ink leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-ink-2 leading-relaxed text-[15px] grow">
                      {service.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Ontdek
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>
      <CallToAction />
    </>
  );
}
