"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Sticky header: gains a blurred surface after scrolling, slides away while
 * scrolling down and returns on scroll up. Scroll handling writes data
 * attributes directly (one rAF per frame, no React re-render).
 */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.dataset.scrolled = String(y > 8);
      el.dataset.hidden = String(y > 240 && y > lastY + 4);
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu on navigation. Cache Components keeps layouts mounted via
  // <Activity>, so this cannot rely on unmounting.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mobileItems = [{ label: "Overview", href: "/" }, ...site.nav];

  return (
    <Box
      as="header"
      ref={ref}
      data-menu-open={open}
      position="sticky"
      top="0"
      zIndex="50"
      h="var(--header-h)"
      transition="transform .35s cubic-bezier(.22,1,.36,1), background-color .3s, border-color .3s"
      borderBottomWidth="1px"
      borderColor="transparent"
      css={{
        "&[data-scrolled=true], &[data-menu-open=true]": {
          backgroundColor: "rgb(7 7 13 / 0.92)",
          backdropFilter: "blur(14px)",
          borderColor: "var(--c-border)",
        },
        "&[data-hidden=true]:not(:focus-within):not([data-menu-open=true])": {
          transform: "translateY(-100%)",
        },
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Flex
        maxW="container"
        mx="auto"
        h="full"
        px={{ base: "6", md: "8" }}
        align="center"
        justify="space-between"
      >
        <Link href="/" aria-label={`${site.name}, home`}>
          <HStack gap="2.5">
            <Box
              as="span"
              aria-hidden="true"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              boxSize="9"
              rounded="full"
              fontFamily="mono"
              fontSize="xs"
              fontWeight="700"
              color="white"
              css={{
                background:
                  "linear-gradient(135deg, #A78BFA 0%, #7C3AED 55%, #2DD4BF 100%)",
                boxShadow:
                  "inset 0 1px 0 0 rgb(255 255 255 / 0.35), 0 0 18px -2px rgb(167 139 250 / 0.55)",
              }}
            >
              EN
            </Box>
            <Box
              as="span"
              fontWeight="600"
              letterSpacing="-0.02em"
              fontSize="lg"
            >
              {site.shortName}
              <Box as="span" color="accent.cyan">
                _
              </Box>
            </Box>
          </HStack>
        </Link>

        <Box
          as="nav"
          aria-label="Primary"
          display={{ base: "none", md: "block" }}
        >
          <ul className="nav-track">
            <li>
              <Link
                href="/"
                className="nav-pill"
                data-active={pathname === "/"}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                {pathname === "/" && (
                  <span className="nav-pill__dot" aria-hidden="true" />
                )}
                Overview
              </Link>
            </li>
            {site.nav.map((item) => {
              const isActive =
                pathname === item.href ||
                (!item.href.startsWith("/#") &&
                  pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-pill"
                    data-active={isActive}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <span className="nav-pill__dot" aria-hidden="true" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Box>

        <HStack gap="2">
          <Box display={{ base: "none", sm: "block" }}>
            <ButtonLink href={site.bookingHref} size="sm">
              {site.primaryCta.short}
            </ButtonLink>
          </Box>
          <Box
            as="button"
            ref={toggleRef}
            display={{ base: "inline-flex", md: "none" }}
            alignItems="center"
            justifyContent="center"
            boxSize="11"
            rounded="full"
            borderWidth="1px"
            borderColor="border.subtle"
            bg="bg.surface"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon open={open} />
          </Box>
        </HStack>
      </Flex>

      {/* Always in the DOM so it can animate out; `inert` removes it from focus and the a11y tree when closed. */}
      <nav
        id={menuId}
        aria-label="Mobile"
        className="mobile-menu"
        data-open={open}
        inert={!open}
      >
        <ul className="mobile-menu__list">
          {mobileItems.map((item, idx) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" &&
                !item.href.startsWith("/#") &&
                pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-menu__link"
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu__link-left">
                    <span className="mobile-menu__num" aria-hidden="true">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <span className="mobile-menu__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mobile-menu__footer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <span className="glow-pill">
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
              Available for projects
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.75rem",
                color: "var(--c-muted)",
              }}
            >
              Lagos · UTC+1
            </span>
          </div>
          <ButtonLink
            href={site.bookingHref}
            onClick={() => setOpen(false)}
            style={{ width: "100%" }}
          >
            {site.primaryCta.label}
          </ButtonLink>
        </div>
      </nav>
    </Box>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {open ? (
        <path d="M5 5l10 10M15 5L5 15" />
      ) : (
        <path d="M3 6h14M3 10h14M3 14h14" />
      )}
    </svg>
  );
}
