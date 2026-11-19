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

  return (
    <Box
      as="header"
      ref={ref}
      position="sticky"
      top="0"
      zIndex="50"
      h="var(--header-h)"
      transition="transform .35s cubic-bezier(.22,1,.36,1), background-color .3s, border-color .3s"
      borderBottomWidth="1px"
      borderColor="transparent"
      css={{
        "&[data-scrolled=true]": {
          backgroundColor: "rgb(5 8 15 / 0.72)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--c-border)",
        },
        "&[data-hidden=true]:not(:focus-within)": {
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
          <Box as="span" fontWeight="600" letterSpacing="-0.02em" fontSize="lg">
            {site.shortName}
            <Box as="span" color="accent.cyan">
              _
            </Box>
          </Box>
        </Link>

        <Box
          as="nav"
          aria-label="Primary"
          display={{ base: "none", md: "block" }}
        >
          <HStack as="ul" gap="1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="btn btn--ghost btn--sm"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </HStack>
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
        <Flex as="ul" direction="column" gap="2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: 16 }}>
            <ButtonLink href={site.bookingHref} onClick={() => setOpen(false)}>
              {site.primaryCta.label}
            </ButtonLink>
          </li>
        </Flex>
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
