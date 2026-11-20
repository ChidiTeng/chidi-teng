import { z } from "zod";

/**
 * Validated lazily so a missing email key never breaks the static build. Server only.
 * Delivers contact submissions to NEXT_PUBLIC_CONTACT_EMAIL (falling back to CONTACT_TO_EMAIL).
 */
const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.string().min(3),
});

export type MailEnv = z.infer<typeof serverSchema>;

/** Returns validated mail config, or null when email delivery is not configured. */
export function getMailEnv(): MailEnv | null {
  const parsed = serverSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL:
      process.env.CONTACT_FROM_EMAIL || "Website <onboarding@resend.dev>",
  });
  return parsed.success ? parsed.data : null;
}
