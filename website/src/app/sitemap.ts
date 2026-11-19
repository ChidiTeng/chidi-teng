import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { leadServices } from "@/content/services";
import { caseStudies } from "@/content/work";
import { posts } from "@/content/posts";

/**
 * lastModified comes from content dates, not the build time: a lastmod that
 * changes on every deploy teaches crawlers to ignore it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = (dates: string[]) => dates.sort().at(-1);
  const servicesUpdated = latest(leadServices.map((s) => s.page.updated));
  const postsUpdated = latest(posts.map((p) => p.updated ?? p.published));
  const published = caseStudies.filter((c) => c.status === "published");

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest(
        [servicesUpdated ?? "", postsUpdated ?? ""].filter(Boolean),
      ),
      priority: 1,
    },
    ...leadServices.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.page.updated,
      priority: 0.8,
    })),
    ...published.map((c) => ({
      url: absoluteUrl(`/work/${c.slug}`),
      priority: 0.7,
    })),
    { url: absoluteUrl("/blog"), lastModified: postsUpdated, priority: 0.6 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.published,
      priority: 0.6,
    })),
    { url: absoluteUrl("/contact"), priority: 0.6 },
  ];
}
