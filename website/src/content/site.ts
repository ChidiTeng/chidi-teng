import { publicEnv } from "@/lib/env";

export const site = {
  name: "Emmanuel Nwachukwu",
  shortName: "Emmanuel N.",
  role: "Software Engineer · Frontend, SRE & Application Security",
  location: { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  defaultTitle: "Emmanuel Nwachukwu | Frontend, SRE & AppSec Engineer",
  description:
    "Software Engineer with 5+ years building fast, secure, and resilient SaaS and B2B systems across React, Next.js, Node.js, SRE, and Application Security.",
  /** Set to false when fully booked; the hero badge reads from this. */
  available: true,
  socials: {
    github: "https://github.com/chiditeng",
    linkedin: "https://www.linkedin.com/in/nwachukwuemmanuel",
  },
  primaryCta: { label: "Book a 20-minute scoping call", short: "Book a call" },
  /** External calendar link if configured, otherwise the contact page. */
  get bookingHref() {
    return publicEnv.calUrl ?? "/contact";
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Application Security (OWASP)",
    "Site Reliability (SRE)",
    "AuthN & AuthZ",
    "CI/CD & DevSecOps",
    "Supabase",
    "TanStack Query",
    "OpenAI & Claude APIs",
    "Chakra UI & Tailwind",
  ],
} as const;
