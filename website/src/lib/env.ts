/**
 * Public env, safe for client bundles (inlined at build time, so read with
 * static property access). Server-only secrets live in env.server.ts.
 */
export const publicEnv = {
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, ""),
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || undefined,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
} as const;
