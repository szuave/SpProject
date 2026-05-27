export const site = {
  name: "SP-Projects",
  tagline: "Partner voor dak- en gevelwerken",
  promise: "Renovatiewerken op maat voor jouw droomhuis.",
  url: "https://sp-projects.be",
  locale: "nl_BE",
  description:
    "SP-Projects is uw betrouwbare partner voor dakwerken, gevelwerken en totaalrenovatie in Gent en Oost-Vlaanderen. Meer dan 20 jaar vakmanschap, maatwerk en kwaliteit.",
  shortDescription:
    "Uw partner voor dakwerken, gevelwerken en totaalrenovatie in Gent en Oost-Vlaanderen.",
  contact: {
    phone: "0486 20 12 79",
    phoneHref: "tel:+32486201279",
    phone2: "0485 61 55 58",
    phone2Href: "tel:+32485615558",
    email: "info@sp-projects.be",
    emailHref: "mailto:info@sp-projects.be",
    address: {
      street: "Leo Tertzweillaan 38",
      postalCode: "9050",
      city: "Gentbrugge",
      country: "België",
      countryCode: "BE",
    },
    vat: "BE1012.681.384",
    geo: { lat: 51.0349, lng: 3.7589 },
    hours: [
      { day: "Maandag t.e.m. vrijdag", time: "08:00 – 18:00" },
      { day: "Zaterdag & zondag", time: "Op afspraak" },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/sp_projects_bv",
  },
  serviceArea: ["Gent", "Gentbrugge", "Oost-Vlaanderen"],
  stats: [
    { value: "20+", label: "Jaar ervaring" },
    { value: "100%", label: "Maatwerk" },
    { value: "3D", label: "Visualisatie vooraf" },
    { value: "O-VL", label: "Werkgebied" },
  ],
} as const;

export const nav = {
  primary: [
    {
      label: "Diensten",
      href: "/diensten",
      children: [
        { label: "Platte daken", href: "/diensten/platte-daken" },
        { label: "Hellende daken", href: "/diensten/hellende-daken" },
        { label: "Crepi", href: "/diensten/crepi" },
        { label: "Steenstrips", href: "/diensten/steenstrips" },
        { label: "Gevelsteen", href: "/diensten/gevelsteen" },
        { label: "Algemene renovatiewerken", href: "/diensten/algemene-renovatiewerken" },
      ],
    },
    { label: "Realisaties", href: "/realisaties" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
