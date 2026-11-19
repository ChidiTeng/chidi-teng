import { z } from "zod";

/** Validated lazily so a missing email key never breaks the static build. Server only. */
const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.string().min(3),
});

export type MailEnv = z.infer<typeof serverSchema>;

/** Returns validated mail config, or null when email delivery is not configured. */
export function getMailEnv(): MailEnv | null {
  const parsed = serverSchema.safeParse(process.env);
  return parsed.success ? parsed.data : null;
}
