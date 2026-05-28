import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/lib/site";
import { Phone, Mail, MapPin, Instagram, ArrowRight } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const services = nav.primary.find((n) => n.href === "/diensten");

  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="SP-Projects — home" className="inline-flex">
              <Image
                src="/img/logo.png"
                alt="SP-Projects"
                width={783}
                height={418}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed">
              {site.description}
            </p>

            <Link
              href="/contact"
              className="mt-8 group inline-flex items-center gap-3 h-12 px-6 bg-brand-500 hover:bg-brand-600 text-white text-[12.5px] font-bold uppercase tracking-[0.12em] transition-colors"
            >
              Start uw project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.16em] mb-5">
              Diensten
            </h3>
            <ul className="space-y-3 text-[15px]">
              {services?.children?.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.16em] mb-5">
              Bedrijf
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/realisaties" className="hover:text-white transition-colors">Realisaties</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white text-[12px] font-bold uppercase tracking-[0.16em] mb-5">
              Contact
            </h3>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-brand-500 shrink-0" />
                <span>
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.postalCode} {site.contact.address.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-500 shrink-0" />
                <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phone}</a>
                <span className="text-white/30">·</span>
                <a href={site.contact.phone2Href} className="hover:text-white">{site.contact.phone2}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-500 shrink-0" />
                <a href={site.contact.emailHref} className="hover:text-white">{site.contact.email}</a>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/20 hover:border-brand-500 hover:bg-brand-500 hover:text-white text-white/80 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12.5px] text-white/50">
          <div>© {year} SP-Projects · BTW {site.contact.vat} · {site.credential}</div>
          <div>Dakwerken · Gevelwerken · Totaalrenovatie in Gent &amp; Oost-Vlaanderen</div>
        </Container>
      </div>
    </footer>
  );
}
