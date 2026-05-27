import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Crumb = { label: string; href?: string };

export function PageHero({
  crumbs,
  title,
  intro,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-white border-b border-border">
      <Container className="pt-12 pb-14 sm:pt-16 sm:pb-16">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-3" aria-label="Kruimelpad">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-600">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-2">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-brand-500">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</p>
        )}
      </Container>
    </section>
  );
}
