"use client";
import { Box, type BoxProps } from "@chakra-ui/react";

export type GlowTone = "cyan" | "violet" | "lime" | "amber";

export type SpotlightCardProps = BoxProps & {
  glow?: GlowTone;
  featured?: boolean;
};

/**
 * Card with a pointer-following glow and ambient bottom aura.
 * `featured` renders the signature mint-to-lime gradient card inspired by the reference UI.
 */
export function SpotlightCard({
  children,
  className,
  glow = "violet",
  featured = false,
  ...props
}: SpotlightCardProps) {
  const baseClass = featured
    ? "card-featured"
    : `spotlight glow--${glow}`;

  return (
    <Box
      className={[baseClass, className].filter(Boolean).join(" ")}
      rounded="3xl"
      overflow="hidden"
      p={{ base: "6", md: "8" }}
      onPointerMove={(e) => {
        if (featured || e.pointerType !== "mouse") return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
