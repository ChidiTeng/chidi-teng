import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const isExternal = (href: string) =>
  /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

const isCalBookingUrl = (href: string) =>
  /^https?:\/\/(www\.|app\.)?cal\.com\//i.test(href);

/**
 * CSS-only button link. External URLs open in a new tab with safe rel.
 * Cal.com booking URLs are tagged with `data-cal-trigger="true"` so
 * CalBookingModal intercepts plain left-clicks and opens the in-app modal,
 * while middle-click / no-JS still opens Cal.com normally.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: Props) {
  const cls = ["btn", `btn--${variant}`, size === "sm" && "btn--sm", className]
    .filter(Boolean)
    .join(" ");
  if (isExternal(href)) {
    const newTab = !href.startsWith("mailto:");
    const calTrigger = isCalBookingUrl(href);
    return (
      <a
        href={href}
        className={cls}
        {...(calTrigger && { "data-cal-trigger": "true" })}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
