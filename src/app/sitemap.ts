import type { MetadataRoute } from "next";
import { getCachedSiteData } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getCachedSiteData();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/enquire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic work project pages
  const workPages: MetadataRoute.Sitemap = data.projects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...workPages];
}
