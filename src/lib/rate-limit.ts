// Redis-backed rate limiter using @upstash/ratelimit.
// Survives cold starts and works across serverless instances.
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

if (!redis && process.env.NODE_ENV === "production") {
  console.warn(
    "[rate-limit] WARNING: UPSTASH_REDIS_REST_URL not set. " +
    "Using in-memory rate limiter which does NOT survive cold starts " +
    "and is NOT suitable for production. Set UPSTASH_REDIS_REST_URL " +
    "and UPSTASH_REDIS_REST_TOKEN."
  );
}

// Fallback for local dev when Upstash is not configured.
// In-memory map that only persists within a single process lifecycle.
// NOT suitable for production — use Upstash.
const devStore = new Map<string, { count: number; resetAt: number }>();

function devRateLimit(
  identifier: string,
  windowMs: number,
  max: number,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = devStore.get(identifier);
  if (!entry || now > entry.resetAt) {
    devStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }
  if (entry.count >= max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count++;
  return { allowed: true, remaining: max - entry.count, resetAt: entry.resetAt };
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig,
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  if (redis) {
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.max, `${config.windowMs} ms`),
      analytics: false,
      prefix: "jashoots",
    });
    const result = await limiter.limit(identifier);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  }

  // Dev fallback — in-memory, single-process only
  return devRateLimit(identifier, config.windowMs, config.max);
}

/**
 * Extract the real client IP from request headers.
 * Splits x-forwarded-for (which may contain multiple IPs) and takes the first.
 * Falls back to x-real-ip, then "anonymous".
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for: client, proxy1, proxy2 — take the first (real client)
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return req.headers.get("x-real-ip") ?? "anonymous";
}
