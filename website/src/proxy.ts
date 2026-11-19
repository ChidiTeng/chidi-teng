import { NextResponse, type NextRequest } from "next/server";
import { leadServices } from "@/content/services";
import { posts } from "@/content/posts";
import { caseStudies } from "@/content/work";

/**
 * Real 404s for unknown slugs.
 *
 * With Cache Components, the prerendered shell streams with a 200 before a
 * page's notFound() can run, so unknown slugs would be soft 404s (noindex but
 * status 200). Checking the slug here, before rendering starts, returns a
 * proper 404. The lookup is a Set check against static content: no I/O.
 */
const known: Record<string, Set<string>> = {
  services: new Set(leadServices.map((s) => s.slug)),
  blog: new Set(posts.map((p) => p.slug)),
  work: new Set(caseStudies.map((c) => c.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const slugs = section ? known[section] : undefined;
  if (!slugs || !slug) return NextResponse.next();
  if (rest.length === 0 && slugs.has(slug)) return NextResponse.next();
  // Rewrite to a path no route matches, so the root not-found UI renders with a 404 status.
  return NextResponse.rewrite(new URL("/__not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: ["/services/:path+", "/blog/:path+", "/work/:path+"],
};
