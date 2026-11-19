/**
 * Service catalogue. One source of truth for the bento grid, service pages,
 * footer links, sitemap, JSON-LD and the contact form's service dropdown.
 *
 * COPY REVIEW: wording is a first draft pending the Copy and SEO Playbook (v2).
 * Keep `title` <= 60 and `description` <= 155 characters (enforced by
 * src/content/content.test.ts, which runs before every build).
 */

export type ProofLevel = "strong" | "partial" | "building";

export type Service = {
  slug: string;
  name: string;
  /** One-line pitch for cards and lists. */
  summary: string;
  /** Lead services get a full landing page and a large bento tile. */
  lead: boolean;
  /** Bento tile footprint on desktop (lead services only). */
  tile?: "2x2" | "2x1";
  page?: {
    h1: string;
    sub: string;
    title: string; // <= 60 chars, used as an absolute <title>
    description: string; // <= 155 chars
    keyword: string;
    benefits: { title: string; body: string }[];
    deliverables: string[];
    faq: { q: string; a: string }[];
    proof: ProofLevel;
    /** ISO date of the last meaningful content change, used for sitemap lastmod. */
    updated: string;
  };
};

export const services: Service[] = [
  {
    slug: "nextjs-development",
    name: "Next.js development",
    summary:
      "Fast, SEO-ready marketing sites and web apps on the Next.js App Router.",
    lead: true,
    tile: "2x2",
    page: {
      h1: "Next.js development for sites that need to rank and load fast",
      sub: "Marketing sites and web apps built on the App Router with TypeScript, server rendering and a performance budget agreed before the first commit.",
      title: "Next.js Developer for Hire | Emmanuel Nwachukwu",
      description:
        "Freelance Next.js developer in Lagos. App Router builds with TypeScript, SEO baked in and Core Web Vitals budgets agreed up front. Book a scoping call.",
      keyword: "next.js developer",
      benefits: [
        {
          title: "Search-ready from day one",
          body: "Server-rendered HTML, per-page metadata, sitemap and structured data are part of the build, not an add-on after launch.",
        },
        {
          title: "Performance as a requirement",
          body: "We agree targets for LCP, INP and CLS during scoping and check them on a real mid-range phone before handover.",
        },
        {
          title: "Code your team can own",
          body: "Typed content files, small components and a short README so the next developer is productive on day one.",
        },
      ],
      deliverables: [
        "App Router codebase in TypeScript",
        "Per-page metadata, sitemap and JSON-LD",
        "Lighthouse and real-device performance report",
        "Deployment to Vercel or your own host",
      ],
      faq: [
        {
          q: "Can you work with my existing design?",
          a: "Yes. I build from Figma files, an existing site or a rough brief. If there is no design, I can propose a layout using a proven component system.",
        },
        {
          q: "Do I own the code?",
          a: "Yes. The repository is yours from the first commit and there are no licensing strings attached to my work.",
        },
        {
          q: "Which CMS do you use?",
          a: "It depends on who edits the content. Typed files in the repo work for developer-run sites; a headless CMS suits teams that publish often.",
        },
      ],
      proof: "strong",
      updated: "2026-11-19",
    },
  },
  {
    slug: "website-redesign",
    name: "Website redesign",
    summary:
      "Rebuild a dated or slow site without losing the rankings you already have.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Website redesign without losing your search traffic",
      sub: "A modern rebuild that keeps your URLs, redirects and metadata intact, so the new site starts with the rankings the old one earned.",
      title: "Website Redesign Services in Nigeria | Emmanuel N.",
      description:
        "Redesign and rebuild your website on Next.js with an SEO-safe migration plan: URL mapping, 301 redirects and metadata carried over. Book a scoping call.",
      keyword: "website redesign nigeria",
      benefits: [
        {
          title: "SEO-safe migration",
          body: "Every existing URL is mapped to its new home with a 301 redirect, and metadata is carried across before launch.",
        },
        {
          title: "Faster on real phones",
          body: "Most visitors arrive on mobile data. The rebuild targets mobile Core Web Vitals, not only a desktop Lighthouse score.",
        },
        {
          title: "Easier to update",
          body: "Content moves out of hard-coded templates into structured data your team can edit without breaking layouts.",
        },
      ],
      deliverables: [
        "Content and URL inventory of the current site",
        "Redirect map and launch checklist",
        "Rebuilt site on Next.js",
        "Post-launch Search Console check",
      ],
      faq: [
        {
          q: "Will my Google rankings drop?",
          a: "A short wobble is common after any migration. Redirect mapping, unchanged content where it ranks and a Search Console check after launch keep the risk low.",
        },
        {
          q: "Can we redesign in stages?",
          a: "Yes. High-traffic templates can go first behind the same domain while the rest of the site follows.",
        },
      ],
      proof: "partial",
      updated: "2026-11-19",
    },
  },
  {
    slug: "core-web-vitals-audit",
    name: "Core Web Vitals audit",
    summary:
      "Find what is slowing your site down, ranked by impact, with fixes your team can ship.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Core Web Vitals audit with fixes, not just a score",
      sub: "A prioritised report on what is hurting LCP, INP and CLS on your site, with code-level fixes and an estimate for each one.",
      title: "Core Web Vitals Audit for React and Next.js Sites",
      description:
        "Fix slow LCP, INP and layout shift. A Core Web Vitals audit for React and Next.js sites with prioritised, code-level fixes and real-device testing.",
      keyword: "core web vitals audit",
      benefits: [
        {
          title: "Field data first",
          body: "The audit starts from real-user data where it exists, then reproduces problems in the lab so fixes can be verified.",
        },
        {
          title: "Ranked by impact",
          body: "Each issue is scored by how much it moves the metric and how much effort it takes, so you fix the cheap wins first.",
        },
        {
          title: "Fixes, not jargon",
          body: "You get specific code changes or pull requests, not a list of generic Lighthouse warnings.",
        },
      ],
      deliverables: [
        "Written report with prioritised issues",
        "Bundle and render-path analysis",
        "Real-device test results",
        "Optional implementation of the fixes",
      ],
      faq: [
        {
          q: "Do you need access to my code?",
          a: "Read access gives the most precise fixes. Without it, I can still audit the live site and point at the likely causes.",
        },
        {
          q: "Is this only for Next.js?",
          a: "No. The audit covers any React front end, and most findings apply to other stacks too.",
        },
      ],
      proof: "strong",
      updated: "2026-11-19",
    },
  },
  {
    slug: "dashboard-development",
    name: "Dashboard development",
    summary:
      "Admin panels and data dashboards that stay fast with real data volumes.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Dashboard development for teams that live in their data",
      sub: "Admin panels, internal tools and customer dashboards in React and TypeScript, built to stay responsive as the data grows.",
      title: "React Dashboard Development | Emmanuel Nwachukwu",
      description:
        "Custom React and TypeScript dashboards: tables, charts, filters and role-based access that stay fast with real data. Freelance, Lagos-based, remote-ready.",
      keyword: "react dashboard developer",
      benefits: [
        {
          title: "Fast with real data",
          body: "Pagination, virtualised tables and cached queries so the UI stays responsive past the first thousand rows.",
        },
        {
          title: "Typed end to end",
          body: "API responses are validated and typed, so a backend change shows up as a build error, not a blank screen.",
        },
        {
          title: "Accessible by default",
          body: "Keyboard-operable tables, filters and dialogs, with charts that have text alternatives.",
        },
      ],
      deliverables: [
        "Dashboard UI in React and TypeScript",
        "Data layer with caching and error states",
        "Role-aware navigation and views",
        "Handover notes for your team",
      ],
      faq: [
        {
          q: "Can you connect to our existing API?",
          a: "Yes. REST and GraphQL are both fine. If the API is missing endpoints, I can spec what the front end needs.",
        },
        {
          q: "Which chart library do you use?",
          a: "The one that fits your data and bundle budget. For most dashboards a lightweight SVG library is enough.",
        },
      ],
      proof: "partial",
      updated: "2026-11-19",
    },
  },
  {
    slug: "api-integration",
    name: "API integration",
    summary:
      "Payments, CRMs, email and third-party APIs wired in safely on the server.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "API integration that keeps your keys and your users safe",
      sub: "Payment gateways, CRMs, email providers and internal APIs connected through server-side handlers with validation, retries and clear error states.",
      title: "API Integration for React and Next.js Apps",
      description:
        "Connect payments, CRMs, email and third-party APIs to your React or Next.js app. Server-side keys, validated payloads and clear error handling.",
      keyword: "api integration developer",
      benefits: [
        {
          title: "Secrets stay on the server",
          body: "Keys live in route handlers and environment variables, never in the browser bundle.",
        },
        {
          title: "Validated at the edge of your app",
          body: "Every inbound and outbound payload is checked against a schema, so bad data fails loudly and early.",
        },
        {
          title: "Failure is designed for",
          body: "Timeouts, retries and user-facing error states are part of the work, not left for later.",
        },
      ],
      deliverables: [
        "Server-side integration handlers",
        "Typed client and validation schemas",
        "Error, loading and retry states",
        "Short runbook for keys and webhooks",
      ],
      faq: [
        {
          q: "Which providers have you worked with?",
          a: "Ask about your specific provider on the scoping call. Most modern APIs follow similar patterns, and I read the docs before quoting.",
        },
        {
          q: "Can you handle webhooks?",
          a: "Yes, including signature verification and idempotent processing so repeated events do not cause duplicate actions.",
        },
      ],
      proof: "partial",
      updated: "2026-11-19",
    },
  },
  {
    slug: "react-development",
    name: "React and TypeScript development",
    summary:
      "Feature work on existing React codebases, from single tickets to full modules.",
    lead: false,
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    summary:
      "Campaign and product pages built for speed and conversion tracking.",
    lead: false,
  },
  {
    slug: "design-systems",
    name: "Component libraries",
    summary:
      "Reusable, accessible UI components with tokens and documentation.",
    lead: false,
  },
  {
    slug: "nextjs-migration",
    name: "Next.js migration",
    summary:
      "Move from Create React App or the Pages Router to the App Router.",
    lead: false,
  },
  {
    slug: "accessibility-audit",
    name: "Accessibility audit",
    summary:
      "WCAG 2.2 AA review with prioritised fixes for keyboard and screen readers.",
    lead: false,
  },
  {
    slug: "headless-cms",
    name: "Headless CMS setup",
    summary:
      "Give editors a CMS while the site stays fast and statically rendered.",
    lead: false,
  },
  {
    slug: "frontend-support",
    name: "Ongoing frontend support",
    summary: "A monthly retainer for fixes, upgrades and small features.",
    lead: false,
  },
];

export type LeadService = Service & { page: NonNullable<Service["page"]> };

export const leadServices = services.filter(
  (s): s is LeadService => s.lead && Boolean(s.page),
);
export const otherServices = services.filter((s) => !s.lead);

export function getLeadService(slug: string): LeadService | undefined {
  return leadServices.find((s) => s.slug === slug);
}
