"use client";
import { Box, type BoxProps } from "@chakra-ui/react";

/**
 * Card with a pointer-following glow. The handler only writes two CSS
 * variables (no React state, no re-render). Touch input is ignored, and the
 * glow is hidden on devices without hover via globals.css.
 */
export function SpotlightCard({ children, className, ...props }: BoxProps) {
  return (
    <Box
      className={["spotlight", className].filter(Boolean).join(" ")}
      rounded="2xl"
      borderWidth="1px"
      borderColor="border.subtle"
      bg="bg.surface"
      overflow="hidden"
      p={{ base: "6", md: "8" }}
      transition="border-color .2s"
      _hover={{ borderColor: "accent.cyan/40" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
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
