"use client";

import type { CtaAction } from "@/lib/schema";
import { waMeLink, serviceEnquiryMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/track";
import { buttonCx } from "./button";
import { Arrow } from "../brand/scribble";

interface WhatsAppCtaProps {
  action?: CtaAction;
  label?: string;
  serviceName?: string | null;
  serviceSlug?: string;
  date?: string;
  location?: string;
  extra?: string[];
  content?: string;
  variant?: "solid" | "outline" | "ghost" | "brush";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

/**
 * The one-tap conversion primitive. Every CTA on the site funnels through
 * this component: LABEL + structured WhatsApp message + attribution event.
 */
export function WhatsAppCta({
  action = "book_on_whatsapp",
  label,
  serviceName,
  serviceSlug,
  date,
  location,
  extra = [],
  content,
  variant = "solid",
  size = "md",
  className = "",
  fullWidth = false,
}: WhatsAppCtaProps) {
  const message = serviceEnquiryMessage({
    serviceName: serviceName || "a shoot",
    date,
    location,
    extra,
  });

  const weight = `font-bold`;
  const ctaLabel = label ?? (action === "discuss_on_whatsapp" ? "DISCUSS ON WHATSAPP" : "BOOK ON WHATSAPP");

  if (action === "enquire") {
    return (
      <a
        href={`/enquire${serviceSlug ? `?service=${encodeURIComponent(serviceSlug)}` : ""}`}
        className={`${buttonCx(variant, size, className)} ${fullWidth ? "w-full" : ""} ${weight}`}
        onClick={() => trackEvent("package_cta_clicked", { content, meta: { action: "enquire" } })}
      >
        {ctaLabel}
        <Arrow className="h-4 w-4" />
      </a>
    );
  }

  return (
    <a
      href={waMeLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonCx(variant, size, className)} ${fullWidth ? "w-full" : ""} ${weight}`}
      onClick={() =>
        trackEvent("whatsapp_clicked", { content, meta: { action, service: serviceSlug, label: ctaLabel } })
      }
    >
      <WhatsAppIcon className={`h-4 w-4 ${variant === "ghost" ? "" : ""}`} />
      {ctaLabel}
    </a>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.2 4c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2.1-1c-.3-.1-.5-.2-.7.1l-1 1.1c-.1.2-.3.2-.6.1a6.4 6.4 0 0 1-2.3-1.4 8.5 8.5 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.6l-.8-2c-.2-.5-.4-.4-.7-.4Z" />
    </svg>
  );
}