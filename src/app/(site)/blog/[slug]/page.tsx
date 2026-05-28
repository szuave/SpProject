import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { getPublishedBlog } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonLd";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const fmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "long", year: "numeric" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPublishedBlog(slug);
  if (!p) return buildMetadata({ title: "Artikel niet gevonden" });
  return buildMetadata({
    title: p.title,
    description: p.excerpt ?? p.title,
    path: `/blog/${p.slug}`,
    image: p.cover_image,
  });
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPublishedBlog(slug);
  if (!p) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt ?? undefined,
    image: p.cover_image ? `${site.url}${p.cover_image}` : undefined,
    datePublished: p.published_at ?? undefined,
    dateModified: p.updated_at,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article>
        <Section padding="tight" className="pb-0">
          <Container size="md">
            <Link href="/blog" className="text-sm text-ink-3 hover:text-brand-600">← Alle artikels</Link>
            <div className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              {p.published_at ? fmt.format(new Date(p.published_at)) : "Nieuw"}
            </div>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
              {p.title}
            </h1>
            {p.excerpt && <p className="mt-5 text-lg text-ink-2 leading-relaxed">{p.excerpt}</p>}
          </Container>
        </Section>

        {p.cover_image && (
          <Container size="md" className="mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface-3 shadow-elev-2">
              <Image src={p.cover_image} alt={p.title} fill sizes="(min-width:768px) 768px, 100vw" className="object-cover" priority />
            </div>
          </Container>
        )}

        <Section padding="default" className="pt-10">
          <Container size="md">
            <div
              className="max-w-none text-ink-2 text-[17px] leading-[1.75] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5 [&_a]:text-brand-600 [&_a]:font-medium [&_a]:underline [&_strong]:text-ink"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(p.content_md) }}
            />
            {p.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="inline-flex items-center h-7 px-3 rounded-full bg-surface-2 border border-border text-xs font-semibold text-ink-2">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </article>

      <CallToAction />
    </>
  );
}
