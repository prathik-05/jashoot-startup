import * as Sentry from "@sentry/nextjs";
import { getServerClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { conversionEventSchema } from "@/lib/schema";

const RATE_LIMIT = { windowMs: 60_000, max: 30 };

/**
 * Global conversion event sink (A8). Events are persisted via the
 * SECURITY DEFINER RPC log_conversion_event() so anonymous visitors can log
 * without any direct table access. If Supabase isn't configured the event is
 * acknowledged and dropped (dev/no-op path).
 */
export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req);
  const limiter = await rateLimit(`event:${ip}`, RATE_LIMIT);
  if (!limiter.allowed) {
    return Response.json(
      { error: "too many requests", message: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }

  // Security: Cap body size at 64KB (DoS protection)
  const rawBody = await req.text().catch(() => "");
  if (rawBody.length > 65536) {
    return Response.json(
      { error: "Payload too large", message: "Request exceeds maximum allowed size." },
      { status: 413 }
    );
  }

  let bodyJson: unknown;
  try {
    bodyJson = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return Response.json(
      { error: "invalid payload", message: "Malformed JSON in request body." },
      { status: 400 }
    );
  }

  try {
    const body = conversionEventSchema.safeParse(bodyJson);
    if (!body.success) {
      return Response.json(
        { error: "invalid payload", details: body.error.flatten() },
        { status: 400 }
      );
    }

    const { session, event, page, content, leadRef, meta } = body.data;

    const supabase = getServerClient();
    if (supabase) {
      await supabase.rpc("log_conversion_event", {
        p_session: session,
        p_event: event,
        p_page: page,
        p_context: { content, leadRef, ...(meta as Record<string, unknown>) },
        p_lead_id: null,
      });
    }

    return Response.json({ ok: true }, { status: 202 });
  } catch (err) {
    if (err instanceof Response) return err;
    console.error("[events] unexpected error:", err);
    Sentry.captureException(err);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}
