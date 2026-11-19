#!/usr/bin/env node
/**
 * Post-build SEO and a11y smoke audit against a running server.
 * Crawls every URL in /sitemap.xml and checks the rendered HTML for:
 *   - HTTP 200, <html lang>, exactly one <h1>
 *   - <title> present and <= 60 chars, meta description present and <= 155
 *   - a canonical link, unique titles and descriptions across pages
 * Also checks robots.txt and that unknown URLs return 404.
 *
 * Usage: npm run build && npm start & npm run audit:seo
 *        BASE_URL=https://preview.example.com npm run audit:seo
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const LIMITS = { title: 60, description: 155 };

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

function inspect(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1];
  const metaTags = html.match(/<meta [^>]*>/g) ?? [];
  const descTag = metaTags.find((t) => /name="description"/.test(t));
  const canonicalTag = (html.match(/<link [^>]*>/g) ?? []).find((t) =>
    /rel="canonical"/.test(t),
  );
  return {
    lang: html.match(/<html[^>]*\slang="([^"]+)"/)?.[1],
    h1Count: (html.match(/<h1[\s>]/g) ?? []).length,
    title: title && decode(title),
    description: descTag && decode(attr(descTag, "content") ?? ""),
    canonical: canonicalTag && attr(canonicalTag, "href"),
    noindex: metaTags.some((t) => /name="robots"/.test(t) && /noindex/.test(t)),
  };
}

async function main() {
  const failures = [];
  const fail = (url, msg) => failures.push(`${url}: ${msg}`);

  const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
  if (!sitemapRes.ok)
    throw new Error(`sitemap.xml returned ${sitemapRes.status}`);
  const locs = [
    ...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((m) => new URL(m[1]).pathname);
  if (locs.length === 0) throw new Error("sitemap.xml has no URLs");

  const seenTitles = new Map();
  const seenDescriptions = new Map();

  for (const path of locs) {
    const url = `${BASE}${path}`;
    const res = await fetch(url, { redirect: "manual" });
    if (res.status !== 200) {
      fail(path, `status ${res.status}`);
      continue;
    }
    const page = inspect(await res.text());
    if (!page.lang) fail(path, "missing <html lang>");
    if (page.h1Count !== 1)
      fail(path, `expected 1 <h1>, found ${page.h1Count}`);
    if (!page.title) fail(path, "missing <title>");
    else if (page.title.length > LIMITS.title)
      fail(path, `title is ${page.title.length} chars: "${page.title}"`);
    if (!page.description) fail(path, "missing meta description");
    else if (page.description.length > LIMITS.description)
      fail(path, `description is ${page.description.length} chars`);
    if (!page.canonical) fail(path, "missing canonical link");
    if (page.noindex) fail(path, "page in sitemap is noindex");

    if (page.title) {
      if (seenTitles.has(page.title))
        fail(path, `duplicate title with ${seenTitles.get(page.title)}`);
      seenTitles.set(page.title, path);
    }
    if (page.description) {
      if (seenDescriptions.has(page.description))
        fail(
          path,
          `duplicate description with ${seenDescriptions.get(page.description)}`,
        );
      seenDescriptions.set(page.description, path);
    }
    console.log(
      `${failures.some((f) => f.startsWith(`${path}:`)) ? "✗" : "✓"} ${path}  (${page.title?.length ?? 0}/${page.description?.length ?? 0})`,
    );
  }

  const robots = await fetch(`${BASE}/robots.txt`);
  if (!robots.ok || !(await robots.text()).includes("Sitemap:"))
    fail("/robots.txt", "missing or has no Sitemap line");

  const missing = await fetch(
    `${BASE}/this-page-should-not-exist-${Date.now()}`,
  );
  if (missing.status !== 404)
    fail("/404", `unknown URL returned ${missing.status}`);

  if (failures.length) {
    console.error(
      `\n${failures.length} problem(s):\n- ${failures.join("\n- ")}`,
    );
    process.exit(1);
  }
  console.log(`\nAll ${locs.length} sitemap URLs passed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
