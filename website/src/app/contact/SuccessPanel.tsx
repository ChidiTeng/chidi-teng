"use client";
import { useEffect, useRef } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { dur, ease } from "@/lib/motion";

/**
 * Framer Motion owns the contact success state (implementation.md §7).
 * This module is code-split and preloaded when the visitor first focuses the
 * form, so Motion never weighs on the initial page load.
 */
export default function SuccessPanel({ onReset }: { onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, ease }}
        >
          <Box ref={ref} tabIndex={-1} role="status" outline="none">
            <m.span
              aria-hidden="true"
              style={{
                display: "inline-block",
                fontSize: "1.875rem",
                color: "var(--c-cyan)",
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: 0.1,
              }}
            >
              ✓
            </m.span>
            <Heading as="h2" textStyle="h3" fontSize="1.75rem" mt="2">
              Message sent
            </Heading>
            <Text mt="3" color="fg.muted">
              Thanks for getting in touch. I reply to every enquiry within two
              working days, usually sooner.
            </Text>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              style={{ marginTop: 24 }}
              onClick={onReset}
            >
              Send another message
            </button>
          </Box>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
