import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { services, leadServices } from "./services";
import { allCaseStudiesForTests } from "./work";
import { allPostsForTests } from "./posts";
import { homeFaq } from "./faq";
import { proof } from "./proof";
import { SEO_LIMITS } from "@/lib/seo";
import { extractToc } from "@/lib/toc";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

describe("services", () => {
  it("has unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("offers 17 services, with 5 lead services that each have a page", () => {
    expect(services).toHaveLength(17);
    expect(leadServices).toHaveLength(5);
    expect(services.filter((s) => s.lead && !s.page)).toEqual([]);
  });

  it.each(leadServices.map((s) => [s.slug, s] as const))(
    "%s respects SEO limits",
    (_slug, s) => {
      expect(s.page.title.length, s.page.title).toBeLessThanOrEqual(
        SEO_LIMITS.title,
      );
      expect(s.page.description.length, s.page.description).toBeLessThanOrEqual(
        SEO_LIMITS.description,
      );
      expect(s.page.benefits).toHaveLength(3);
      expect(s.page.updated).toMatch(isoDate);
    },
  );

  it("has unique titles and descriptions across pages", () => {
    const titles = leadServices.map((s) => s.page.title);
    const descriptions = leadServices.map((s) => s.page.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});

describe("case studies", () => {
  it("published entries are complete and within limits", () => {
    for (const c of allCaseStudiesForTests.filter(
      (x) => x.status === "published",
    )) {
      expect(c.description.length).toBeLessThanOrEqual(SEO_LIMITS.description);
      expect(c.results.every((r) => r.source.trim().length > 0)).toBe(true);
      expect(
        c.services.every((slug) => services.some((s) => s.slug === slug)),
      ).toBe(true);
    }
  });
});

describe("posts", () => {
  it.each(allPostsForTests.map((p) => [p.slug, p] as const))(
    "%s is valid",
    (slug, p) => {
      expect(p.title.length).toBeLessThanOrEqual(SEO_LIMITS.title);
      expect(p.description.length).toBeLessThanOrEqual(SEO_LIMITS.description);
      expect(p.published).toMatch(isoDate);
      const file = path.join(__dirname, "posts", `${slug}.mdx`);
      expect(existsSync(file), `missing ${file}`).toBe(true);
      const source = readFileSync(file, "utf8");
      expect(
        source,
        "post bodies must not contain an H1; the page owns it",
      ).not.toMatch(/^#\s/m);
      expect(extractToc(source).length).toBeGreaterThan(0);
      expect(
        p.relatedServices.every((r) => leadServices.some((s) => s.slug === r)),
      ).toBe(true);
    },
  );
});

describe("faq and proof", () => {
  it("faq questions are unique", () => {
    expect(new Set(homeFaq.map((f) => f.q)).size).toBe(homeFaq.length);
  });

  it("every verified claim names its source", () => {
    for (const p of proof.filter((x) => x.verified))
      expect(p.source.trim()).not.toBe("");
  });
});
