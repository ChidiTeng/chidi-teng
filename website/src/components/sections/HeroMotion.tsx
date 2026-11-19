"use client";
import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { gsapEase } from "@/lib/motion";

/**
 * GSAP owns the hero intro. Only elements marked data-hero="fade" or "glow"
 * animate; the H1 is server-rendered visible so LCP is never delayed.
 * Initial hidden state comes from CSS (globals.css) to avoid a flash, with a
 * CSS failsafe that reveals everything if this never runs.
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then((gsap) => {
      if (cancelled) return;
      el.setAttribute("data-hero-ready", "");
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: gsapEase } })
          .fromTo(
            "[data-hero='glow']",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.4 },
            0,
          )
          .fromTo(
            "[data-hero='fade']",
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              clearProps: "transform",
            },
            0.1,
          );
      }, el);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
      el.removeAttribute("data-hero-ready");
    };
  }, []);

  return (
    <div ref={root} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
