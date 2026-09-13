import * as Sentry from "@sentry/nextjs";
import { enquiryToWaMessage, waMeLink } from "@/lib/whatsapp";
import { getServerClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/schema";
import { notifyOwnerOfNewLead } from "@/lib/owner-alerts";

const RATE_LIMIT = { windowMs: 60_000, max: 5 };

/**
 * Hybrid enquiry endpoint: validate → create lead (JS-XXXX) → structured
 * WhatsApp message → wa.me URL. ENQUIRY ≠ BOOKING: writes a lead in
 * stage=enquiry; booking only happens after team confirmation on WhatsApp.
 */
export async function POST(req: Request): Promise<Response> {
  const ip = getClientIp(req);
  const limiter = await rateLimit(`enquiry:${ip}`, RATE_LIMIT);
  if (!limiter.allowed) {
    return Response.json({ error: "too many requests", message: "Too many requests. Please wait a minute before submitting again." }, { status: 429 });
  }

  // Security: Prevent oversized payloads (DoS protection)
  const rawBody = await req.text().catch(() => "");
  if (rawBody.length > 65536) {
    return Response.json({ error: "Payload too large", message: "Request exceeds maximum allowed size." }, { status: 413 });
  }

  let bodyJson: unknown;
  try {
    bodyJson = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return Response.json({ error: "invalid enquiry", message: "Malformed JSON in request body." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(bodyJson);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstErrorMessage =
      parsed.error.issues[0]?.message || "Please check your inputs and try again.";
    return Response.json(
      {
        error: "invalid enquiry",
        message: firstErrorMessage,
        fieldErrors,
      },
      { status: 400 },
    );
  }
  const e = parsed.data;

  const waUrl = waMeLink(enquiryToWaMessage({ ...e, email: e.email }));
  const supabase = getServerClient();

  if (!supabase) {
    const ref = `JS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    notifyOwnerOfNewLead({
      ref,
      name: e.name,
      phone: e.phone,
      email: e.email,
      eventType: e.eventType,
      eventDate: e.eventDate,
      eventLocation: e.eventLocation,
      preferredTime: e.preferredTime,
      requirements: e.requirements,
      extraDetails: e.extraDetails,
    }).catch((err) => console.error("[enquiries] Fallback owner alert failed:", err));

    return Response.json({ ref, waUrl }, { status: 201 });
  }

  try {
    const { data: existing } = await supabase
      .from("clients")
      .select("id")
      .eq("phone", e.phone)
      .limit(1)
      .maybeSingle();

    let clientId: string | null = existing?.id ?? null;
    if (!clientId) {
      const { data: created, error: cErr } = await supabase
        .from("clients")
        .insert({ name: e.name, phone: e.phone, email: e.email || null })
        .select("id")
        .single();
      if (cErr) throw cErr;
      clientId = created.id;
    }

    const serviceId = e.serviceSlug
      ? (
          await supabase
            .from("services")
            .select("id")
            .eq("slug", e.serviceSlug)
            .limit(1)
            .maybeSingle()
        ).data?.id ?? null
      : null;

    const { data: lead, error: lErr } = await supabase
      .from("leads")
      .insert({
        client_id: clientId,
        service_id: serviceId,
        source_page: e.sourcePage,
        source_content: e.sourceContent,
        name: e.name,
        phone: e.phone,
        email: e.email || null,
        event_type: e.eventType,
        event_date: toDateOrNull(e.eventDate),
        event_location: e.eventLocation,
        preferred_time: e.preferredTime || null,
        requirements: e.requirements || null,
        budget_interest: e.budgetInterest || null,
        extra_details: e.extraDetails || null,
      })
      .select("ref")
      .single();
    if (lErr) throw lErr;

    const leadRef = (lead as { ref: string }).ref;

    // Dispatch automated alert directly to owner's WhatsApp / Phone
    notifyOwnerOfNewLead({
      ref: leadRef,
      name: e.name,
      phone: e.phone,
      email: e.email,
      eventType: e.eventType,
      eventDate: e.eventDate,
      eventLocation: e.eventLocation,
      preferredTime: e.preferredTime,
      requirements: e.requirements,
      extraDetails: e.extraDetails,
    }).catch((err) => console.error("[enquiries] Owner notification failed:", err));

    await supabase.rpc("log_conversion_event", {
      p_session: null,
      p_event: "enquiry_submitted",
      p_page: e.sourcePage,
      p_context: { content: e.sourceContent, eventType: e.eventType },
      p_lead_id: null,
    });

    return Response.json({ ref: leadRef, waUrl }, { status: 201 });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error("[enquiries] lead creation failed:", err);
    Sentry.captureException(err);
    return Response.json({ error: "could not save enquiry" }, { status: 500 });
  }
}

function toDateOrNull(v: string): string | null {
  if (!v) return null;
  const ddmmyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v.trim());
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const iso = /^\d{4}-\d{2}-\d{2}$/.exec(v.trim());
  return iso ? v.trim() : null;
}
