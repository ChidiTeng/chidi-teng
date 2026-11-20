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
  title: string; // <= 60 chars, used as <title> on /work/[slug]
  client: string;
  role?: string;
  domain?: string;
  headlineBadge?: string;
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
    slug: "notchhr-sync-and-promotions",
    status: "published",
    title: "50K+ Daily-Transaction Attendance Sync & Promotion Engine",
    client: "NotchHR",
    role: "Senior Software Engineer",
    domain: "Enterprise HR & Biometric Sync",
    // headlineBadge: "↑ 50K+ daily txns · 4h → 10m setup",
    summary:
      "Architected a fault-tolerant BioTime attendance sync engine handling 50,000+ daily transactions across 100+ devices, alongside an automated bulk-promotion and committee voting platform.",
    description:
      "Cut attendance integration setup from 4 hours to 10 minutes, auto-resolved 80%+ of sync failures across 50K+ daily events, and sped up HR by 80%.",
    problem:
      "Enterprise HR teams using BioTime attendance hardware faced a 4-hour manual onboarding flow per tenant, recurring attendance-discrepancy tickets under 50,000+ daily device punches, and slow manual eligibility checks for 100+ bulk promotions and 50+ quarterly senior committee reviews.",
    approach: [
      "Designed a dual-mode BioTime attendance integration supporting both centrally-managed and client-managed authentication, cutting tenant integration setup time from 4 hours to 10 minutes (-96%).",
      "Built a background sync engine handling 50,000+ daily transactions across 100+ biometric terminals with token caching, request rate-limiting, and exponential-backoff retry logic that auto-resolved 80%+ of transient sync failures.",
      "Eliminated attendance-discrepancy bugs in the sync pipeline, achieving full QA sign-off across all non-redundant discrepancy tickets.",
      "Engineered an automated promotion workflow system processing 100+ bulk promotions simultaneously (reducing HR processing time by 80%) plus a role-based committee voting platform for 50+ quarterly senior-level promotions.",
    ],
    results: [
      {
        value: "50K+",
        label: "daily attendance transactions synced across 100+ devices",
        source: "NotchHR BioTime sync engine telemetry (Sept 2024 – Nov 2025)",
      },
      {
        value: "4h → 10m",
        label: "integration setup time via dual-mode authentication (-96%)",
        source: "NotchHR client onboarding benchmark",
      },
      {
        value: "80%+",
        label: "transient sync failures auto-resolved & HR promo time saved",
        source: "NotchHR background retry engine & bulk promotion workflow metrics",
      },
    ],
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "REST APIs"],
    services: [
      "dashboard-development",
      "api-integration",
      "react-development",
    ],
    year: 2025,
  },
  {
    slug: "p23-africa-ai-ops-and-pwa",
    status: "published",
    title: "Cross-Origin Field-Agent PWA & Multi-LLM AI Assistant",
    client: "P23 Africa",
    role: "Senior Frontend Engineer",
    domain: "Field Operations PWA & Applied AI",
    // headlineBadge: "OpenAI + Claude · Cross-Origin PWA",
    summary:
      "Engineered a cross-origin PWA install flow that persists install intent across auth redirects for field agents, and integrated ELY—an OpenAI + Claude operations assistant with live CRM retrieval and tenant credit caps.",
    description:
      "Cross-origin PWA install persistence across auth redirects plus an OpenAI and Claude AI assistant with live CRM retrieval and tenant credit caps.",
    problem:
      "Field agents operating on mobile networks lost browser PWA install prompts whenever authentication redirected across origins, while operations teams needed an in-platform AI assistant capable of querying live CRM records without exposing tenant accounts to unbounded LLM spend.",
    approach: [
      "Engineered a cross-origin PWA install flow that captures and persists install intent across authentication redirects via sessionStorage, paired with platform-aware fallback UI for native Android install prompts and iOS manual-install guidance.",
      "Evaluated native-wrapping (Capacitor) versus a native rebuild to resolve mobile browser background GPS limitations for field-agent tracking.",
      "Contributed to ELY, an in-platform AI operations assistant, integrating a dual-provider OpenAI + Claude stack for conversational and structured reporting workflows.",
      "Built CRM query and retrieval tooling enabling ELY to surface live lead, customer, and visit data on request, enforced by organization-level AI usage credit limits to control tenant cost exposure.",
    ],
    results: [
      {
        value: "2 LLMs",
        label: "OpenAI + Claude provider stack powering ELY conversational ops",
        source: "P23 Africa ELY AI operations assistant architecture (2026)",
      },
      {
        value: "Cross-Origin",
        label: "PWA install intent preserved across multi-hop auth redirects",
        source: "P23 Africa field-agent web application deployment",
      },
      {
        value: "Credit Caps",
        label: "org-level AI usage limits protecting multi-tenant unit economics",
        source: "P23 Africa tenant cost-control implementation",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "OpenAI & Claude", "PWA"],
    services: [
      "nextjs-development",
      "dashboard-development",
      "api-integration",
    ],
    year: 2026,
  },
  {
    slug: "myxellia-storefront-builder",
    status: "published",
    title: "Multi-Tenant Web Store Builder with 60+ Theme Templates",
    client: "Myxellia",
    role: "Senior Frontend Engineer",
    domain: "E-Commerce Website Builder & Design Systems",
    // headlineBadge: "↑ 60+ themes shipped · Squad lead",
    summary:
      "Developed a customizable web-store builder enabling businesses to spin up customer-facing storefronts, shipping 60+ production theme templates and leading a cross-functional team through a legacy product redesign.",
    description:
      "Built a Next.js storefront builder with 60+ customizable theme templates and led a cross-functional team to refactor a legacy product platform.",
    problem:
      "Merchants and the internal sales team needed a large library of customizable, industry-specific storefronts that could be configured without engineering bottlenecks, while a high-debt legacy codebase slowed down cross-team releases.",
    approach: [
      "Architected a modular web-store builder on Next.js, React, TypeScript, Chakra UI, and TanStack Query with token-driven layout primitives and live state synchronization.",
      "Built and shipped 60+ unique, responsive theme templates for the sales team, enabling rapid merchant demos and self-serve storefront launches.",
      "Led a cross-functional engineering squad across frontend, backend, and QA to refactor and redesign the legacy product around current business objectives, systematically reducing technical debt.",
    ],
    results: [
      {
        value: "60+",
        label: "unique customizable storefront theme templates shipped",
        source: "Myxellia web-store builder catalogue (Sept 2023 – Sept 2024)",
      },
      {
        value: "3 Tracks",
        label: "cross-functional squad (FE, BE, QA) led through legacy redesign",
        source: "Myxellia product refactor delivery records",
      },
      {
        value: "Tokenized",
        label: "Chakra UI + TanStack Query architecture for instant theme swaps",
        source: "Myxellia frontend system architecture",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Chakra UI", "TanStack Query"],
    services: ["nextjs-development", "website-redesign", "design-systems"],
    year: 2024,
  },
  {
    slug: "matador-trust-proptech-engine",
    status: "published",
    title: "Real-Estate Payment Plan & Fractional Ownership Platform",
    client: "Matador Trust",
    role: "Lead Frontend Engineer",
    domain: "PropTech & Real-Estate FinTech",
    // headlineBadge: "↓ 73% QA defects · Fractional shares",
    summary:
      "Engineered a multi-mode real-estate installment engine (manual, custom, and smart plans) and a fractional property-share module, while cutting quarterly post-release defects by 73% through structured PR reviews.",
    description:
      "Built a real-estate installment engine and fractional ownership module in React and Next.js, reducing quarterly post-release and QA defects by 73%.",
    problem:
      "Real-estate developers needed digital workflows to offer flexible installment plans and fractional equity shares to property buyers, while inconsistent frontend review practices were allowing preventable regressions into QA and production.",
    approach: [
      "Engineered a payment plan system supporting manual, custom, and smart installment schedules so property developers could tailor financing structures per buyer segment.",
      "Built a fractional ownership module allowing properties to be partitioned into investable shares, expanding capital access and automated profit-sharing for stakeholders.",
      "Instituted rigorous code reviews and pull-request evaluation checklists across the frontend team, reducing post-release and QA defects by 73% per quarter.",
    ],
    results: [
      {
        value: "-73%",
        label: "reduction in quarterly post-release and QA defects",
        source: "Matador Trust quarterly QA & release tracking (Dec 2022 – Sept 2023)",
      },
      {
        value: "3 Modes",
        label: "installment engines shipped (manual, custom & smart payment plans)",
        source: "Matador Trust real-estate developer platform",
      },
      {
        value: "Fractional",
        label: "property share-division module enabling multi-investor ownership",
        source: "Matador Trust stakeholder investment module",
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Chakra UI", "Redux"],
    services: [
      "dashboard-development",
      "nextjs-development",
      "react-development",
    ],
    year: 2023,
  },
  {
    slug: "langovest-platform-rebuild",
    status: "published",
    title: "Greenfield Next.js & Supabase Rebuild for Langovest",
    client: "Langovest Ltd",
    role: "Independent Frontend Contractor",
    domain: "FinTech Web Platform & Kiosk R&D",
    // headlineBadge: "Greenfield rebuild · langovest.com",
    summary:
      "Rebuilt and deployed langovest.com from scratch on a Next.js, TypeScript, and Supabase stack to replace a legacy site, aligned the embedded AI chatbot knowledge base, and evaluated Flutterwave kiosk hardware.",
    description:
      "Rebuilt langovest.com from scratch on Next.js, TypeScript, and Supabase, aligned its embedded AI assistant knowledge base, and scoped payment kiosks.",
    problem:
      "Langovest's legacy website struggled to support current product positioning and modern performance expectations, its embedded AI chatbot served outdated answers, and leadership needed technical vendor validation for self-service payment kiosks.",
    approach: [
      "Rebuilt and deployed the production website (langovest.com) from scratch on Next.js, React, TypeScript, and Supabase under direct stakeholder direction, retiring the legacy platform.",
      "Updated and validated the knowledge base of the embedded AI assistant so customer-facing responses stayed accurate and aligned with organizational messaging.",
      "Participated in technical vendor evaluation across Flutterwave payment APIs and kiosk hardware manufacturers for an upcoming self-service payment terminal integration.",
    ],
    results: [
      {
        value: "100%",
        label: "greenfield Next.js + Supabase production rebuild shipped",
        source: "langovest.com production deployment (Jan 2026 – Aug 2026)",
      },
      {
        value: "AI Aligned",
        label: "embedded chatbot knowledge base validated against live messaging",
        source: "Langovest customer assistant rollout",
      },
      {
        value: "Kiosk R&D",
        label: "Flutterwave & hardware vendor evaluation for self-service terminals",
        source: "Langovest technical vendor evaluation report",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Flutterwave"],
    services: ["website-redesign", "nextjs-development", "api-integration"],
    year: 2026,
    url: "https://langovest.com",
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
