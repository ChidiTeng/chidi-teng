import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugify } from "@/lib/toc";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf(
      (node as { props: { children?: React.ReactNode } }).props.children,
    );
  }
  return "";
}

/** Post bodies start at H2 (the page owns the H1). Headings get stable ids for the TOC. */
const components: MDXComponents = {
  h1: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
