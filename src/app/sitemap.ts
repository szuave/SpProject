import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { listPublishedBlog, listPublishedRealisaties } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/diensten`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/realisaties`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/diensten/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const realisatieUrls: MetadataRoute.Sitemap = listPublishedRealisaties().map((r) => ({
    url: `${site.url}/realisaties/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogUrls: MetadataRoute.Sitemap = listPublishedBlog().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...base, ...serviceUrls, ...realisatieUrls, ...blogUrls];
}
