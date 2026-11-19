/**
 * Raw design tokens. Single source of truth for colour values so that
 * non-Chakra consumers (OG image, CSS, metadata themeColor) stay in sync.
 * Contrast ratios are documented in implementation.md §2.1.
 */
export const palette = {
  ink: {
    950: "#05080F", // canvas
    900: "#0B1220", // surface
    800: "#111A2E", // raised
    700: "#1E2A44", // border
  },
  fg: {
    default: "#E6EDF7",
    muted: "#9AA7BF",
    subtle: "#6B7894", // decorative only, never body copy
  },
  accent: {
    cyan: "#22D3EE",
    violet: "#A78BFA",
  },
  status: {
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
  },
} as const;

export const signatureGradient = `linear-gradient(120deg, ${palette.accent.cyan} 0%, ${palette.accent.violet} 100%)`;
