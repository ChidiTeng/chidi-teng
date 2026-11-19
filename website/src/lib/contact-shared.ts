/**
 * Zod-free contact constants and types, safe to import from client components.
 * The server schema (contact-schema.ts) builds on these.
 */
export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  service: { max: 80 },
  message: { min: 10, max: 2000 },
} as const;

/** Submissions faster than this are almost always bots. */
export const MIN_FILL_MS = 2500;

export type ContactField = "name" | "email" | "service" | "message";

export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
    };
