/**
 * GSAP is loaded on demand, never in the initial bundle: every GSAP effect on
 * this site is decorative and can start a few milliseconds after hydration.
 * The promise is memoised so the library is fetched once per page load.
 */
let gsapPromise: Promise<typeof import("gsap").gsap> | undefined;

export function loadGsap() {
  gsapPromise ??= import("gsap").then((m) => m.gsap);
  return gsapPromise;
}

export async function loadScrollTrigger() {
  const [gsap, { ScrollTrigger }] = await Promise.all([
    loadGsap(),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
