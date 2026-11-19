import { Box, type BoxProps } from "@chakra-ui/react";

/** Use sparingly: each backdrop blur costs GPU time. Solid fallback on small screens. */
export function GlassCard({ className, ...props }: BoxProps) {
  return (
    <Box
      className={["glass", className].filter(Boolean).join(" ")}
      borderWidth="1px"
      borderColor="border.subtle"
      rounded="2xl"
      p={{ base: "6", md: "8" }}
      {...props}
    />
  );
}
