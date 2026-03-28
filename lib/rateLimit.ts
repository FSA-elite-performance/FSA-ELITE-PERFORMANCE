/**
 * Fixed-window in-memory rate limiter.
 *
 * Each serverless instance maintains its own store. This is not distributed —
 * limits apply per-instance, which is appropriate for burst protection and
 * AI/checkout cost control. For stricter global limits at scale, replace the
 * store with Vercel KV or another distributed cache.
 */

import type { NextApiRequest } from 'next';

type WindowEntry = { count: number; resetAt: number };

const store = new Map<string, WindowEntry>();

// Lazily prune expired entries to keep memory bounded.
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 60_000;

function prune(): void {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  });
}

export type RateLimitResult = {
  allowed: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** Seconds until the window resets. 0 when the request is allowed. */
  retryAfter: number;
};

export type RateLimitOptions = {
  /** Window length in milliseconds. Default: 60 000 (1 minute). */
  windowMs?: number;
  /** Maximum requests allowed per window per key. */
  maxRequests: number;
};

/**
 * Checks whether the caller identified by `key` is within the rate limit.
 * Increments the counter when the request is allowed.
 *
 * @param key     Unique caller identifier, e.g. `"203.0.113.1:/api/ai-chat"`.
 * @param options Window size and maximum request count.
 */
export function rateLimit(
  key: string,
  { windowMs = 60_000, maxRequests }: RateLimitOptions
): RateLimitResult {
  prune();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: 0 };
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count, retryAfter: 0 };
}

/**
 * Extracts the best-effort client IP from a Next.js API request.
 *
 * On Vercel, the real IP is forwarded via `x-real-ip`.
 * Falls back to the first entry of `x-forwarded-for`, then the socket address.
 */
export function getClientIp(req: NextApiRequest): string {
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(',')[0];
  if (first?.trim()) {
    return first.trim();
  }

  return req.socket?.remoteAddress ?? 'unknown';
}
