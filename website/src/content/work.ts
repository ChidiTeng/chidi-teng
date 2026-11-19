/**
 * Case studies. Drafts render in development (with a badge) and are excluded
 * from production builds, the sitemap and the home page.
 *
 * Before publishing: confirm NDA status, get written permission or anonymise,
 * and make sure every number in `results` has a source you can show.
 */
export type CaseStudy = {
  slug: string;
  status: "draft" | "published";
  title: string;
  client: string; // or an anonymised descriptor, e.g. "Lagos fintech startup"
  summary: string;
  description: string; // meta description, <= 155 chars
  problem: string;
  approach: string[];
  results: { label: string; value: string; source: string }[];
  stack: string[];
  services: string[]; // service slugs, for internal linking
  year: number;
  url?: string;
};

const all: CaseStudy[] = [
  {
    slug: "example-dashboard-rebuild",
    status: "draft",
    title: "Rebuilding an operations dashboard for speed",
    client: "Anonymised logistics company",
    summary:
      "Replace with a real project. Describe the problem, what you changed and the measured result.",
    description:
      "Draft case study placeholder. Replace with a real project summary under 155 characters.",
    problem:
      "Describe the situation before you arrived: what was slow, broken or missing, and why it mattered to the business.",
    approach: [
      "What you did first and why.",
      "The key technical decision and the trade-off it involved.",
      "How you verified the change worked.",
    ],
    results: [
      {
        label: "Example metric",
        value: "TBC",
        source: "Where this number comes from",
      },
    ],
    stack: ["Next.js", "TypeScript", "Chakra UI"],
    services: ["dashboard-development", "core-web-vitals-audit"],
    year: 2026,
  },
  {
    slug: "example-marketing-site",
    status: "draft",
    title: "A marketing site that ranks and converts",
    client: "Anonymised professional services firm",
    summary:
      "Replace with a real project. Lead with the outcome, then the approach.",
    description:
      "Draft case study placeholder. Replace with a real project summary under 155 characters.",
    problem: "Describe the starting point and the business goal.",
    approach: ["Step one.", "Step two.", "Step three."],
    results: [
      {
        label: "Example metric",
        value: "TBC",
        source: "Where this number comes from",
      },
    ],
    stack: ["Next.js", "TypeScript", "MDX"],
    services: ["nextjs-development", "website-redesign"],
    year: 2026,
  },
];

const showDrafts = process.env.NODE_ENV !== "production";

export const caseStudies = all.filter(
  (c) => c.status === "published" || showDrafts,
);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const allCaseStudiesForTests = all;
