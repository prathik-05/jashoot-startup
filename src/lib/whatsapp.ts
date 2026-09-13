import { type EnquiryInput, WHATSAPP_NUMBER } from "./schema";

/**
 * Build a wa.me deep link with a prefilled, structured message.
 * Attribution is captured client-side via the conversion event pipeline
 * (whatsapp_clicked) rather than in the URL, because wa.me only accepts ?text=.
 */
export function waMeLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function waText(text: string) {
  return encodeURIComponent(text);
}

/** Service-level structured enquiry, e.g. Instant Reel / Wedding. */
export function serviceEnquiryMessage(opts: {
  serviceName: string;
  date?: string;
  location?: string;
  extra?: string[];
}): string {
  const lines: string[] = [];
  lines.push(`Hi ${process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "JASHOOTS"} 👋`);
  lines.push(`I'd like to enquire about ${opts.serviceName}.`);
  if (opts.date) lines.push(`Date: ${opts.date}`);
  if (opts.location) lines.push(`Location: ${opts.location}`);
  for (const line of opts.extra ?? []) lines.push(line);
  lines.push("Please check availability and share the details.");
  return lines.join("\n");
}

/**
 * Full enquiry form → one structured WhatsApp message.
 * No detail is typed twice (fr: same-source rule).
 */
export function enquiryToWaMessage(e: EnquiryInput): string {
  const lines: string[] = [];
  lines.push(`Hi ${process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "JASHOOTS"} 👋`);
  lines.push(`I'd like to enquire about ${e.eventType || e.serviceSlug || "a shoot"}.`);
  lines.push(`Name: ${e.name}`);
  lines.push(`WhatsApp: ${e.phone}`);
  if (e.email) lines.push(`Email: ${e.email}`);
  if (e.eventDate) lines.push(`Date: ${e.eventDate}`);
  if (e.eventLocation) lines.push(`Location: ${e.eventLocation}`);
  if (e.preferredTime) lines.push(`Preferred time: ${e.preferredTime}`);
  if (e.requirements) lines.push(`Requirements: ${e.requirements}`);
  if (e.budgetInterest) lines.push(`Budget/package interest: ${e.budgetInterest}`);
  if (e.extraDetails) lines.push(`Additional details: ${e.extraDetails}`);
  lines.push("Please check availability and share the package details.");
  return lines.join("\n");
}

/** Catch-all "ANYTHING ELSE?" message. */
export function anythingElseMessage(fields: { event: string; date: string; location: string; requirements: string }): string {
  return [
    `Hi ${process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "JASHOOTS"} 👋`,
    "I have an event that doesn't fit the listed categories.",
    `Event: ${fields.event}`,
    `Date: ${fields.date}`,
    `Location: ${fields.location}`,
    `Requirements: ${fields.requirements}`,
    "Please help me with the best option.",
  ].join("\n");
}