# Personal Website: Technical Execution Plan

**Owner:** Emmanuel Nwachukwu | **Purpose:** a dark, ultra-modern freelance site that sells the 12 services, proves them, and ranks for the keywords in the Copy and SEO Playbook (v2).
**Stack:** Next.js (App Router), TypeScript, Chakra UI, GSAP, Framer Motion.

> **Version note.** I have not pinned version numbers because I can't verify what is newest on the day you scaffold. Install the latest stable of each and check the migration notes. Two things changed recently and affect the code below: **Chakra UI v3** (new `createSystem` theming API, snippets via CLI) and **Framer Motion's package rename to `motion`** (`import { motion } from "motion/react"`; the older `framer-motion` import has the same API). Confirm GSAP's current license terms on gsap.com before commercial use.

---

## 1. Goals and non-negotiables

| Goal | Target (to verify, not promise) |
|---|---|
| Fast | LCP 2.5s or less, INP 200ms or less, CLS 0.1 or less on mobile |
| Findable | Per-page metadata, sitemap, JSON-LD, one H1 per page |
| Accessible | WCAG 2.2 AA, full keyboard use, `prefers-reduced-motion` respected |
| Credible | Only claims from the Claims Rules table in the playbook |
| Editable | Content lives in typed data files, not hard-coded in components |

**Rule of thumb:** this site is also your best portfolio piece for the Core Web Vitals audit service. If it is slow, it undermines the pitch.

---

## 2. Design system

### 2.1 Colour palette (all contrast ratios computed against WCAG)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `ink.950` canvas | `#05080F` | Page background | n/a |
| `ink.900` surface | `#0B1220` | Sections, cards | n/a |
| `ink.800` raised | `#111A2E` | Hover cards, inputs | n/a |
| `ink.700` border | `#1E2A44` | Hairlines, dividers | decorative |
| `fg.default` | `#E6EDF7` | Body and headings | 17.0 on canvas, 15.9 on surface |
| `fg.muted` | `#9AA7BF` | Secondary text | 8.3 on canvas, 7.2 on raised |
| `fg.subtle` | `#6B7894` | Decorative only, never body copy | 4.5 on canvas (borderline) |
| `accent.cyan` | `#22D3EE` | Primary accent, links, focus ring | 11.1 on canvas |
| `accent.violet` | `#A78BFA` | Secondary accent, gradients | 7.4 on canvas |
| `success` | `#34D399` | Status | 9.7 on surface |
| `warning` | `#FBBF24` | Status | 11.2 on surface |
| `danger` | `#F87171` | Errors | 6.8 on surface |

- **Button text on cyan:** use `#05080F` (11.1:1). Never white on cyan.
- **Signature gradient:** `linear-gradient(120deg, #22D3EE 0%, #A78BFA 100%)`. Use on one headline word, the primary button border and a background glow only. Overuse makes it look generic.
- **Rule:** at most one accent per viewport, with the second as a supporting tint.

### 2.2 Typography

- **Headings and body:** Geist (`next/font/google`, variable). Fallback: Inter.
- **Code and labels:** Geist Mono.
- **Scale (fluid):** hero `clamp(2.6rem, 7vw, 6rem)`, H2 `clamp(1.8rem, 4vw, 3rem)`, body `1.0625rem`, line-height 1.6, heading line-height 1.05, letter-spacing `-0.03em` on large headings.
- **Max line length:** 68 characters for body copy.

### 2.3 Layout and pattern language

- **Grid:** 12-column container, max width 1200px, 24px gutters on mobile, 32px on desktop.
- **Bento grid** for services: mixed 1x1, 2x1, 2x2 tiles. The three lead services get the large tiles.
- **Glass cards:** `bg: rgba(17,26,46,0.6)`, `backdrop-filter: blur(12px)`, 1px border `ink.700`, radius 16 to 20px. Use sparingly; each blur layer costs GPU time.
- **Ambient background:** a fixed radial gradient glow (cyan top-left, violet bottom-right at 12 to 18% opacity) plus a faint noise texture (SVG, under 5KB). No video backgrounds.
- **Cursor spotlight** on cards: a radial gradient that follows the pointer (CSS variables set in a `pointermove` handler). Disable on touch devices.
- **Spacing rhythm:** 8px base. Section padding 96px desktop, 64px mobile.

