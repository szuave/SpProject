import { Container } from "@/components/ui/Container";

const stats = [
  { value: "20+", label: "Jaar ervaring in dak- en gevelwerken" },
  { value: "100%", label: "Maatwerk, geen standaardpakketten" },
  { value: "3D", label: "Visualisatie voor uw project van start gaat" },
  { value: "1", label: "Vast aanspreekpunt, van A tot Z" },
];

export function StatsBlack() {
  return (
    <section className="bg-ink text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <div key={s.label} className={`lg:px-8 ${i === 0 ? "lg:pl-0" : ""}`}>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl lg:text-6xl font-extrabold leading-none">
                  {s.value}
                </span>
                <span className="h-2 w-2 bg-brand-500" aria-hidden />
              </div>
              <p className="mt-3 text-[14px] uppercase tracking-[0.1em] text-white/60 max-w-[26ch]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
