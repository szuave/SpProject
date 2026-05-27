import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    n: "01",
    title: "Vakmanschap",
    body: "Ervaren team dat met precisie werkt. Geen losse onderaannemers, één vaste ploeg die het project van begin tot eind opvolgt.",
  },
  {
    n: "02",
    title: "Maatwerk",
    body: "Geen standaardpakketten. We luisteren, meten op, en bouwen exact wat bij uw woning en budget past — eerlijk en transparant.",
  },
  {
    n: "03",
    title: "3D vooraf",
    body: "Voor er ook maar een steen verlegd wordt, ziet u uw project in 3D. Zo weet u perfect wat u krijgt, zonder verrassingen.",
  },
];

export function WhyTrio() {
  return (
    <Section padding="default">
      <Container>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-2">
              <span aria-hidden className="h-2 w-2 bg-brand-500" />
              Waarom SP-Projects
            </div>
            <h2 className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-[-0.02em]">
              Drie redenen waarom <span className="text-brand-500">klanten blijven</span> terugkomen.
            </h2>
          </div>
          <div className="lg:col-span-5 text-[15px] text-ink-2 leading-relaxed">
            Een ploeg die ophaalt waar anderen afhaken. Hieronder waar wij elke werf
            op voortbouwen — geen marketingbeloften, gewoon zoals we al twintig jaar
            werken.
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 lg:grid-cols-3 border border-border">
          {reasons.map((r, i) => (
            <Reveal
              as="li"
              key={r.n}
              delay={i * 80}
              className={
                "p-8 lg:p-10 bg-white " +
                (i > 0 ? "border-t lg:border-t-0 lg:border-l border-border " : "")
              }
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl lg:text-8xl font-extrabold leading-none text-ink">
                  {r.n}
                </span>
                <span className="h-3 w-3 bg-brand-500" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
                {r.title}
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2 max-w-[36ch]">
                {r.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