---

## 3. Motion system

### 3.1 Who animates what (avoid conflicts)

| Tool | Owns | Examples |
|---|---|---|
| **Framer Motion** | Component-level, state-driven motion | Mount and unmount (`AnimatePresence`), hover and tap, layout transitions, menu, accordion (FAQ), page transitions, reveal on view |
| **GSAP** | Scroll-driven and timeline choreography | Hero intro timeline, pinned or scrubbed sections, ScrollTrigger progress bar, marquee, counter roll-ups, SVG line draw |
| **CSS** | Simple hover states, focus rings, gradients | Link underline, button glow |

**Never animate the same element with two libraries.** If an element is controlled by GSAP, don't give it `motion` props, and the reverse.

### 3.2 Shared motion tokens (`src/lib/motion.ts`)

```ts
export const ease = [0.22, 1, 0.36, 1] as const; // easeOutExpo-like
export const dur = { fast: 0.2, base: 0.5, slow: 0.9 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease } },
};

export const stagger = (s = 0.08) => ({
  show: { transition: { staggerChildren: s } },
});
```

### 3.3 Performance and accessibility rules for motion

1. Animate **transform and opacity only**. No animating width, height, top or box-shadow blur.
2. Wrap everything in a reduced-motion check (`useReducedMotion()` for Framer, `gsap.matchMedia()` for GSAP).
3. **Do not hide the hero H1 until JavaScript runs.** Server-render it visible so LCP isn't delayed. Animate decoration and secondary text, or use a very short transform-only entrance on the H1.
4. Load GSAP and ScrollTrigger only in client components that need them (`"use client"`), and `dynamic()` import below-the-fold animated sections.
5. Keep total animated elements per viewport under about 15.
6. `will-change: transform` only on elements mid-animation.

---

## 4. Project structure

```
website/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # fonts, providers, metadata base, JSON-LD
│  │  ├─ page.tsx                # homepage (server component)
│  │  ├─ providers.tsx           # Chakra + theme (client)
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ opengraph-image.tsx     # default OG image (next/og)
│  │  ├─ services/[slug]/page.tsx
│  │  ├─ work/[slug]/page.tsx
│  │  ├─ blog/[slug]/page.tsx    # MDX posts
│  │  ├─ contact/page.tsx
│  │  └─ api/contact/route.ts    # form handler
│  ├─ components/
│  │  ├─ layout/ (Header, Footer, ScrollProgress, PageTransition)
│  │  ├─ sections/ (Hero, ProofStrip, ServicesBento, Process, CaseStudies, Faq, CtaBand)
│  │  ├─ ui/ (Reveal, GlassCard, GradientText, MagneticButton, Marquee, SpotlightCard)
│  │  └─ seo/ (JsonLd)
│  ├─ content/
│  │  ├─ services.ts             # typed data, one source of truth
│  │  ├─ proof.ts                # claims that pass the Claims Rules
│  │  ├─ faq.ts
│  │  └─ posts/*.mdx
│  ├─ lib/ (motion.ts, seo.ts, env.ts)
│  └─ theme/ (index.ts, tokens.ts)
├─ public/ (og images, favicon, noise.svg)
├─ .env.example
└─ package.json
```

**Rule:** pages and section shells are **Server Components**. Only the animated leaf components are `"use client"`. This keeps JavaScript small and SEO content in the initial HTML.

---

## 5. Setup

```bash
npx create-next-app@latest website --typescript --eslint --app --src-dir --import-alias "@/*"
cd website
npm i @chakra-ui/react @emotion/react next-themes
npm i gsap @gsap/react
npm i motion            # or framer-motion
npm i zod               # validation for the contact form
npm i -D @next/bundle-analyzer prettier
npx @chakra-ui/cli snippet add   # generates Chakra v3 UI snippets
```

