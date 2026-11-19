import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { site } from "@/content/site";
import { leadServices, type LeadService } from "@/content/services";
import type { PostMeta } from "@/content/posts";

export const siteUrl = publicEnv.siteUrl;
export const absoluteUrl = (path = "/") =>
  new URL(path, `${siteUrl}/`).toString();

export const SEO_LIMITS = { title: 60, description: 155 } as const;

/**
 * Per-page metadata with canonical and Open Graph filled in consistently.
 * `title` is absolute: the 60-character budget is the whole <title>, so the
 * layout template is not appended.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: "en_NG",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const personId = `${siteUrl}/#person`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  jobTitle: site.role,
  url: siteUrl,
  sameAs: Object.values(site.socials),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  knowsAbout: site.stack,
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#business`,
  name: `${site.name}, Frontend Development`,
  url: siteUrl,
  founder: { "@id": personId },
  areaServed: ["Nigeria", "Remote"],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  serviceType: leadServices.map((s) => s.name),
};

export function serviceOfferSchema(s: LeadService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.page.description,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": personId },
    areaServed: ["Nigeria", "Remote"],
  };
}

export function articleSchema(p: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.published,
    dateModified: p.updated ?? p.published,
    url: absoluteUrl(`/blog/${p.slug}`),
    author: { "@id": personId, "@type": "Person", name: site.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
