import {
  createSystem,
  defaultBaseConfig,
  defineConfig,
} from "@chakra-ui/react";
import {
  breakpoints,
  globalCss as baseGlobalCss,
  keyframes,
  semanticTokens as baseSemanticTokens,
  tokens as baseTokens,
  badgeRecipe,
  headingRecipe,
  inputRecipe,
  textareaRecipe,
  fieldSlotRecipe,
  listSlotRecipe,
  nativeSelectSlotRecipe,
} from "@chakra-ui/react/theme";
import { palette } from "./tokens";

/**
 * Lean Chakra system. `defaultConfig` ships recipes for ~70 components; this
 * site uses seven, so we start from `defaultBaseConfig` and register only the
 * recipes in use. Using a Chakra component whose recipe is not listed here
 * renders unstyled: add its recipe below.
 */
const leanDefaults = defineConfig({
  preflight: true,
  cssVarsPrefix: "chakra",
  cssVarsRoot: ":where(html, .chakra-theme)",
  globalCss: baseGlobalCss,
  theme: {
    breakpoints,
    keyframes,
    tokens: baseTokens,
    semanticTokens: baseSemanticTokens,
    recipes: {
      badge: badgeRecipe,
      heading: headingRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
    },
    slotRecipes: {
      field: fieldSlotRecipe,
      list: listSlotRecipe,
      nativeSelect: nativeSelectSlotRecipe,
    },
  },
});

const config = defineConfig({
  // Hand-written global element styles live in app/globals.css (static CSS).
  globalCss: {
    "html, body": { bg: "bg.canvas", color: "fg" },
    "*::selection": { bg: "accent.cyan/30", color: "fg" },
  },
  theme: {
    tokens: {
      colors: {
        ink: {
          950: { value: palette.ink[950] },
          900: { value: palette.ink[900] },
          800: { value: palette.ink[800] },
          700: { value: palette.ink[700] },
        },
        accent: {
          cyan: { value: palette.accent.cyan },
          violet: { value: palette.accent.violet },
          lime: { value: palette.accent.lime },
          amber: { value: palette.accent.amber },
        },
      },
      fonts: {
        heading: { value: "var(--font-geist), Inter, system-ui, sans-serif" },
        body: { value: "var(--font-geist), Inter, system-ui, sans-serif" },
        mono: {
          value:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
        },
      },
      sizes: {
        container: { value: "1200px" },
        prose: { value: "68ch" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          canvas: { value: "{colors.ink.950}" },
          surface: { value: "{colors.ink.900}" },
          raised: { value: "{colors.ink.800}" },
        },
        border: {
          subtle: { value: "{colors.ink.700}" },
        },
        fg: {
          DEFAULT: { value: palette.fg.default },
          muted: { value: palette.fg.muted },
          subtle: { value: palette.fg.subtle },
          onAccent: { value: palette.ink[950] }, // never white on cyan
        },
        success: { value: palette.status.success },
        warning: { value: palette.status.warning },
        danger: { value: palette.status.danger },
      },
    },
    textStyles: {
      hero: {
        value: {
          fontSize: "clamp(2.6rem, 7vw, 6rem)",
          lineHeight: "1.05",
          letterSpacing: "-0.03em",
          fontWeight: "600",
        },
      },
      h2: {
        value: {
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          lineHeight: "1.05",
          letterSpacing: "-0.03em",
          fontWeight: "600",
        },
      },
      h3: {
        value: {
          fontSize: "1.25rem",
          lineHeight: "1.3",
          letterSpacing: "-0.01em",
          fontWeight: "600",
        },
      },
      body: { value: { fontSize: "1.0625rem", lineHeight: "1.6" } },
      eyebrow: {
        value: {
          fontFamily: "mono",
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
      },
    },
  },
});

export const system = createSystem(defaultBaseConfig, leanDefaults, config);
