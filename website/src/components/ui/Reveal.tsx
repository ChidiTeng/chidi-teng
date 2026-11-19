/**
 * Fade-up on first view. Server Component: it only marks the element.
 * One shared IntersectionObserver (RevealObserver, mounted in the layout)
 * flips `data-revealed`, and CSS in globals.css runs the transition.
 *
 * This replaced a Framer Motion version after measurement: Motion cost
 * ~57 KB gzipped on every route for an effect CSS does natively.
 * Use below the fold only, never on the H1. Reduced motion and no-JS are
 * handled in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li";
}) {
  return (
    <Tag
      data-reveal=""
      style={
        delay
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
