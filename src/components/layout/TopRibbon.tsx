import { Phone, Mail, MapPin, Instagram } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function TopRibbon() {
  return (
    <div className="hidden sm:block bg-ink text-white/90 text-[12.5px] tracking-wide">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-brand-500" />
              {site.contact.phone}
            </a>
            <a
              href={site.contact.emailHref}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-500" />
              {site.contact.email}
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-white/70">
              <MapPin className="h-3.5 w-3.5 text-brand-500" />
              {site.contact.address.city} · Oost-Vlaanderen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-white/60">
              Ma–Vr 08:00–18:00
            </span>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/80 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
