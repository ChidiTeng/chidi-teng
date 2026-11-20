/**
 * Soft, non-intrusive corner gradient aura for individual service (/services/[slug])
 * and work (/work/[slug]) detail pages.
 *
 * Uses pure, diffused CSS gradients in the top-right and bottom-left corners
 * while keeping the center canvas deep obsidian. Zero hard edges, 0 KB client JS.
 */
export function DetailDrapes({
  variant = "service",
}: {
  variant?: "service" | "work";
}) {
  return (
    <div
      className={`detail-drapes detail-drapes--${variant}`}
      aria-hidden="true"
    />
  );
}
