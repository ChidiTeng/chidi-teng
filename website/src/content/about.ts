/**
 * About section content, sourced from Emmanuel's LinkedIn profile and CVs.
 * Centralised here so copy stays editable and separated from layout components.
 */

export type ArchitecturePillar = {
  id: string;
  number: string;
  title: string;
  badge: string;
  tone: "violet" | "cyan" | "lime";
  summary: string;
  focus: string[];
  barWidth: string;
};

export const aboutContent = {
  eyebrow: "About · Engineering Philosophy",
  heading:
    "Security and reliability users trust.",
  lead: "I'm a Software Engineer with 5+ years of experience building SaaS and B2B products across frontend engineering, product development, APIs, and application architecture—deliberately expanding into Site Reliability Engineering and Application Security.",
  headlineTag:
    "Software Engineer | Site Reliability Engineering | Application Security | Building Secure and Resilient Systems",
  paragraphs: [
    "My engineering background has given me something I consider particularly valuable: a deep understanding of how real-world products are designed, developed, shipped, and maintained—including the architectural decisions, engineering trade-offs, and vulnerabilities that can emerge along the way.",
    "I am deliberately expanding my expertise into Site Reliability Engineering (SRE) and Application Security (AppSec), with a focus on secure software development, web and API security, threat modeling, authentication and authorization, vulnerability management, security testing, and DevSecOps.",
    "My work centres on financial services and high-trust B2B environments, where security, reliability, and resilience must be fundamental architectural considerations rather than afterthoughts. Building secure systems requires more than identifying vulnerabilities—it requires understanding how applications are built, how infrastructure supports them, and how security integrates into the entire engineering lifecycle.",
  ],
  mission:
    "Long-term goal: help engineering teams build and operate software that is fast, secure, resilient, and trustworthy.",
  profileMeta: {
    fullName: "Emmanuel (G.) Nwachukwu",
    currentOrg: "P23 Africa",
    educationCommunity: "freeCodeCamp",
    communityReach: "11,900+ LinkedIn followers · 500+ connections",
    leadership: "4 years leading a 9-engineer cross-functional team",
  },
  topSkills: [
    "Application Security",
    "Front-End Development",
    "Web Application Security",
    "OWASP",
    "CI/CD & DevSecOps",
    "Authentication & Authorization",
    "Threat Modeling",
    "Site Reliability (SRE)",
    "React & Next.js Architecture",
    "Fault-Tolerant API Integration",
  ],
  pillars: [
    {
      id: "frontend-architecture",
      number: "01",
      title: "SaaS & B2B Product Architecture",
      badge: "React · Next.js · TypeScript",
      tone: "cyan",
      summary:
        "5+ years designing and shipping multi-tenant web applications, configurable storefront builders (60+ themes), and cross-origin field-agent PWAs with strict Core Web Vitals budgets.",
      focus: [
        "App Router & SSR",
        "Design Systems",
        "Cross-Origin PWAs",
        "State & Query Caching",
      ],
      barWidth: "96%",
    },
    {
      id: "application-security",
      number: "02",
      title: "Application Security (AppSec)",
      badge: "OWASP · AuthN/AuthZ · DevSecOps",
      tone: "violet",
      summary:
        "Integrating security into the engineering lifecycle for financial services and high-trust platforms—from dual-mode authentication and role-based approval gates to threat modeling and PR review controls that cut post-release defects by 73%.",
      focus: [
        "Web & API Security",
        "RBAC & Dual-Mode Auth",
        "Threat Modeling",
        "Vulnerability Management",
      ],
      barWidth: "90%",
    },
    {
      id: "site-reliability",
      number: "03",
      title: "Site Reliability & Resilience (SRE)",
      badge: "50K+ Daily Txns · Retries · Cost Caps",
      tone: "lime",
      summary:
        "Engineering background sync engines and AI provider integrations that stay deterministic under load—using token caching, request rate-limiting, exponential-backoff retries (auto-resolving 80%+ of transient failures), and tenant AI credit limits.",
      focus: [
        "Exponential Backoff",
        "Rate Limiting & Caching",
        "LLM Cost Guardrails",
        "CI/CD Release Gates",
      ],
      barWidth: "92%",
    },
  ] satisfies ArchitecturePillar[],
} as const;
