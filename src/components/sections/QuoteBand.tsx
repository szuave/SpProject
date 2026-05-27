import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Phone } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function QuoteBand() {
  return (
    <section className="bg-ink text-white">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
              <span aria-hidden className="h-2 w-2 bg-brand-500" />
              Onze belofte
            </div>
            <p className="mt-5 font-display text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] text-white">
              &ldquo;Uw verwachtingen worden{" "}
              <span className="text-brand-500">onze missie</span> —{" "}
              in een transparante omgeving.&rdquo;
            </p>
            <p className="mt-6 max-w-2xl text-white/75 text-[16.5px] leading-relaxed">
              We werken alleen met kwaliteitsmaterialen, communiceren open over de werf
              en leveren pas op wanneer u 100% tevreden bent.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-3 h-14 px-6 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.1em] transition-colors"
              >
                Offerte aanvragen
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center justify-between gap-3 h-14 px-6 border border-white/20 hover:border-white text-white text-[13px] font-bold uppercase tracking-[0.1em] transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-500" />
                  Bel rechtstreeks
                </span>
                <span className="text-white">{site.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