Add `optimizePackageImports: ["@chakra-ui/react"]` under `experimental` in `next.config.ts`. Enable the bundle analyzer behind an env flag.

---

## 6. Core code

### 6.1 Theme (`src/theme/index.ts`, Chakra v3)

```ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": { bg: "bg.canvas", color: "fg.default" },
    "*::selection": { bg: "accent.cyan/30" },
  },
  theme: {
    tokens: {
      colors: {
        ink: {
          950: { value: "#05080F" },
          900: { value: "#0B1220" },
          800: { value: "#111A2E" },
          700: { value: "#1E2A44" },
        },
        accent: {
          cyan: { value: "#22D3EE" },
          violet: { value: "#A78BFA" },
        },
      },
      fonts: {
        heading: { value: "var(--font-geist), system-ui, sans-serif" },
        body: { value: "var(--font-geist), system-ui, sans-serif" },
        mono: { value: "var(--font-geist-mono), ui-monospace, monospace" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": { value: "{colors.ink.950}" },
        "bg.surface": { value: "{colors.ink.900}" },
        "bg.raised": { value: "{colors.ink.800}" },
        "border.subtle": { value: "{colors.ink.700}" },
        "fg.default": { value: "#E6EDF7" },
        "fg.muted": { value: "#9AA7BF" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
```

### 6.2 Providers (`src/app/providers.tsx`)

```tsx
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
```

### 6.3 Root layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl, personSchema, serviceSchema } from "@/lib/seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Hire a React Developer in Nigeria | Emmanuel N.", template: "%s | Emmanuel Nwachukwu" },
  description:
    "Senior React, Next.js and TypeScript freelancer with 5+ years in production. Sites, dashboards, integrations and audits.",
  openGraph: { type: "website", locale: "en_NG", siteName: "Emmanuel Nwachukwu" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <JsonLd data={[personSchema, serviceSchema]} />
      </body>
    </html>
  );
}
```

### 6.4 Reveal-on-scroll with Framer Motion (`components/ui/Reveal.tsx`)

```tsx
"use client";
import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/motion";

const MotionBox = motion.create(Box);

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <MotionBox
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionBox>
  );
}
```

### 6.5 Hero timeline with GSAP (`components/sections/HeroMotion.tsx`)

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Decorative and secondary elements only. The H1 stays visible for LCP.
        gsap.from("[data-hero='fade']", { opacity: 0, y: 16, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.1 });
        gsap.from("[data-hero='glow']", { opacity: 0, scale: 0.9, duration: 1.4, ease: "power2.out" });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
```

### 6.6 Scroll progress with ScrollTrigger (`components/layout/ScrollProgress.tsx`)

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 },
    });
  });
  return (
    <div
      ref={bar}
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, transformOrigin: "0 50%",
        transform: "scaleX(0)", zIndex: 100,
        background: "linear-gradient(120deg,#22D3EE,#A78BFA)",
      }}
    />
  );
}
```

### 6.7 Spotlight card (CSS variables plus pointer)

```tsx
"use client";
import { Box } from "@chakra-ui/react";

