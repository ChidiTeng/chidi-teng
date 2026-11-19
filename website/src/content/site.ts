import { publicEnv } from "@/lib/env";

export const site = {
  name: "Emmanuel Nwachukwu",
  shortName: "Emmanuel N.",
  role: "Senior Frontend Engineer",
  location: { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  defaultTitle: "Hire a React Developer in Nigeria | Emmanuel N.",
  description:
    "Senior React, Next.js and TypeScript freelancer with 5+ years in production. Sites, dashboards, integrations and audits.",
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
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Chakra UI",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "REST and GraphQL",
    "Vercel",
  ],
} as const;
