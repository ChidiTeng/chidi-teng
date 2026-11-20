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
    name: "Next.js & SaaS development",
    summary:
      "Fast, secure, SEO-ready SaaS products, B2B web apps, and marketing platforms on the Next.js App Router.",
    lead: true,
    tile: "2x2",
    page: {
      h1: "Next.js development for B2B products and sites that need speed and trust",
      sub: "Production web apps, multi-tenant storefronts, and marketing platforms built on the App Router with TypeScript, security-first architecture, and a Core Web Vitals budget agreed before the first commit.",
      title: "Next.js & SaaS Developer for Hire | Emmanuel Nwachukwu",
      description:
        "Senior Next.js engineer in Lagos. App Router SaaS and B2B builds with TypeScript, OWASP-aware security, SEO baked in, and Core Web Vitals budgets.",
      keyword: "next.js developer",
      benefits: [
        {
          title: "Architected for speed and search",
          body: "Server-rendered HTML, per-page metadata, sitemap, structured data, and real-device Core Web Vitals targets are engineered from day one.",
        },
        {
          title: "Security and resilience built in",
          body: "Strict authentication boundaries, validated inputs, and hardened headers are part of the initial architecture—not bolted on after launch.",
        },
        {
          title: "Code your engineering team can own",
          body: "Typed content models, modular components, and CI/CD review gates so your internal developers stay productive and post-release defects stay low.",
        },
      ],
      deliverables: [
        "App Router codebase in TypeScript",
        "Hardened auth, headers & input validation",
        "Per-page metadata, sitemap & JSON-LD",
        "Lighthouse & real-device performance report",
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
      updated: "2026-11-20",
    },
  },
  {
    slug: "website-redesign",
    name: "Legacy platform & site redesign",
    summary:
      "Refactor and rebuild a legacy product or slow site on Next.js without losing search traffic or business continuity.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Legacy platform and website redesign without losing traffic or momentum",
      sub: "A structured rebuild that pays down technical debt, hardens security boundaries, and keeps your URLs, redirects, and metadata intact.",
      title: "Website & SaaS Redesign Services | Emmanuel Nwachukwu",
      description:
        "Redesign and refactor legacy web apps or marketing sites on Next.js. Technical debt reduction, 301 redirect mapping, and mobile Core Web Vitals.",
      keyword: "website redesign nigeria",
      benefits: [
        {
          title: "SEO-safe migration",
          body: "Every existing URL is mapped to its new home with a 301 redirect, and metadata is carried across before launch.",
        },
        {
          title: "Technical debt paid down",
          body: "Brittle legacy state and duplicated UI templates are replaced with a typed, token-driven component architecture your team can extend safely.",
        },
        {
          title: "Faster on real mobile networks",
          body: "Most visitors and field agents operate on mobile data. The rebuild targets real-device Core Web Vitals, not just a desktop score.",
        },
      ],
      deliverables: [
        "Architecture, URL & technical-debt inventory",
        "301 redirect map and launch checklist",
        "Rebuilt platform on Next.js & TypeScript",
        "Post-launch Search Console & telemetry check",
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
      proof: "strong",
      updated: "2026-11-20",
    },
  },
  {
    slug: "core-web-vitals-audit",
    name: "Core Web Vitals & reliability audit",
    summary:
      "Pinpoint what is hurting LCP, INP, CLS, and frontend security boundaries—ranked by business impact with code-level fixes.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Core Web Vitals and frontend reliability audit with code-level fixes",
      sub: "A prioritised engineering report on what is hurting LCP, INP, CLS, and client-side resilience on your site, with concrete pull requests or patches.",
      title: "Core Web Vitals & Frontend Audit | Emmanuel Nwachukwu",
      description:
        "Fix slow LCP, INP, layout shift, and fragile client state. Prioritised, code-level fixes and real-device testing for React and Next.js applications.",
      keyword: "core web vitals audit",
      benefits: [
        {
          title: "Field data and real devices first",
          body: "The audit starts from real-user telemetry where it exists, then reproduces bottlenecks in the lab so fixes can be verified objectively.",
        },
        {
          title: "Performance + OWASP hygiene",
          body: "Alongside bundle and render-path bottlenecks, I flag exposed client secrets, unsafe third-party scripts, and broken auth redirect flows.",
        },
        {
          title: "Code changes, not generic PDFs",
          body: "You get specific code diffs or pull requests ranked by impact versus effort, not a dump of raw Lighthouse warnings.",
        },
      ],
      deliverables: [
        "Prioritised report on CWV & client resilience",
        "Bundle, hydration & render-path analysis",
        "Client-side security & third-party script check",
        "Optional pull-request implementation of fixes",
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
      updated: "2026-11-20",
    },
  },
  {
    slug: "dashboard-development",
    name: "B2B dashboards & role-based workflows",
    summary:
      "High-trust admin panels, FinTech/HR workflows, and data dashboards with RBAC and fast rendering at scale.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "Dashboard development for high-trust B2B and operational teams",
      sub: "Admin panels, approval engines, and data-heavy dashboards in React and TypeScript, engineered for role-based security and responsiveness as volume grows.",
      title: "React B2B Dashboard Development | Emmanuel Nwachukwu",
      description:
        "Custom React and TypeScript B2B dashboards: virtualised tables, role-based access control (AuthN/AuthZ), approval workflows, and resilient data caching.",
      keyword: "react dashboard developer",
      benefits: [
        {
          title: "Fast under real transaction volumes",
          body: "Pagination, virtualised views, and TanStack Query caching keep the interface responsive well past the first thousand rows.",
        },
        {
          title: "Role-based access & auditability",
          body: "Multi-stakeholder approval gates, permission-aware views, and strict AuthN/AuthZ boundaries tailored for FinTech, HR, and enterprise ops.",
        },
        {
          title: "Typed end to end",
          body: "API payloads are validated against schemas so upstream contract drift surfaces at build time rather than crashing a live operator screen.",
        },
      ],
      deliverables: [
        "B2B dashboard UI in React & TypeScript",
        "Role-aware navigation, RBAC & approval flows",
        "Cached data layer with loading, retry & error states",
        "Architecture & handover documentation",
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
      proof: "strong",
      updated: "2026-11-20",
    },
  },
  {
    slug: "api-integration",
    name: "Resilient API, sync & AI integration",
    summary:
      "Fault-tolerant third-party sync engines, payment gateways, and multi-LLM AI assistants wired safely on the server.",
    lead: true,
    tile: "2x1",
    page: {
      h1: "API and AI integrations engineered for reliability, security, and cost control",
      sub: "Third-party sync pipelines, payment gateways, CRMs, and OpenAI/Claude assistants connected with token caching, rate-limiting, retries, and strict server-side key isolation.",
      title: "Resilient API & AI Integration | Emmanuel Nwachukwu",
      description:
        "Fault-tolerant API and AI integrations for React, Next.js, and Node.js: token caching, rate limiting, exponential backoff, and tenant cost guardrails.",
      keyword: "api integration developer",
      benefits: [
        {
          title: "Engineered for transient failure (SRE)",
          body: "Token caching, request rate-limiting, and exponential-backoff retries—proven on 50,000+ daily biometric sync transactions—auto-resolve transient outages.",
        },
        {
          title: "AppSec boundaries & secret isolation",
          body: "Credentials, webhook signatures, and tenant credit caps live strictly on the server with schema validation at every trust boundary.",
        },
        {
          title: "Applied AI with cost guardrails",
          body: "Multi-provider LLM workflows (OpenAI + Claude) wired with live CRM tool retrieval and organization-level usage limits to prevent runaway token spend.",
        },
      ],
      deliverables: [
        "Server-side integration & sync handlers",
        "Token caching, rate-limiting & retry/backoff logic",
        "Typed schemas, webhook verification & credit caps",
        "Operational runbook for keys, quotas & failure modes",
      ],
      faq: [
        {
          q: "Which providers have you worked with?",
          a: "OpenAI, Claude, Supabase, Flutterwave, BioTime biometric APIs, CRMs, and custom REST/GraphQL backends. I review provider rate limits and auth models before quoting.",
        },
        {
          q: "Can you handle webhooks and high-volume background sync?",
          a: "Yes, including cryptographic signature verification, idempotent processing, and rate-limited background queues that survive third-party downtime.",
        },
      ],
      proof: "strong",
      updated: "2026-11-20",
    },
  },
  {
    slug: "web-app-security-review",
    name: "Web & API security review (OWASP)",
    summary:
      "Threat modeling, AuthN/AuthZ review, and OWASP vulnerability checks for React, Next.js, and Node.js apps.",
    lead: false,
  },
  {
    slug: "sre-resilience-engineering",
    name: "Resilience & sync engineering (SRE)",
    summary:
      "Rate-limiting, token caching, exponential-backoff retries, and fault-tolerant background sync pipelines.",
    lead: false,
  },
  {
    slug: "ai-assistant-integration",
    name: "AI assistant & multi-LLM integration",
    summary:
      "OpenAI and Claude workflows with live CRM retrieval, tool calling, and organization-level usage credit caps.",
    lead: false,
  },
  {
    slug: "pwa-offline-engineering",
    name: "Cross-origin PWA & field-agent apps",
    summary:
      "Installable PWAs that preserve install intent across auth redirects with Android and iOS fallback flows.",
    lead: false,
  },
  {
    slug: "devsecops-cicd",
    name: "CI/CD & PR quality gates (DevSecOps)",
    summary:
      "Automated build, security checks, and PR review standards proven to cut quarterly post-release defects by 73%.",
    lead: false,
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
    name: "High-conversion landing pages",
    summary:
      "Campaign and product pages built for speed and conversion tracking.",
    lead: false,
  },
  {
    slug: "design-systems",
    name: "Component libraries & multi-theme systems",
    summary:
      "Token-driven UI systems and multi-tenant storefront templates with documentation.",
    lead: false,
  },
  {
    slug: "nextjs-migration",
    name: "Next.js App Router migration",
    summary:
      "Move from Create React App or the Pages Router to the App Router safely.",
    lead: false,
  },
  {
    slug: "accessibility-audit",
    name: "WCAG 2.2 AA accessibility audit",
    summary:
      "WCAG 2.2 AA review with prioritised fixes for keyboard and screen readers.",
    lead: false,
  },
  {
    slug: "headless-cms",
    name: "Headless CMS & Supabase setup",
    summary:
      "Typed content backends and Supabase integrations that keep the frontend fast.",
    lead: false,
  },
  {
    slug: "frontend-support",
    name: "Ongoing engineering retainer",
    summary:
      "A monthly retainer for features, security hardening, and reliability upgrades.",
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
