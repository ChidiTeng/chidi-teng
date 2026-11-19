"use client";
import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const STRENGTH = 0.25;

/**
 * Pulls its child slightly toward the cursor. Transform-only, fine-pointer
 * only, inert under reduced motion. GSAP is fetched on first hover, so the
 * effect costs nothing for touch users or visitors who never hover.
 */
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    let toX: ((v: number) => void) | undefined;
    let toY: ((v: number) => void) | undefined;
    let cancelled = false;

    const init = () => {
      loadGsap().then((gsap) => {
        if (cancelled) return;
        toX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        toY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      });
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      toX?.((e.clientX - (r.left + r.width / 2)) * STRENGTH);
      toY?.((e.clientY - (r.top + r.height / 2)) * STRENGTH);
    };
    const onLeave = () => {
      toX?.(0);
      toY?.(0);
    };

    el.addEventListener("pointerenter", init, { once: true });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelled = true;
      el.removeEventListener("pointerenter", init);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, []);

  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
