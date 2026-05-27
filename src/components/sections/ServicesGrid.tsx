import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Roof, Wall, Home } from "@/components/ui/Icons";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";

const iconByCategory = {
  Dakwerken: Roof,
  Gevelwerken: Wall,
  Renovatie: Home,
} as const;

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <Section variant="default" padding={compact ? "tight" : "default"} id="diensten">
      <Container>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
              Onze diensten
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] text-balance">
              Van grond tot afwerking, één partner.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ink-2 leading-relaxed">
              Eén aanspreekpunt voor uw volledige renovatie. Wij coördineren elk vakgebied met
              dezelfde precisie.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/diensten" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
              Alle diensten
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconByCategory[service.category];
            return (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/diensten/${service.slug}`}
                  className="group flex h-full flex-col p-6 lg:p-7 bg-white border border-border rounded-2xl hover:border-brand-300 hover:shadow-elev-2 transition-all"
                >
                  <Icon className="h-8 w-8 text-brand-500" />
                  <h3 className="mt-5 text-xl font-bold text-ink leading-tight">{service.title}</h3>
                  <p className="mt-2 text-ink-2 leading-relaxed text-[15px] grow">
                    {service.tagline}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Ontdek
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
