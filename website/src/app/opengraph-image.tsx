import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { palette, signatureGradient } from "@/theme/tokens";

export const alt = `${site.name}, ${site.role} in ${site.location.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: palette.ink[950],
        backgroundImage: `radial-gradient(800px 500px at 0% 0%, rgba(34,211,238,0.22), transparent 70%), radial-gradient(800px 500px at 100% 100%, rgba(167,139,250,0.22), transparent 70%)`,
        color: palette.fg.default,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: palette.fg.muted,
          letterSpacing: 2,
        }}
      >
        {site.name.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          Next.js sites and dashboards that load fast and convert.
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 6,
            borderRadius: 3,
            backgroundImage: signatureGradient,
          }}
        />
      </div>
      <div style={{ display: "flex", fontSize: 28, color: palette.fg.muted }}>
        {site.role} · {site.location.city}, {site.location.country} · Remote
      </div>
    </div>,
    size,
  );
}
