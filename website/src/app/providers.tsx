"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";

/**
 * The site is dark-only, so there is no theme switcher or next-themes:
 * `class="dark"` is set on <html> in the layout. Framer Motion is not
 * provided globally; components that need it load it locally (see ContactForm).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
