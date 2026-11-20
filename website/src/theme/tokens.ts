/**
 * Raw design tokens. Single source of truth for colour values so that
 * non-Chakra consumers (OG image, CSS, metadata themeColor) stay in sync.
 * Contrast ratios are documented in implementation.md §2.1.
 */
export const palette = {
  ink: {
    950: "#07070D", // cosmic obsidian canvas
    900: "#0F101A", // dark glowing card surface
    800: "#171826", // raised inner sub-card / pill surface
    700: "#25263B", // subtle specular hairline border
  },
  fg: {
    default: "#F1F5F9",
    muted: "#94A3B8",
    subtle: "#64748B", // decorative only, never body copy
  },
  accent: {
    cyan: "#2DD4BF", // glowing mint-cyan
    violet: "#A78BFA", // electric lavender-violet
    lime: "#BEF264", // signature featured card lime-mint highlight
    amber: "#FBBF24", // warm metric glow
  },
  status: {
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
  },
} as const;

export const signatureGradient = `linear-gradient(120deg, ${palette.accent.cyan} 0%, ${palette.accent.violet} 55%, ${palette.accent.lime} 100%)`;

export const featuredCardGradient =
  "linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 38%, #D9F99D 74%, #BEF264 100%)";
