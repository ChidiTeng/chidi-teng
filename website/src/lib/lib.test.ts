import { describe, expect, it } from "vitest";
import { createRateLimiter, clientKey } from "./rate-limit";
import { contactSchema, isLikelySpam, MIN_FILL_MS } from "./contact-schema";
import { extractToc, slugify } from "./toc";

describe("rate limiter", () => {
  it("allows up to the limit then blocks until the window resets", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("a", 10).allowed).toBe(true);
    const blocked = check("a", 20);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBe(1);
    expect(check("b", 20).allowed).toBe(true);
    expect(check("a", 1001).allowed).toBe(true);
  });

  it("reads the first forwarded IP", () => {
    expect(
      clientKey(new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" })),
    ).toBe("1.2.3.4");
    expect(clientKey(new Headers())).toBe("unknown");
  });
});

describe("contact schema", () => {
  const valid = {
    name: "Ada",
    email: "ada@example.com",
    message: "I need a new marketing site.",
  };

  it("accepts a valid submission and trims input", () => {
    const r = contactSchema.safeParse({ ...valid, name: "  Ada  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe("Ada");
  });

  it("rejects bad email and short message", () => {
    const r = contactSchema.safeParse({
      ...valid,
      email: "nope",
      message: "hi",
    });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(r.error.issues.map((i) => i.path[0]).sort()).toEqual([
        "email",
        "message",
      ]);
  });

  it("flags honeypot and too-fast submissions as spam", () => {
    const now = 100_000;
    expect(isLikelySpam({ website: "http://spam", startedAt: 0 }, now)).toBe(
      true,
    );
    expect(
      isLikelySpam({ website: "", startedAt: now - MIN_FILL_MS + 1 }, now),
    ).toBe(true);
    expect(
      isLikelySpam({ website: "", startedAt: now - MIN_FILL_MS - 1 }, now),
    ).toBe(false);
  });
});

describe("toc", () => {
  it("extracts h2 headings and ignores code fences", () => {
    const src =
      "Intro\n\n## Fix `LCP` now\n\n```md\n## not a heading\n```\n\n### Sub\n\n## Last one ##\n";
    expect(extractToc(src)).toEqual([
      { id: "fix-lcp-now", text: "Fix LCP now" },
      { id: "last-one", text: "Last one" },
    ]);
  });

  it("slugifies consistently", () => {
    expect(slugify("Fix Largest Contentful Paint")).toBe(
      "fix-largest-contentful-paint",
    );
  });
});
