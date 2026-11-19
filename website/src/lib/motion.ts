/** Shared motion tokens. Framer Motion and GSAP read from the same scale. */
export const ease = [0.22, 1, 0.36, 1] as const; // easeOutExpo-like
export const gsapEase = "expo.out";
export const dur = { fast: 0.2, base: 0.5, slow: 0.9 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease } },
} as const;

export const stagger = (s = 0.08) => ({
  show: { transition: { staggerChildren: s } },
});
