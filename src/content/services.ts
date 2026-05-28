export type Service = {
  slug: string;
  title: string;
  tagline: string;
  category: "Dakwerken" | "Gevelwerken" | "Renovatie";
  image: string;
  intro: string;
  blocks: { heading: string; body: string }[];
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "platte-daken",
    title: "Platte daken",
    tagline: "Roofing of EPDM met een levensduur tot 50 jaar.",
    category: "Dakwerken",
    image: "/img/project-2.png",
    intro:
      "Een plat dak is meer dan een esthetische keuze. Met 15+ jaar ervaring plaatsen wij platte daken in hoogstaande kwaliteitsmaterialen — roofing of EPDM — die decennialang meegaan.",
    blocks: [
      {
        heading: "Roofing",
        body: "Roofing bestaat uit een tweelaags systeem: een onderlaag en een toplaag met leislag-afwerking. Een goed geplaatst roofingdak kent een gemiddelde levensduur van zo'n 30 jaar en is bestand tegen de Belgische weersomstandigheden.",
      },
      {
        heading: "EPDM-dakbedekking",
        body: "EPDM is een populair materiaal voor het bedekken van platte daken. Het kenmerkt zich door een levensduur tot 50 jaar, sterk elastische eigenschappen, een laag onderhoud en eenvoudige herstellingen.",
      },
    ],
    benefits: [
      "Lange levensduur — tot 50 jaar bij EPDM",
      "Onderhoudsarm en eenvoudig herstelbaar",
      "Te combineren met performante dakisolatie",
      "Bestand tegen weer en wind",
    ],
  },
  {
    slug: "hellende-daken",
    title: "Hellende daken",
    tagline: "Aanleg, renovatie en onderhoud van hellende daken.",
    category: "Dakwerken",
    image: "/img/zolderwerken.jpg",
    intro:
      "SP-Projects is gespecialiseerd in de aanleg, renovatie en het onderhoud van hellende daken. Onze ervaren vakmensen garanderen duurzame en esthetisch aantrekkelijke dakoplossingen.",
    blocks: [
      {
        heading: "Dakrenovatie",
        body: "Bij SP-Projects kunt u terecht voor meerdere soorten renovatie- en dakwerken: het vernieuwen van uw dakbedekking, het plaatsen van isolatie, een onderdak of een volledig nieuw dak.",
      },
      {
        heading: "Dakisolatie",
        body: "We isoleren hellende daken zowel langs buiten als langs binnen. Isolatie langs buiten houdt uw woning binnenin onaangetast; isolatie langs binnen laat het dak intact en is vaak een minder grote klus, waardoor de kosten lager liggen.",
      },
    ],
    benefits: [
      "Volledige opbouw: van onderdak tot dakbedekking",
      "Isolatie langs binnen of buiten",
      "Esthetisch afgestemd op uw woning",
      "Geschikt voor nieuwbouw én renovatie",
    ],
  },
  {
    slug: "crepi",
    title: "Crepi",
    tagline: "Hoogwaardige gevelbepleistering, ook op isolatie.",
    category: "Gevelwerken",
    image: "/img/project-1.png",
    intro:
      "SP-Projects is gespecialiseerd in het aanbrengen van hoogwaardige gevelbepleistering, ook wel crepi genoemd — voor een strakke, moderne en duurzame gevel.",
    blocks: [
      {
        heading: "Op zo goed als elke ondergrond",
        body: "Crepi kan worden aangebracht op nagenoeg elke ondergrond — van bestaande gevels tot isolatieplaten. Daardoor is het de ideale afwerking bij zowel renovatie als nieuwbouw.",
      },
      {
        heading: "Energiezuinig én esthetisch",
        body: "Door crepi te combineren met gevelisolatie verbetert u meteen de energieprestatie van uw woning. Het resultaat: een strakke, eigentijdse gevel die jarenlang mooi blijft.",
      },
    ],
    benefits: [
      "Toepasbaar op bestaande gevels én isolatie",
      "Verlaagt uw energiefactuur",
      "Tijdloze, naadloze uitstraling",
      "Geschikt voor renovatie en nieuwbouw",
    ],
  },
  {
    slug: "steenstrips",
    title: "Steenstrips",
    tagline: "De authentieke baksteenlook, zonder ruimteverlies.",
    category: "Gevelwerken",
    image: "/img/renovatie.jpeg",
    intro:
      "De authentieke uitstraling van baksteen, zonder verlies van ruimte? Dan zijn steenstrips de perfecte keuze voor uw gevelafwerking.",
    blocks: [
      {
        heading: "Het plaatsingsproces",
        body: "Onze vakmensen volgen een beproefd proces: voorbereiden van de gevel, plaatsing van gevelisolatie, aanbrengen van vochtbestendige cementlijm, plakken van de steenstrips en het afwerken van de hoeken voor een naadloos resultaat.",
      },
      {
        heading: "Karakter zonder compromis",
        body: "Steenstrips combineren de tijdloze charme van baksteen met de voordelen van een dunne, ruimtebesparende afwerking — ideaal te combineren met gevelisolatie.",
      },
    ],
    benefits: [
      "Look van baksteen zonder muurdikte",
      "Ideaal te combineren met gevelisolatie",
      "Tijdloze charme bij elke bouwstijl",
      "Naadloze hoekafwerking",
    ],
  },
  {
    slug: "gevelsteen",
    title: "Gevelsteen",
    tagline: "Tijdloze, stijlvolle gevels die decennia meegaan.",
    category: "Gevelwerken",
    image: "/img/project-4.png",
    intro:
      "SP-Projects biedt een uitgebreide keuze aan gevelstenen om uw woning of gebouw een tijdloze, stijlvolle uitstraling te geven.",
    blocks: [
      {
        heading: "Tijdloos & stijlvol",
        body: "Gevelstenen zijn niet alleen duurzaam, maar ook esthetisch aantrekkelijk en passen perfect bij zowel klassieke als moderne bouwstijlen.",
      },
      {
        heading: "Van keuze tot plaatsing",
        body: "Wij begeleiden u van keuze tot plaatsing en zorgen ervoor dat de gevelstenen perfect worden geïntegreerd in het ontwerp van uw gebouw.",
      },
    ],
    benefits: [
      "Duurzaam — gaat decennia mee",
      "Onderhoudsvriendelijk",
      "Te combineren met gevelisolatie",
      "Veelzijdig: klassiek én modern",
    ],
  },
  {
    slug: "algemene-renovatiewerken",
    title: "Algemene renovatiewerken",
    tagline: "Vloeren, badkamers, zolder en totaalrenovatie.",
    category: "Renovatie",
    image: "/img/project-3.png",
    intro:
      "Plant u een uitgebreid renovatieproject? SP-Projects is dé referentie voor renovatiewerken in Gent en omgeving — één partner voor uw volledige project.",
    blocks: [
      {
        heading: "Vloer- & zolderwerken",
        body: "Chape, tegels, parket en laminaat, strak afgewerkt en perfect waterpas. Op zolder verzorgen we isolatie, dakafwerking, maatwerkberging en Velux-ramen voor extra leef- of werkruimte.",
      },
      {
        heading: "Badkamers & totaalrenovatie",
        body: "Volledige badkamerrenovaties met sanitair en maatwerk, of een complete herinrichting met structurele aanpassingen en vernieuwde leidingen voor sanitair en elektriciteit.",
      },
    ],
    benefits: [
      "Vloerwerken: chape, tegels, parket & laminaat",
      "Badkamerrenovatie van A tot Z",
      "Zolder: isolatie, berging & Velux",
      "Totaalrenovatie met één aanspreekpunt",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
