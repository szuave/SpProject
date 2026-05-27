import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Shield, Ruler, Cube } from "@/components/ui/Icons";

const usps = [
  {
    icon: Shield,
    title: "Vakmanschap",
    text: "Ons toegewijde team van experts combineert jarenlange ervaring met precisie. Kwaliteit zit in elk detail van de afwerking.",
  },
  {
    icon: Ruler,
    title: "Maatwerk",
    text: "Maatwerkoplossingen die naadloos aansluiten op uw unieke behoeften. Geen standaardpakketten — uw project staat centraal.",
  },
  {
    icon: Cube,
    title: "Uw project in 3D",
    text: "Al in een vroeg stadium visualiseren we uw project in 3D, zodat u precies weet wat u mag verwachten vóór de eerste steen.",
  },
];

export function USPs() {
  return (
    <Section variant="muted" padding="default">
      <Container>
        <SectionHeading
          eyebrow="Waarom SP-Projects"
          title="Het verschil dat elk project bijzonder maakt."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <Reveal as="li" key={usp.title} delay={i * 80}>
                <article className="h-full rounded-2xl bg-white border border-border p-7 hover:border-brand-300 hover:shadow-elev-2 transition-all">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink leading-tight">{usp.title}</h3>
                  <p className="mt-3 text-ink-2 leading-relaxed text-[15px]">{usp.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
