import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/sections/CallToAction";
import { listPublishedBlog } from "@/lib/db";
import { ArrowRight } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Blog — Tips over dak, gevel & renovatie",
  description:
    "Praktische tips en inzichten over dakwerken, gevelwerken en renovatie van SP-Projects in Gent en Oost-Vlaanderen.",
  path: "/blog",
});

const fmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const posts = listPublishedBlog();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Blog"
        intro="Praktische tips en inzichten over dakwerken, gevelwerken en renovatie."
      />

      <Section padding="default">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-ink-3 py-12">Binnenkort verschijnen hier onze artikels.</p>
          ) : (
            <>
              {featured && (
                <Reveal>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid lg:grid-cols-2 gap-8 items-center rounded-2xl border border-border overflow-hidden hover:shadow-elev-2 transition-all"
                  >
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full bg-surface-3 min-h-[260px]">
                      {featured.cover_image && (
                        <Image src={featured.cover_image} alt={featured.title} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="p-8 lg:pr-10">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                        {featured.published_at ? fmt.format(new Date(featured.published_at)) : "Nieuw"}
                      </span>
                      <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-brand-600 transition-colors">
                        {featured.title}
                      </h2>
                      {featured.excerpt && <p className="mt-3 text-ink-2 leading-relaxed">{featured.excerpt}</p>}
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em] text-brand-600">
                        Lees artikel <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )}

              {rest.length > 0 && (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p, i) => (
                    <Reveal as="li" key={p.id} delay={(i % 3) * 70}>
                      <Link href={`/blog/${p.slug}`} className="group flex flex-col h-full rounded-2xl border border-border overflow-hidden hover:shadow-elev-2 hover:-translate-y-0.5 transition-all">
                        <div className="relative aspect-[16/10] bg-surface-3">
                          {p.cover_image && (
                            <Image src={p.cover_image} alt={p.title} fill sizes="(min-width:1024px) 380px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          )}
                        </div>
                        <div className="p-6 flex flex-col grow">
                          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-3">
                            {p.published_at ? fmt.format(new Date(p.published_at)) : "Nieuw"}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-extrabold leading-tight group-hover:text-brand-600 transition-colors">
                            {p.title}
                          </h3>
                          {p.excerpt && <p className="mt-2 text-[14px] text-ink-2 leading-relaxed grow">{p.excerpt}</p>}
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                            Lees verder <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}
            </>
          )}
        </Container>
      </Section>

      <CallToAction />
    </>
  );
}
