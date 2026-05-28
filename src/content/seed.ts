// Seed-data — wordt 1x ingeladen wanneer de SQLite-database leeg is.
// Realisaties komen uit de bestaande projecten; blogartikels zijn nieuw.

export type SeedRealisatie = {
  slug: string;
  title: string;
  summary: string;
  description_md: string;
  location: string;
  service_type: "dakwerken" | "gevelwerken" | "renovatie";
  cover_image: string;
  gallery: string[];
  surface_m2: number | null;
  completed_on: string | null; // YYYY-MM-DD
  status: "published" | "draft";
};

export type SeedBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  cover_image: string | null;
  tags: string[];
  status: "published" | "draft";
  published_at: string | null; // ISO
};

export const SEED_REALISATIES: SeedRealisatie[] = [
  {
    slug: "gevelrenovatie-gentbrugge",
    title: "Gevelrenovatie",
    summary: "Volledige gevelrenovatie met strakke afwerking in Gentbrugge.",
    description_md:
      "Een verouderde gevel kreeg bij dit project een complete metamorfose. We brachten gevelisolatie aan en werkten af met een strakke, eigentijdse uitstraling — meteen ook een flinke winst op de energiefactuur.",
    location: "Gentbrugge",
    service_type: "gevelwerken",
    cover_image: "/img/project-1.png",
    gallery: [],
    surface_m2: 120,
    completed_on: "2025-09-12",
    status: "published",
  },
  {
    slug: "dak-en-houtbekleding-gent",
    title: "Dak & houtbekleding",
    summary: "Dakwerken gecombineerd met warme houten gevelbekleding.",
    description_md:
      "Bij deze woning combineerden we nieuwe dakwerken met een warme houten gevelbekleding. Het resultaat is een eigentijds geheel dat perfect bij de omgeving past.",
    location: "Gent",
    service_type: "dakwerken",
    cover_image: "/img/project-2.png",
    gallery: [],
    surface_m2: 90,
    completed_on: "2025-07-03",
    status: "published",
  },
  {
    slug: "badkamerrenovatie-oost-vlaanderen",
    title: "Badkamerrenovatie",
    summary: "Volledige badkamerrenovatie met inloopdouche en maatwerk.",
    description_md:
      "Een complete badkamerrenovatie van A tot Z: nieuwe leidingen, tegelwerk, sanitair en een ruime inloopdouche met maatwerkberging.",
    location: "Oost-Vlaanderen",
    service_type: "renovatie",
    cover_image: "/img/project-3.png",
    gallery: [],
    surface_m2: 14,
    completed_on: "2025-05-20",
    status: "published",
  },
  {
    slug: "totaalrenovatie-gent",
    title: "Totaalrenovatie",
    summary: "Volledige herinrichting van een woning, sleutel-op-de-deur.",
    description_md:
      "Bij deze totaalrenovatie namen we het volledige traject uit handen — van structurele aanpassingen tot vernieuwde sanitaire en elektrische installatie. Eén aanspreekpunt, één planning.",
    location: "Gent",
    service_type: "renovatie",
    cover_image: "/img/project-4.png",
    gallery: [],
    surface_m2: 160,
    completed_on: "2025-03-08",
    status: "published",
  },
  {
    slug: "vloerwerken-oost-vlaanderen",
    title: "Vloerwerken",
    summary: "Chape en tegelwerk, strak en perfect waterpas gelegd.",
    description_md:
      "Nieuwe chape met daarop vakkundig gelegd tegelwerk. Strak afgewerkt en perfect waterpas — de basis van elke geslaagde renovatie.",
    location: "Oost-Vlaanderen",
    service_type: "renovatie",
    cover_image: "/img/vloerwerken.jpg",
    gallery: [],
    surface_m2: 75,
    completed_on: "2025-02-11",
    status: "published",
  },
  {
    slug: "zolderwerken-gent",
    title: "Zolderwerken",
    summary: "Isolatie, afwerking en Velux-ramen voor extra leefruimte.",
    description_md:
      "Een onbenutte zolder werd omgetoverd tot volwaardige leefruimte: dakisolatie, een nette afwerking, maatwerkberging en nieuwe Velux-dakramen voor volop licht.",
    location: "Gent",
    service_type: "renovatie",
    cover_image: "/img/zolderwerken.jpg",
    gallery: [],
    surface_m2: 45,
    completed_on: "2024-11-26",
    status: "published",
  },
  {
    slug: "ruwbouw-en-renovatie-oost-vlaanderen",
    title: "Ruwbouw & renovatie",
    summary: "Structurele ruwbouw als basis voor een grondige renovatie.",
    description_md:
      "Van metselwerk tot draagstructuur: bij dit project legden we de ruwbouwbasis voor een grondige renovatie. Stevig, correct en volgens plan uitgevoerd.",
    location: "Oost-Vlaanderen",
    service_type: "renovatie",
    cover_image: "/img/renovatie.jpeg",
    gallery: [],
    surface_m2: 200,
    completed_on: "2024-08-19",
    status: "published",
  },
];

