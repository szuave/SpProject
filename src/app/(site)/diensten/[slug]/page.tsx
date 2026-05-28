import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { Check } from "@/components/ui/Icons";
import { services, getService } from "@/content/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildMetadata({ title: "Niet gevonden" });
  return buildMetadata({
    title: `${service.title} — ${service.category}`,
    description: service.intro,
    path: `/diensten/${service.slug}`,
  });
}

const steps = [
  { n: "01", title: "Contact & advies" },
  { n: "02", title: "Offerte & planning" },
  { n: "03", title: "Voorbereiding" },
  { n: "04", title: "Uitvoering & oplevering" },
];

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: "Diensten", url: `${site.url}/diensten` },
          { name: service.title, url: `${site.url}/diensten/${service.slug}` },
        ])}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Diensten", href: "/diensten" },
          { label: service.title },
        ]}
        title={service.title}
        intro={service.intro}
      />

      <Section padding="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-3 shadow-elev-2 lg:sticky lg:top-28">
              <Image
                src={service.image}
                alt={`${service.title} door SP-Projects`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              {service.blocks.map((b) => (
                <div key={b.heading} className="mb-8 last:mb-0">
                  <h2 className="text-2xl font-bold text-ink">{b.heading}</h2>
                  <p className="mt-3 text-ink-2 leading-relaxed text-[17px]">{b.body}</p>
                </div>
              ))}

              <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-7">
                <h3 className="text-lg font-bold text-ink">Voordelen</h3>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((bf) => (
                    <li key={bf} className="flex items-start gap-3 text-ink-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {bf}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="default" padding="tight" className="border-t border-border">
        <Container>
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Werkwijze</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink">Ons 4-stappenplan</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-border bg-white p-6">
                <div className="text-2xl font-bold text-brand-500">{s.n}</div>
                <div className="mt-2 font-semibold text-ink">{s.title}</div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CallToAction
        title="Interesse in deze dienst?"
        intro="Vraag vrijblijvend uw offerte aan. We bekijken samen wat er mogelijk is voor uw project."
      />
    </>
  );
}
