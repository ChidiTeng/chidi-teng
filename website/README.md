# Emmanuel Nwachukwu: personal website

Dark, fast, SEO-first freelance site. Built from [`../implementation.md`](../implementation.md).

**Stack:** Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript, Chakra UI v3, GSAP, Motion (Framer Motion), Zod, MDX.

## Quick start

```bash
cp .env.example .env.local   # fill in what you have; everything is optional in dev
npm install
npm run dev                  # http://localhost:3000, UI kit at /kit
```

| Script              | What it does                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`     | Lint, type-check and unit/content tests                                                                                                       |
| `npm run build`     | Runs tests first (`prebuild`), then the production build                                                                                      |
| `npm run audit:seo` | Against a running server: one H1, title ≤ 60, description ≤ 155, canonical, unique metadata, real 404s. Set `BASE_URL` to audit a preview URL |
| `npm run analyze`   | Turbopack bundle analyzer (replaces `@next/bundle-analyzer`, which is webpack-only)                                                           |
| `npm run format`    | Prettier                                                                                                                                      |

CI (`../.github/workflows/ci.yml`) runs all of the above plus Lighthouse CI with mobile budgets (`lighthouserc.json`).

## Editing content

All copy lives in typed files under `src/content/`. Components never hard-code copy.

| File                                  | Drives                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `site.ts`                             | Name, nav, CTA labels, socials, availability badge, tech marquee                  |
| `services.ts`                         | Bento grid, the 5 service pages, footer links, sitemap, JSON-LD, contact dropdown |
| `proof.ts`                            | Proof-strip numbers. **Only `verified: true` items render.**                      |
| `work.ts`                             | Case studies. `draft` shows in dev only and returns 404 in production             |
| `faq.ts`, `process.ts`                | Home FAQ and process steps                                                        |
| `posts/index.ts` + `posts/<slug>.mdx` | Blog. Metadata in TS, body in MDX starting at `##`                                |

Tests fail the build if a title is over 60 characters, a description is over 155, a slug is duplicated, a post has an H1 or a published case study has a result without a source.

## Architecture decisions

These depart from the plan where measurement or the Next 16 APIs called for it.

1. **Server Components by default.** Every page and section is a Server Component. Client code is limited to Header, the Marquee pause button, SpotlightCard, HeroMotion, Counter, ProcessLine, MagneticButton, RevealObserver and the contact form.
2. **JS budget enforced by measurement.** The first build shipped 281 KB gzipped of modern JS on home. It now ships about 183 KB initial (budget ≈ 200), plus about 17 KB of GSAP loaded after hydration. The changes:
   - The Chakra system starts from `defaultBaseConfig` and registers only the 7 recipes in use (`src/theme/index.ts`), down from about 70. **If you use a new Chakra component, add its recipe there**, or it renders unstyled.
   - Motion (Framer) is scoped to the contact success state, code-split and preloaded on first form focus. Reveal-on-view is CSS plus one shared IntersectionObserver.
   - GSAP is always dynamically imported (`src/lib/gsap.ts`): the hero loads it after hydration, MagneticButton on first hover, ScrollTrigger when the Process section nears the viewport. The Counter is a plain rAF loop.
   - Zod never reaches the browser: `contact-shared.ts` holds the Zod-free constants the form needs.
3. **CSS where CSS is enough.** The scroll progress bar uses `animation-timeline: scroll()` (no JS, hidden where unsupported), the marquee is CSS with a WCAG 2.2.2 pause button, and the FAQ uses native `<details>` (keyboard accessible, works without JS, answers stay in the HTML). Buttons are CSS classes, not runtime-styled components.
4. **LCP-safe hero.** The H1 is server-rendered and never hidden. Secondary hero elements start hidden only under `(scripting: enabled) and (prefers-reduced-motion: no-preference)`, with a CSS failsafe that reveals them after 2.5 s if GSAP never runs.
5. **Real 404s under Cache Components.** The prerendered shell streams with a 200 before a page's `notFound()` can run. `src/proxy.ts` checks dynamic slugs against static content first, so unknown URLs return a true 404.
6. **No next-themes.** The site is dark-only, so `class="dark"` is set on `<html>` directly.
7. **SEO details.** Titles are absolute, so the 60-character budget is the whole `<title>`. Sitemap `lastmod` comes from content dates, not build time. `robots.txt` disallows everything on non-production Vercel deployments. JSON-LD covers Person, ProfessionalService, Service, BlogPosting and BreadcrumbList, with `<` escaped.
8. **Contact endpoint.** JSON-only (blocks cross-site form posts), 10 KB body cap, Zod validation with field errors, honeypot plus a minimum fill time (bots get a silent 200), and rate limiting at 5 per 10 minutes per IP. The limiter is in-memory, so **swap it for Upstash or similar before relying on it on serverless**. Email is sent directly to `NEXT_PUBLIC_CONTACT_EMAIL` via the Resend REST API, so no SDK dependency.
9. **Security headers.** nosniff, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy and HSTS. There is no CSP yet: a nonce-based CSP forces dynamic rendering and would give up the static shell, so add a hash-based one if you need it.

## Before launch

- [ ] Replace draft copy in `src/content/` with the Copy and SEO Playbook (v2) wording, and confirm commercial promises: two weeks of included fixes, two-day proposal turnaround, two-working-day reply time.
- [ ] Fill in `proof.ts` with real, sourced numbers and flip `verified`.
- [ ] Publish at least two case studies in `work.ts` (check NDAs).
- [ ] Set the env vars in Vercel (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CAL_URL`, `RESEND_API_KEY`) and send a test enquiry.
- [ ] Replace the in-memory rate limiter with a shared store.
- [ ] Replace `src/app/favicon.ico` with your own mark.
- [ ] Run Lighthouse on a real mid-range Android phone, then verify Search Console and submit `/sitemap.xml`.
- [ ] Confirm GSAP license terms on gsap.com for commercial use.
