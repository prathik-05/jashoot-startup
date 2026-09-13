/**
 * Automated Server-to-Owner Notification Service.
 * Fired immediately when a customer submits an enquiry on the website.
 * Sends the complete shoot brief directly to the owner's WhatsApp / phone without
 * relying on the customer opening WhatsApp.
 */

export interface OwnerAlertPayload {
  ref: string;
  name: string;
  phone: string;
  email?: string | null;
  eventType?: string | null;
  eventDate?: string | null;
  eventLocation?: string | null;
  preferredTime?: string | null;
  requirements?: string | null;
  extraDetails?: string | null;
}

export async function notifyOwnerOfNewLead(lead: OwnerAlertPayload): Promise<{
  whatsappSent: boolean;
  telegramSent: boolean;
  error?: string;
}> {
  const cleanCustomerPhone = lead.phone.replace(/\D/g, "");
  const replyCustomerWaLink = `https://wa.me/${
    cleanCustomerPhone.length === 10 ? `91${cleanCustomerPhone}` : cleanCustomerPhone
  }?text=${encodeURIComponent(
    `Hi ${lead.name} 👋 This is JASHOOTS regarding your shoot enquiry #${lead.ref} for ${
      lead.eventType || "your event"
    }. Let's discuss details and lock your schedule!`
  )}`;

  // Formatted message for the owner's WhatsApp / Telegram
  const alertText = [
    `🚨 NEW JASHOOTS SHOOT ENQUIRY! 🎬`,
    `──────────────────────`,
    `📋 Docket: #${lead.ref}`,
    `👤 Client: ${lead.name}`,
    `📱 Phone: ${lead.phone}`,
    lead.email ? `📧 Email: ${lead.email}` : null,
    `🎯 Shoot: ${lead.eventType || "Custom Shoot"}`,
    `📅 Date: ${lead.eventDate || "Date TBD"}`,
    `📍 Location: ${lead.eventLocation || "Hyderabad"}`,
    lead.preferredTime ? `⏰ Time: ${lead.preferredTime}` : null,
    lead.requirements ? `📝 Requirements: ${lead.requirements}` : null,
    lead.extraDetails ? `💬 Notes: ${lead.extraDetails}` : null,
    `──────────────────────`,
    `👉 Tap to reply directly to client on WhatsApp:`,
    replyCustomerWaLink,
  ]
    .filter(Boolean)
    .join("\n");

  let whatsappSent = false;
  let telegramSent = false;

  // ── 1. CallMeBot WhatsApp Gateway (100% Free Instant WhatsApp Alert) ──────
  const callMeBotKey = process.env.CALLMEBOT_API_KEY?.trim();
  const ownerPhone = (
    process.env.OWNER_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "919398794825"
  ).replace(/\D/g, "");

  if (callMeBotKey && ownerPhone) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${ownerPhone}&text=${encodeURIComponent(
        alertText
      )}&apikey=${callMeBotKey}`;

      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        whatsappSent = true;
        console.log("[owner-alerts] WhatsApp alert delivered to owner via CallMeBot.");
      } else {
        const errText = await res.text().catch(() => "");
        console.warn("[owner-alerts] CallMeBot response not OK:", res.status, errText);
      }
    } catch (err) {
      console.error("[owner-alerts] Failed to dispatch CallMeBot WhatsApp alert:", err);
    }
  }

  // ── 2. Twilio WhatsApp Gateway (If configured) ───────────────────────────
  const twilioSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN?.trim();
  const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER?.trim(); // e.g. "whatsapp:+14155238886"

  if (!whatsappSent && twilioSid && twilioAuth && twilioFrom && ownerPhone) {
    try {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const basicAuth = Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64");

      const toFormatted = ownerPhone.startsWith("+")
        ? `whatsapp:${ownerPhone}`
        : `whatsapp:+${ownerPhone}`;

      const bodyParams = new URLSearchParams();
      bodyParams.append("From", twilioFrom.startsWith("whatsapp:") ? twilioFrom : `whatsapp:${twilioFrom}`);
      bodyParams.append("To", toFormatted);
      bodyParams.append("Body", alertText);

      const res = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      if (res.ok) {
        whatsappSent = true;
        console.log("[owner-alerts] WhatsApp alert delivered to owner via Twilio.");
      } else {
        const errText = await res.text().catch(() => "");
        console.warn("[owner-alerts] Twilio response error:", res.status, errText);
      }
    } catch (err) {
      console.error("[owner-alerts] Failed to dispatch Twilio WhatsApp alert:", err);
    }
  }

  // ── 3. Telegram Instant Push Notification (Free Backup Channel) ──────────
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (telegramBotToken && telegramChatId) {
    try {
      const tgUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      const res = await fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: alertText,
          disable_web_page_preview: false,
        }),
      });

      if (res.ok) {
        telegramSent = true;
        console.log("[owner-alerts] Telegram alert delivered to owner.");
      }
    } catch (err) {
      console.error("[owner-alerts] Failed to dispatch Telegram alert:", err);
    }
  }

  return { whatsappSent, telegramSent };
}