export const SEED_BLOG_POSTS: SeedBlogPost[] = [
  {
    slug: "epdm-of-roofing-welk-plat-dak-kiezen",
    title: "EPDM of roofing: welk plat dak kiest u?",
    excerpt:
      "Twee betrouwbare materialen voor uw platte dak, elk met eigen voordelen. We zetten de verschillen op een rij zodat u een weloverwogen keuze maakt.",
    content_md: `Een plat dak vernieuwen? Dan komt u al snel uit bij twee materialen: **roofing** en **EPDM**. Beide zijn betrouwbaar, maar ze verschillen op een paar belangrijke punten.

## Roofing

Roofing bestaat uit een tweelaags systeem — een onderlaag en een toplaag met leislag-afwerking. Een goed geplaatst roofingdak gaat gemiddeld zo'n **30 jaar** mee en is uitstekend bestand tegen de Belgische weersomstandigheden.

- Bewezen techniek, al decennia in gebruik
- Goede prijs-kwaliteitverhouding
- Naadloze aansluiting rond details

## EPDM

EPDM is een rubbermembraan dat steeds populairder wordt. De grote troef is de **levensduur tot 50 jaar**, gecombineerd met sterke elastische eigenschappen.

- Zeer lange levensduur
- Onderhoudsarm
- Eenvoudig en lokaal te herstellen

## Welke kiezen?

Voor de meeste woningen adviseren we EPDM omwille van de levensduur en het lage onderhoud. Bij specifieke daken of budgetten kan roofing de betere keuze zijn. Twijfelt u? Wij komen graag ter plaatse kijken en geven eerlijk advies.`,
    cover_image: "/img/project-2.png",
    tags: ["dakwerken", "platte daken"],
    status: "published",
    published_at: "2026-04-18T09:00:00.000Z",
  },
  {
    slug: "crepi-of-steenstrips-gevelafwerking-kiezen",
    title: "Crepi of steenstrips: zo kiest u uw gevelafwerking",
    excerpt:
      "Een strakke pleisterlaag of de authentieke look van baksteen? Ontdek welke gevelafwerking het best bij uw woning past.",
    content_md: `Uw gevel bepaalt voor een groot deel de uitstraling van uw woning. Twee populaire afwerkingen: **crepi** en **steenstrips**.

## Crepi — strak en modern

Crepi (gevelbepleistering) zorgt voor een naadloze, eigentijdse look. Het kan op nagenoeg elke ondergrond worden aangebracht — ook op isolatieplaten.

- Strakke, moderne uitstraling
- Ideaal in combinatie met gevelisolatie
- Grote keuze aan kleuren en structuren

## Steenstrips — authentiek karakter

Wilt u de warme uitstraling van baksteen zonder muurdikte te verliezen? Dan zijn steenstrips de oplossing.

- De look van volle baksteen
- Ruimtebesparend
- Perfect te combineren met isolatie

## Ons advies

Beide afwerkingen verhogen de isolatiewaarde van uw gevel. De keuze is vooral esthetisch: strak en modern (crepi) of warm en klassiek (steenstrips). We tonen u graag stalen en visualiseren het resultaat in 3D.`,
    cover_image: "/img/project-1.png",
    tags: ["gevelwerken", "crepi", "steenstrips"],
    status: "published",
    published_at: "2026-03-22T09:00:00.000Z",
  },
  {
    slug: "dakisolatie-langs-binnen-of-buiten",
    title: "Dakisolatie: langs binnen of langs buiten?",
    excerpt:
      "Goede dakisolatie verlaagt uw energiefactuur fors. Maar isoleert u best langs binnen of langs buiten? De voor- en nadelen op een rij.",
    content_md: `Het dak is verantwoordelijk voor een groot deel van het warmteverlies in een woning. Goede **dakisolatie** is dus een slimme investering. Maar hoe pakt u het aan?

## Langs buiten isoleren

Hierbij wordt de dakbedekking verwijderd en opnieuw geplaatst, met isolatie ertussen.

- Uw woning blijft binnenin onaangetast
- Ideaal te combineren met een dakvernieuwing
- Geen verlies van binnenruimte

## Langs binnen isoleren

Hierbij blijft het dak intact en wordt er binnenin geïsoleerd.

- Minder ingrijpend en vaak goedkoper
- Sneller uit te voeren
- Wel een klein verlies aan binnenruimte

## Conclusie

Plant u sowieso een dakvernieuwing? Dan is langs buiten isoleren logisch. Wilt u enkel isoleren zonder grote werken? Dan is langs binnen vaak de beste keuze. Wij bekijken uw situatie en adviseren de meest kostenefficiënte oplossing.`,
    cover_image: "/img/zolderwerken.jpg",
    tags: ["dakwerken", "isolatie"],
    status: "published",
    published_at: "2026-02-10T09:00:00.000Z",
  },
  {
    slug: "renoveren-in-gent-waar-op-letten",
    title: "Renoveren in Gent: waar moet u op letten?",
    excerpt:
      "Van vergunningen tot planning en premies — een geslaagde renovatie begint bij een goede voorbereiding. Onze tips.",
    content_md: `Een renovatie is een mooi project, maar een goede voorbereiding maakt het verschil tussen stress en succes. Een paar aandachtspunten.

## 1. Begin met een duidelijk plan

Weet wat u wil bereiken: meer comfort, een betere energieprestatie of een frisse uitstraling. Bij SP-Projects visualiseren we uw project in 3D zodat u vooraf precies weet wat u krijgt.

## 2. Eén aanspreekpunt

Werk met een partner die het volledige traject coördineert. Zo voorkomt u dat verschillende aannemers naar elkaar wijzen wanneer er iets misloopt.

## 3. Transparante offerte

Vraag een gedetailleerde offerte met kosten, materialen en timing. Geen verrassingen achteraf.

## 4. Kwaliteitsmaterialen

Goedkoop is duurkoop. Duurzame materialen gaan langer mee en betalen zichzelf terug in comfort en energiebesparing.

Klaar om te starten? [Vraag vrijblijvend uw offerte aan](/contact) — we bekijken samen wat er mogelijk is.`,
    cover_image: "/img/renovatie.jpeg",
    tags: ["renovatie", "tips"],
    status: "published",
    published_at: "2026-01-15T09:00:00.000Z",
  },
];

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  dakwerken: "Dakwerken",
  gevelwerken: "Gevelwerken",
  renovatie: "Renovatie",
};
