import { NextResponse } from "next/server";
import {
  contactSchema,
  isLikelySpam,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact-schema";
import { createRateLimiter, clientKey } from "@/lib/rate-limit";
import { getMailEnv } from "@/lib/env.server";

const MAX_BODY_BYTES = 10_000;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const json = (body: ContactResponse, init?: ResponseInit) =>
  NextResponse.json(body, init);

export async function POST(req: Request) {
  // JSON-only: a cross-site HTML form cannot send application/json without a CORS preflight.
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, error: "Unsupported content type." },
      { status: 415 },
    );
  }
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Message too large." }, { status: 413 });
  }

  const rate = limiter(clientKey(req.headers));
  if (!rate.allowed) {
    return json(
      {
        ok: false,
        error:
          "Too many messages. Please try again later or email me directly.",
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Message too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  // Bots get a normal success response so they don't learn to adapt.
  if (isLikelySpam(parsed.data)) return json({ ok: true });

  const mail = getMailEnv();
  if (!mail) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] Email not configured; submission accepted but not sent.",
      );
      return json({ ok: true });
    }
    return json(
      {
        ok: false,
        error: "The form is temporarily unavailable. Please email me directly.",
      },
      { status: 503 },
    );
  }

  const { name, email, service, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mail.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: mail.CONTACT_FROM_EMAIL,
      to: [mail.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New enquiry from ${name}${service ? ` (${service})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\n\n${message}`,
    }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("[contact] Email provider error", res?.status);
    return json(
      {
        ok: false,
        error:
          "Something went wrong sending your message. Please email me directly.",
      },
      { status: 502 },
    );
  }

  return json({ ok: true });
}
