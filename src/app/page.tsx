import { Hero } from "@/components/sections/Hero";
import { StatsBlack } from "@/components/sections/StatsBlack";
import { WhyTrio } from "@/components/sections/WhyTrio";
import { ServicesBig } from "@/components/sections/ServicesBig";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { CallToAction } from "@/components/sections/CallToAction";
import { JsonLd } from "@/lib/jsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dakwerken & Gevelwerken in Gent",
  description:
    "SP-Projects — uw partner voor dakwerken, gevelwerken en totaalrenovatie in Gent en Oost-Vlaanderen. Meer dan 20 jaar vakmanschap, maatwerk en kwaliteit. Vraag vrijblijvend uw offerte aan.",
  path: "/",
});

const faqs = [
  {
    q: "In welke regio werkt SP-Projects?",
    a: "We werken in Gent, Gentbrugge en heel Oost-Vlaanderen — voor zowel particuliere als commerciële projecten.",
  },
  {
    q: "Hoe vraag ik een offerte aan?",
    a: "Via het contactformulier, telefonisch of per e-mail. We bespreken uw project, plannen een plaatsbezoek en bezorgen u een gedetailleerde offerte met kosten, materialen en timing.",
  },
  {
    q: "Werken jullie met een 3D-visualisatie?",
    a: "Ja. Al in een vroeg stadium visualiseren we uw project in 3D, zodat u precies weet wat u mag verwachten vóór de werken starten.",
  },
  {
    q: "Welke materialen gebruiken jullie voor platte daken?",
    a: "Roofing (levensduur ±30 jaar) of EPDM (levensduur tot 50 jaar, onderhoudsarm en elastisch). We adviseren u over de beste keuze voor uw situatie.",
  },
  {
    q: "Verzorgen jullie ook totaalrenovaties?",
    a: "Zeker. Van vloer- en zolderwerken over badkamerrenovaties tot een volledige herinrichting met structurele aanpassingen — met één aanspreekpunt.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <StatsBlack />
      <WhyTrio />
      <ServicesBig />
      <ProjectsShowcase />
      <QuoteBand />
      <Process />
      <FAQ items={faqs} />
      <CallToAction />
    </>
  );
}