export function SpotlightCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      position="relative" rounded="2xl" borderWidth="1px" borderColor="border.subtle" bg="bg.surface"
      overflow="hidden" p="6" transition="border-color .2s"
      _hover={{ borderColor: "accent.cyan/40" }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      css={{
        "&::before": {
          content: '""', position: "absolute", inset: 0, opacity: 0, transition: "opacity .3s",
          background: "radial-gradient(240px circle at var(--x) var(--y), rgba(34,211,238,.12), transparent 60%)",
        },
        "&:hover::before": { opacity: 1 },
        "@media (hover: none)": { "&::before": { display: "none" } },
      }}
    >
      <Box position="relative">{children}</Box>
    </Box>
  );
}
```

### 6.8 SEO helpers (`src/lib/seo.ts`, `sitemap.ts`, `robots.ts`)

```ts
// lib/seo.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emmanuel Nwachukwu",
  jobTitle: "Senior Frontend Engineer",
  url: siteUrl,
  sameAs: ["https://github.com/chiditeng", "https://www.linkedin.com/in/nwachukwuemmanuel"],
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Emmanuel Nwachukwu, Frontend Development",
  url: siteUrl,
  areaServed: ["Nigeria", "Remote"],
  serviceType: ["Next.js development", "Website redesign", "Core Web Vitals audit", "Dashboard development", "API integration"],
};
```

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/contact`, lastModified: now, priority: 0.6 },
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
```

### 6.9 Service content as typed data (`content/services.ts`)

```ts
export type Service = {
  slug: string;
  name: string;
  h1: string;
  sub: string;
  title: string;          // max 60 characters
  description: string;    // max 155 characters
  keyword: string;
  benefits: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  proof: "strong" | "partial" | "building";
};
```

Populate from Sections 4 and 5 of the playbook. Add a unit test or script that fails the build if `title` exceeds 60 or `description` exceeds 155 characters.

### 6.10 Service page with per-page metadata

```tsx
// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.description, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (/* H1, sub, benefits, process, FAQ, CTA */ null);
}
```

> `params` is a Promise in recent Next.js versions. If your installed version still passes a plain object, drop the `await`.

### 6.11 Contact route (`app/api/contact/route.ts`)

```ts
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  service: z.string().max(80).optional(),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  // Send with your email provider (Resend, Postmark or similar). Keys stay server-side.
  // Add rate limiting (for example Upstash Ratelimit) before going live.
  return NextResponse.json({ ok: true });
}
```

---

## 7. Page-by-page build spec

| Page | Sections | Motion | Notes |
|---|---|---|---|
| **Home** | Hero, proof strip, services bento, process, 2 case studies, FAQ, CTA band | GSAP hero timeline, counters on proof strip, Framer reveals, FAQ accordion | H1 uses headline option C or A. Primary CTA: "Book a 20-minute scoping call" |
| **/services/[slug]** | H1, sub, 3 benefits, process, proof, FAQ, CTA | Reveal on view | One H1, copy from playbook Section 5 |
| **/work/[slug]** | Problem, approach, result, stack | Pinned timeline (GSAP, optional) | Only claims on the proof list. Check NDAs |
| **/blog/[slug]** | MDX article, table of contents | None beyond reveal | Six posts in the content plan |
| **/contact** | Form, calendar link, direct email | Success state with Framer | Honeypot plus validation plus rate limit |

**Header:** sticky, blur on scroll, compact on scroll-down. **Footer:** services links (internal linking helps SEO), social links, copyright.

---

## 8. Accessibility checklist

- [ ] Visible focus ring on every interactive element (cyan, 2px, offset 2px)
- [ ] Skip-to-content link
- [ ] Landmarks (`header`, `nav`, `main`, `footer`)
- [ ] One H1 per page, heading levels in order
- [ ] All motion disabled or reduced under `prefers-reduced-motion`
- [ ] Gradient text always has a solid-colour fallback and passes contrast
- [ ] Form fields have labels, errors are announced (`aria-live`)
- [ ] Marquee and auto-moving content can be paused
- [ ] Keyboard-operable accordion and menu
- [ ] Test with VoiceOver or NVDA on the home page and contact form

---

## 9. Performance budget and checks

| Metric | Budget |
|---|---|
| LCP (mobile) | 2.5s or less |
| INP | 200ms or less |
| CLS | 0.1 or less |
| JavaScript on home route | Aim for under about 200KB gzipped (measure with the bundle analyzer) |
| Fonts | 2 families, `display: swap`, subset to Latin |
| Images | `next/image`, AVIF or WebP, explicit dimensions, hero image `priority` |

Tactics:
1. Keep sections as Server Components. Push `"use client"` to leaves.
2. `dynamic(() => import(...))` for below-the-fold animated sections.
3. Register GSAP plugins only where used.
4. Use `content-visibility: auto` on long, below-the-fold sections.
5. Check **real-device** performance on a mid-range Android phone, not only desktop Lighthouse.

---

## 10. SEO implementation checklist

- [ ] Metadata per page (title max 60, description max 155) from `content/services.ts`
- [ ] Canonical URLs and Open Graph per page; default OG image via `opengraph-image.tsx`
- [ ] `sitemap.ts` and `robots.ts` live; sitemap submitted in Google Search Console
- [ ] JSON-LD: Person and ProfessionalService (validate with Google's Rich Results Test)
- [ ] FAQ content on service pages; treat FAQ structured data as optional
- [ ] Internal links: home to services, services to case studies, posts to services
- [ ] Descriptive alt text on every image
- [ ] 301 redirects set up if you change any URL later
- [ ] Verify the domain in Search Console and Bing Webmaster Tools; review queries monthly

---

## 11. Environment and deployment

`.env.example`
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

- **Hosting:** Vercel is the simplest fit for Next.js. Any Node host works.
- **Domain:** buy a clean domain (name-based), point DNS, enable HTTPS.
- **Analytics:** privacy-friendly option (Plausible, Vercel Analytics or similar). Add Search Console for search data.
- **CI (GitHub Actions):** lint, type-check, build, and Lighthouse CI against the preview URL; fail the pull request if budgets are missed.
- **Secrets:** never commit `.env`. Server-side keys only in route handlers.

---

## 12. Build plan

| Phase | Work | Done when |
|---|---|---|
| **0. Foundations (0.5 day)** | Scaffold, install, theme, fonts, providers, lint and prettier | Dark blank page renders with tokens |
| **1. Content (0.5 day)** | Fill `services.ts`, `proof.ts`, `faq.ts` from the playbook | Character limits validated |
| **2. UI kit (1 day)** | Reveal, GlassCard, SpotlightCard, GradientText, buttons | Storybook not required; a `/kit` dev page is enough |
| **3. Home page (1.5 days)** | All sections, GSAP hero, proof counters | Mobile and desktop reviewed |
| **4. Service pages (1 day)** | Template plus the five lead pages | Metadata per page |
| **5. Contact and email (0.5 day)** | Form, route handler, honeypot, rate limit | Test email received |
| **6. SEO and a11y pass (1 day)** | Checklists in Sections 8 and 10 | Search Console verified |
| **7. Performance pass (0.5 day)** | Bundle analysis, image tuning, Lighthouse CI | Budgets met on a real phone |
| **8. Launch (0.5 day)** | Domain, DNS, sitemap submit, analytics | Live and indexed |

Estimates are rough, for one person working part-time alongside a job. Real timelines depend on your availability and the number of case studies ready.

---

## 13. Risks and decisions

| Risk | Mitigation |
|---|---|
| Two animation libraries bloat the bundle and fight each other | Strict ownership table (Section 3.1), lazy-load GSAP, measure |
| Animation hurts LCP and INP | Keep H1 visible, transform and opacity only, limit animated elements |
| Glass blur is slow on low-end Android | Use blur on few surfaces; provide a solid fallback below a width or on `prefers-reduced-transparency` |
| Over-claiming in copy | Only the "Safe to say now" list from the playbook |
| Chakra v3 and Next version changes | Pin versions after scaffold; read release notes before upgrading |
| Case studies blocked by NDAs | Anonymise, get written permission, or lead with public demos |
| Contact form abuse | Honeypot, validation, rate limit, email provider limits |
| Smooth-scroll libraries (such as Lenis) hurt accessibility | Skip at first. If added, keep native keyboard and reduced-motion behaviour |

---

## 14. Definition of done

1. Home plus five service pages, contact page and sitemap are live on your domain.
2. Every page has unique title and description within limits, and one H1.
3. Mobile Lighthouse (and a real phone test) meets the budgets in Section 9.
4. Reduced-motion mode disables the heavy animation and the site is fully usable.
5. Every claim is on the "Safe to say now" list or has public proof linked.
6. Search Console is verified and the sitemap is submitted.
7. The contact form delivers an email and rejects spam.