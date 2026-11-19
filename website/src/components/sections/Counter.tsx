"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const DURATION_MS = 1400;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

/**
 * Number roll-up. The final value is server-rendered (correct for SEO, no-JS
 * and screen readers, which read a separate sr-only copy). The visual count
 * runs once when scrolled into view. A rAF loop is all this needs, so it
 * carries no animation library.
 */
export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || prefersReducedMotion()) return;
    const final = `${value}${suffix}`;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          el.textContent = `${Math.round(easeOutQuad(t) * value)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    el.textContent = `0${suffix}`;
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = final;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} aria-hidden="true">
      {value}
      {suffix}
    </span>
  );
}
