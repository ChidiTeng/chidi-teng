/**
 * Fixed-window, in-memory rate limiter.
 *
 * Good enough for a single long-lived instance and as a first line of defence.
 * On serverless (Vercel), each instance has its own memory, so swap the store
 * for a shared one (for example Upstash Ratelimit) before relying on it.
 */
export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): RateLimitResult {
    // Opportunistic cleanup keeps memory bounded without a timer.
    if (hits.size > 5_000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
    }

    entry.count += 1;
    const allowed = entry.count <= limit;
    return {
      allowed,
      remaining: Math.max(0, limit - entry.count),
      retryAfterSec: allowed ? 0 : Math.ceil((entry.resetAt - now) / 1000),
    };
  };
}

/** Best-effort client IP from proxy headers. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
