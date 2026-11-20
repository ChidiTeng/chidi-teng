"use client";
import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";
import { site } from "@/content/site";

function buildCalEmbedUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("embed", "true");
    url.searchParams.set("theme", "dark");
    if (!url.searchParams.has("layout")) {
      url.searchParams.set("layout", "month_view");
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Global zero-dependency Cal.com booking modal.
 * Intercepts clicks on any `[data-cal-trigger="true"]` link across the site
 * and opens the embedded 3-column dark Cal.com interface inside a glowing modal.
 * Loads 0 KB of third-party scripts until the visitor opens the modal.
 */
export function CalBookingModal() {
  const [open, setOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string>(
    publicEnv.calUrl ?? "https://cal.com",
  );
  const [loaded, setLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const preconnectedRef = useRef(false);

  useEffect(() => {
    function warmConnection() {
      if (preconnectedRef.current) return;
      preconnectedRef.current = true;
      for (const href of ["https://cal.com", "https://app.cal.com"]) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = href;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    }

    function onPointerOver(e: PointerEvent) {
      const target = (e.target as Element | null)?.closest?.(
        '[data-cal-trigger="true"]',
      );
      if (target) warmConnection();
    }

    function onClick(e: MouseEvent) {
      // Allow modified clicks (Cmd/Ctrl/Shift/middle-click) to open in a new tab normally
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest?.(
        'a[data-cal-trigger="true"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      warmConnection();
      lastTriggerRef.current = anchor;
      const nextUrl = anchor.href || publicEnv.calUrl || "";
      if (nextUrl) {
        setActiveUrl((prev) => {
          if (prev !== nextUrl) setLoaded(false);
          return nextUrl;
        });
        setOpen(true);
      }
    }

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        lastTriggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const embedUrl = buildCalEmbedUrl(activeUrl);

  function handleClose() {
    setOpen(false);
    lastTriggerRef.current?.focus();
  }

  return (
    <div
      className="cal-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="cal-modal">
        {/* Top Glowing Modal Header Chrome */}
        <div className="cal-modal__header">
          <div className="cal-modal__brand">
            <span className="cal-modal__avatar" aria-hidden="true">
              EN
            </span>
            <div className="cal-modal__brand-text">
              <div className="cal-modal__title-row">
                <h2 id="cal-modal-title" className="cal-modal__title">
                  Book a Discovery Call
                </h2>
                <span className="glow-pill cal-modal__pill">
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--c-lime)",
                      boxShadow: "0 0 8px var(--c-lime)",
                    }}
                  />
                  30 min · Cal Video
                </span>
              </div>
              <p className="cal-modal__subtitle">
                {site.name} · Africa/Lagos (UTC+1)
              </p>
            </div>
          </div>

          <div className="cal-modal__actions">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cal-modal__ext"
              aria-label="Open booking page in a new tab on Cal.com"
              title="Open in Cal.com"
            >
              <span className="cal-modal__ext-label">Cal.com</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              ref={closeBtnRef}
              type="button"
              className="cal-modal__close"
              aria-label="Close booking modal"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        </div>

        {/* 3-Column Calendar Body + Glowing Dark Skeleton */}
        <div className="cal-modal__body">
          {!loaded && (
            <div className="cal-modal__skeleton" aria-hidden="true">
              <div className="cal-modal__skel-col cal-modal__skel-col--left">
                <div className="cal-modal__skel-circle" />
                <div className="cal-modal__skel-line cal-modal__skel-line--sm" />
                <div className="cal-modal__skel-line cal-modal__skel-line--lg" />
                <div className="cal-modal__skel-line cal-modal__skel-line--md" />
                <div className="cal-modal__skel-line cal-modal__skel-line--md" />
              </div>
              <div className="cal-modal__skel-col cal-modal__skel-col--center">
                <div className="cal-modal__skel-line cal-modal__skel-line--md" />
                <div className="cal-modal__skel-grid">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className="cal-modal__skel-cell" />
                  ))}
                </div>
              </div>
              <div className="cal-modal__skel-col cal-modal__skel-col--right">
                <div className="cal-modal__skel-line cal-modal__skel-line--sm" />
                <div className="cal-modal__skel-slot" />
                <div className="cal-modal__skel-slot" />
                <div className="cal-modal__skel-slot" />
              </div>
              <div className="cal-modal__skel-status">
                <span className="glow-pill glow-pill--cyan">
                  Loading live calendar…
                </span>
              </div>
            </div>
          )}

          <iframe
            src={embedUrl}
            title={`Book a discovery call with ${site.name}`}
            className="cal-modal__iframe"
            data-loaded={loaded}
            allow="camera; microphone; autoplay; payment"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
