import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact — Offerte aanvragen",
  description:
    "Contacteer SP-Projects voor uw dak-, gevel- of renovatieproject. Leo Tertzweillaan 38, 9050 Gentbrugge · 0486 20 12 79 · info@sp-projects.be.",
  path: "/contact",
});

const mapSrc =
  "https://www.google.com/maps?q=Leo%20Tertzweillaan%2038,%209050%20Gentbrugge&output=embed";

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contacteer ons"
        intro="Vertel ons over uw project — we bekijken samen wat er mogelijk is en bezorgen u een offerte op maat."
      />

      <Section padding="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-ink">Contactgegevens</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-3">Adres</div>
                    <a
                      href="https://maps.google.com/?q=Leo+Tertzweillaan+38,+9050+Gentbrugge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-brand-600"
                    >
                      {site.contact.address.street}, {site.contact.address.postalCode}{" "}
                      {site.contact.address.city}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-3">Telefoon</div>
                    <a href={site.contact.phoneHref} className="text-ink hover:text-brand-600">
                      {site.contact.phone}
                    </a>
                    <span className="text-ink-3"> · </span>
                    <a href={site.contact.phone2Href} className="text-ink hover:text-brand-600">
                      {site.contact.phone2}
                    </a>
                    <div className="text-sm text-ink-3 mt-0.5">{site.contact.person}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-3">E-mail</div>
                    <a href={site.contact.emailHref} className="text-ink hover:text-brand-600">
                      {site.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-3">Openingsuren</div>
                    {site.contact.hours.map((h) => (
                      <div key={h.day} className="text-ink">
                        {h.day}: <span className="text-ink-2">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>

              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Locatie SP-Projects"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-white p-7 sm:p-8 shadow-elev-1">
                <h2 className="text-2xl font-bold text-ink">Offerte aanvragen</h2>
                <p className="mt-2 text-ink-2">
                  Vul het formulier in — we nemen binnen 1 à 2 werkdagen contact met u op.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
