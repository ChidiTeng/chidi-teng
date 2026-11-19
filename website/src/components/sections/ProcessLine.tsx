"use client";
import { useEffect, useRef } from "react";
import { loadScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Progress line scrubbed to scroll through the Process section.
 * GSAP + ScrollTrigger are imported only when the section approaches the
 * viewport, so they never touch the initial bundle. Transform-only (scaleY).
 * Under reduced motion the line is simply drawn in full.
 */
export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (prefersReducedMotion()) {
      el.style.transform = "scaleY(1)";
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const { gsap } = await loadScrollTrigger();
        if (cancelled) return;
        const tween = gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.3,
            },
          },
        );
        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(section);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 1,
        background: "var(--c-border)",
      }}
    >
      <div
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, var(--c-cyan), var(--c-violet))",
          transformOrigin: "50% 0",
          transform: "scaleY(0)",
        }}
      />
    </div>
  );
}
