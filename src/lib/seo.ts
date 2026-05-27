import type { Metadata } from "next";
import { site } from "./site";

type Args = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata({ title, description, path = "/" }: Args = {}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Dakwerken & Gevelwerken in Gent`;
  const desc = description ?? site.description;
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url,
      title: fullTitle,
      description: desc,
      images: [{ url: `${site.url}/img/project-2.png`, width: 768, height: 896 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [`${site.url}/img/project-2.png`],
    },
    robots: { index: true, follow: true },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "RoofingContractor", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/img/project-2.png`,
    logo: `${site.url}/img/logo-black.png`,
    telephone: "+32486201279",
    email: site.contact.email,
    vatID: site.contact.vat,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      postalCode: site.contact.address.postalCode,
      addressLocality: site.contact.address.city,
      addressRegion: "Oost-Vlaanderen",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Gent" },
      { "@type": "AdministrativeArea", name: "Oost-Vlaanderen" },
    ],
    sameAs: [site.social.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
