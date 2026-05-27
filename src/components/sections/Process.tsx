import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    n: "01",
    title: "Contact & advies",
    text: "We luisteren naar uw plannen via telefoon, e-mail of een afspraak ter plaatse en geven eerlijk advies.",
  },
  {
    n: "02",
    title: "Offerte & planning",
    text: "U ontvangt een gedetailleerde offerte met kosten, materialen en een duidelijke timing.",
  },
  {
    n: "03",
    title: "Voorbereiding",
    text: "Materiaalbestelling, eventuele vergunningen en een strakke organisatie van de werf.",
  },
  {
    n: "04",
    title: "Uitvoering & oplevering",
    text: "Vakkundige uitvoering en een grondige oplevering — pas afgerond als u 100% tevreden bent.",
  },
];

export function Process() {
  return (
    <Section variant="default" padding="default" className="border-t border-border">
      <Container size="lg">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Werkwijze</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] text-balance">
              Een helder stappenplan, zonder verrassingen.
            </h2>
            <p className="mt-5 text-lg text-ink-2 leading-relaxed max-w-md">
              We werken volgens een vast stramien — omdat het u zekerheid en transparantie geeft.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative">
              <div aria-hidden className="absolute left-6 top-2 bottom-2 w-px bg-border" />
              {steps.map((step, i) => (
                <li
                  key={step.n}
                  className={`relative flex gap-6 ${i === steps.length - 1 ? "" : "pb-10"}`}
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-sm tracking-wider ring-4 ring-white">
                    {step.n}
                  </div>
                  <div className="pt-2.5">
                    <h3 className="text-xl sm:text-[22px] font-bold text-ink leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-ink-2 leading-relaxed text-[16px] max-w-xl">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
