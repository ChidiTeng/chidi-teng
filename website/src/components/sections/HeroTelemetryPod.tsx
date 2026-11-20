"use client";
import { useEffect, useState } from "react";

type DisciplineTab = {
  shortCode: string;
  shortName: string;
  accent: string;
};

const tabs: DisciplineTab[] = [
  {
    shortCode: "01 · UI",
    shortName: "Frontend",
    accent: "#2DD4BF", // glowing cyan
  },
  {
    shortCode: "02 · SRE",
    shortName: "Reliability",
    accent: "#BEF264", // glowing lime
  },
  {
    shortCode: "03 · SEC",
    shortName: "AppSec",
    accent: "#A78BFA", // glowing violet
  },
];

/**
 * Holographic Security & Uptime HUD Dock:
 * - Dual-ring 3D rotating gyro-shield emblem
 * - 3 tactile discipline chips (Frontend, Reliability, AppSec) that auto-cycle or select on click
 * - Live animated SVG ECG heartbeat waveform + "Available" status readout
 * - Pointer-driven 3D perspective tilt (--rx, --ry) with zero React state re-renders on move
 */
export function HeroTelemetryPod() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % tabs.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = tabs[index]!;

  return (
    <div data-hero="fade" className="telemetry-stage">
      <div
        role="button"
        tabIndex={0}
        aria-label="Software Engineering, Site Reliability Engineering, and Application Security — Available for new projects. Activate to cycle focus areas."
        className="telemetry-pod telemetry-pod--card"
        style={
          {
            "--pod-accent": active.accent,
          } as React.CSSProperties
        }
        onClick={() => setIndex((i) => (i + 1) % tabs.length)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIndex((i) => (i + 1) % tabs.length);
          }
        }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={(e) => {
          setPaused(false);
          const el = e.currentTarget;
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const ry = (px - 0.5) * 10;
          const rx = (0.5 - py) * 12;
          el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
          el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
          el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        }}
      >
        <span className="telemetry-pod__halo" aria-hidden="true" />
        <span className="telemetry-pod__glare" aria-hidden="true" />

        <span className="hud-gyro" aria-hidden="true">
          <span className="hud-gyro__ring" />
          <span className="hud-gyro__ring hud-gyro__ring--inner" />
          <span className="hud-gyro__shield">0{index + 1}</span>
        </span>

        <span className="hud-tabs" aria-hidden="true">
          {tabs.map((t, i) => (
            <span
              key={t.shortCode}
              className="hud-tab"
              data-active={i === index}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
            >
              <span className="hud-tab__code">{t.shortCode}</span>
              <span className="hud-tab__name">{t.shortName}</span>
            </span>
          ))}
        </span>

        <span className="hud-wave" aria-hidden="true">
          <svg
            className="hud-wave__svg"
            viewBox="0 0 44 16"
            aria-hidden="true"
          >
            <path
              className="hud-wave__path"
              d="M 1 9 L 11 9 L 15 3 L 19 14 L 24 6 L 28 10 L 32 9 L 43 9"
            />
          </svg>
          <span className="telemetry-chip__label">Available</span>
        </span>
      </div>
    </div>
  );
}
