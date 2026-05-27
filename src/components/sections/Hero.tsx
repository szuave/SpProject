import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Check } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-24 lg:pb-28">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 lg:items-end">
          {/* COPY */}
          <div className="lg:col-span-7 lg:pt-6">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-2">
              <span aria-hidden className="h-2.5 w-2.5 bg-brand-500" />
              Sinds 2003 · Gent &amp; Oost-Vlaanderen
            </div>

            <h1 className="mt-7 text-[44px] leading-[1.02] sm:text-[64px] sm:leading-[0.98] lg:text-[88px] lg:leading-[0.94] font-extrabold tracking-[-0.03em] text-balance">
              Vakwerk voor uw{" "}
              <span className="text-brand-500">dak</span>,
              <br />
              <span className="text-brand-500">gevel</span> en thuis.
            </h1>

            <p className="mt-7 max-w-xl text-[17px] sm:text-lg leading-relaxed text-ink-2">
              SP-Projects bouwt aan duurzame renovaties in Gent en Oost-Vlaanderen.
              Eén aanspreekpunt, vakmensen in eigen team, en een 3D-plan vooraleer
              de eerste steen wordt gelegd.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 h-14 px-7 bg-ink hover:bg-brand-500 text-white text-[14px] font-bold uppercase tracking-[0.1em] transition-colors"
              >
                Offerte aanvragen
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2 h-14 px-2 text-[15px] font-bold text-ink hover:text-brand-600 transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-500" />
                {site.contact.phone}
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-ink-2">
              {[
                "20+ jaar ervaring",
                "100% maatwerk",
                "Gratis 3D-visualisatie",
                "Eén aanspreekpunt",
              ].map((p) => (
                <li key={p} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* MEDIA */}
          <div className="lg:col-span-5">
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-5 -right-5 lg:-top-7 lg:-right-7 h-36 w-36 lg:h-44 lg:w-44 bg-ink"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-3 shadow-elev-3">
                <Image
                  src="/img/renovatie.jpeg"
                  alt="Renovatieproject in opbouw door SP-Projects in Gent"
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-white px-5 py-4 max-w-[260px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-500">
                    Werf in uitvoering
                  </div>
                  <div className="mt-1 text-[15px] font-semibold leading-tight text-ink">
                    Totaalrenovatie · Oost-Vlaanderen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
