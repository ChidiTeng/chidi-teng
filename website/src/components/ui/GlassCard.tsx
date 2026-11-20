import { Box, type BoxProps } from "@chakra-ui/react";
import type { GlowTone } from "./SpotlightCard";

export type GlassCardProps = BoxProps & {
  glow?: GlowTone;
};

/** Use sparingly: each backdrop blur costs GPU time. Solid fallback on small screens. */
export function GlassCard({
  className,
  glow = "violet",
  ...props
}: GlassCardProps) {
  return (
    <Box
      className={["glass", `glow--${glow}`, className]
        .filter(Boolean)
        .join(" ")}
      rounded="3xl"
      p={{ base: "6", md: "8" }}
      {...props}
    />
  );
}
