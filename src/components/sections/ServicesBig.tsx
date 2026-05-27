import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

const categories = [
  {
    title: "Dakwerken",
    image: "/img/project-2.png",
    intro: "Platte daken in roofing of EPDM, hellende daken en dakisolatie.",
    items: [
      { label: "Platte daken", href: "/diensten/platte-daken" },
      { label: "Hellende daken", href: "/diensten/hellende-daken" },
    ],
    href: "/diensten/platte-daken",
  },
  {
    title: "Gevelwerken",
    image: "/img/gevel-1.webp",
    intro: "Crepi, steenstrips en gevelsteen — voor een tijdloze, isolerende gevel.",
    items: [
      { label: "Crepi", href: "/diensten/crepi" },
      { label: "Steenstrips", href: "/diensten/steenstrips" },
      { label: "Gevelsteen", href: "/diensten/gevelsteen" },
    ],
    href: "/diensten/crepi",
  },
  {
    title: "Renovatie",
    image: "/img/project-3.png",
    intro: "Vloeren, badkamers, zolderwerken en totaalrenovaties van A tot Z.",
    items: [
      { label: "Algemene renovatiewerken", href: "/diensten/algemene-renovatiewerken" },
    ],
    href: "/diensten/algemene-renovatiewerken",
  },
];

export function ServicesBig() {
  return (
    <Section variant="default" padding="default" id="diensten" className="border-t border-border">
      <Container>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-2">
              <span aria-hidden className="h-2 w-2 bg-brand-500" />
              Wat we doen
            </div>
            <h2 className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-[-0.02em]">
              Drie disciplines, <span className="text-brand-500">één team.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink hover:text-brand-600 transition-colors"
            >
              Alle diensten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90}>
              <article className="group h-full bg-white border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-elev-3 hover:-translate-y-0.5 transition-all duration-300">
                <Link href={c.href} className="relative block aspect-[4/3] bg-surface-3 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`${c.title} door SP-Projects`}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute left-0 top-0 bg-brand-500 text-white text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1.5">
                    0{i + 1}
                  </span>
                </Link>
                <div className="p-7 flex flex-col grow">
                  <h3 className="font-display text-2xl font-extrabold text-ink">{c.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{c.intro}</p>
                  <ul className="mt-5 space-y-2 grow">
                    {c.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className="group/it flex items-center justify-between gap-3 py-2 text-[15px] text-ink hover:text-brand-600 border-b border-border last:border-0"
                        >
                          <span className="font-medium">{it.label}</span>
                          <ArrowRight className="h-4 w-4 text-ink-3 group-hover/it:text-brand-500 group-hover/it:translate-x-0.5 transition" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={c.href}
                    className="mt-6 inline-flex items-center gap-2 self-start h-10 px-4 bg-ink hover:bg-brand-500 text-white text-[12.5px] font-bold uppercase tracking-[0.1em] transition-colors"
                  >
                    Ontdek {c.title.toLowerCase()}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
