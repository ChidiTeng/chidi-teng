/**
 * Blog registry. Each post is `src/content/posts/<slug>.mdx` plus an entry here.
 * Keeping metadata in TypeScript (not frontmatter) gives type-checked dates,
 * character limits enforced by tests and zero MDX parsing for index pages.
 */
export type PostMeta = {
  slug: string;
  title: string; // <= 60 chars
  description: string; // <= 155 chars
  published: string; // ISO date
  updated?: string;
  /** Service slugs this post should link to (internal linking for SEO). */
  relatedServices: string[];
  draft?: boolean;
};

const all: PostMeta[] = [
  {
    slug: "core-web-vitals-checklist-nextjs",
    title: "A Core Web Vitals Checklist for Next.js Sites",
    description:
      "A practical checklist for improving LCP, INP and CLS on Next.js sites, ordered by impact, with the checks to run on a real phone before launch.",
    published: "2026-11-19",
    relatedServices: ["core-web-vitals-audit", "nextjs-development"],
  },
];

const showDrafts = process.env.NODE_ENV !== "production";

export const posts = all
  .filter((p) => !p.draft || showDrafts)
  .sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const allPostsForTests = all;
