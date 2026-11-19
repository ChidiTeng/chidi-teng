export type TocItem = { id: string; text: string };

/** Slug used for heading ids. Shared by the TOC parser and the MDX `h2` renderer. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extracts level-2 headings from raw MDX source, skipping fenced code blocks. */
export function extractToc(source: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of source.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      const text = match[1].replace(/[`*_~]/g, "");
      items.push({ id: slugify(text), text });
    }
  }
  return items;
}
