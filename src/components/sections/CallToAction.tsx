import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function CallToAction({
  title = "Laten we uw droomhuis realiseren.",
  intro = "Vraag vrijblijvend uw offerte aan. We bekijken samen wat er mogelijk is — transparant, op maat en met vakmanschap.",
  primaryLabel = "Offerte aanvragen",
  primaryHref = "/contact",
}: {
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <Section variant="brand" padding="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white/85 leading-relaxed max-w-2xl">{intro}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-white/85 text-base">
              <Phone className="h-4 w-4" />
              <span>Of bel direct:</span>
              <a
                href={site.contact.phoneHref}
                className="font-semibold text-white hover:underline underline-offset-4"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <Button
              href={primaryHref}
              size="lg"
              variant="white"
              iconRight={<ArrowRight className="h-5 w-5" />}
            >
              {primaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
