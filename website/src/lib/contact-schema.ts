import { z } from "zod";
import { contactLimits, MIN_FILL_MS } from "./contact-shared";

export * from "./contact-shared";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(contactLimits.name.min, "Please enter your name.")
    .max(contactLimits.name.max, "That name is too long."),
  email: z
    .email("Please enter a valid email address.")
    .max(contactLimits.email.max),
  service: z
    .string()
    .trim()
    .max(contactLimits.service.max)
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(
      contactLimits.message.min,
      `Please write at least ${contactLimits.message.min} characters.`,
    )
    .max(
      contactLimits.message.max,
      `Please keep it under ${contactLimits.message.max} characters.`,
    ),
  // Spam traps. Checked separately so bots get a silent "success".
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** True when the submission tripped a spam trap and should be dropped silently. */
export function isLikelySpam(
  input: Pick<ContactInput, "website" | "startedAt">,
  now = Date.now(),
) {
  if (input.website && input.website.length > 0) return true;
  if (
    typeof input.startedAt === "number" &&
    now - input.startedAt < MIN_FILL_MS
  )
    return true;
  return false;
}
