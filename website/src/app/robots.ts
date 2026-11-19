import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Keep preview and staging deployments out of the index.
  const isProd = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : true;
  return {
    rules: isProd
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/kit"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
