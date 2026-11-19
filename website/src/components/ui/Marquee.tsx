"use client";
import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

/**
 * CSS-animated marquee (compositor-only, no JS per frame) with a pause control
 * to meet WCAG 2.2.2. Duplicate track is aria-hidden so screen readers read
 * the list once. Under reduced motion it becomes a static wrapped list.
 */
export function Marquee({
  items,
  label,
}: {
  items: readonly string[];
  label: string;
}) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          <Text
            as="span"
            fontFamily="mono"
            fontSize="sm"
            color="fg.muted"
            whiteSpace="nowrap"
          >
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );

  return (
    <Flex align="center" gap="4">
      <Box
        className="marquee"
        data-paused={paused}
        flex="1"
        minW="0"
        aria-label={label}
        role="region"
      >
        {row(false)}
        {row(true)}
      </Box>
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> scrolling list</span>
      </button>
    </Flex>
  );
}
