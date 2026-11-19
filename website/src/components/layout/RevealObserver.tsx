"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Single IntersectionObserver for every <Reveal>. Rescans after each
 * navigation because Cache Components keeps layouts mounted.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (targets.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
