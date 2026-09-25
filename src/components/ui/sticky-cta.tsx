"use client";

import { trackEvent } from "@/lib/track";
import { waMeLink } from "@/lib/whatsapp";
import { WHATSAPP_DISPLAY } from "@/lib/schema";
import { WhatsAppIcon } from "./whatsapp-cta";

export function StickyWhatsAppBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#07070A]/95 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.8)] md:hidden">
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[0.6rem] uppercase tracking-wide text-white">
            Got a moment?
          </p>
          <p className="truncate text-[0.5rem] text-fog">Let&apos;s make it a reel</p>
        </div>
        <a
          href={waMeLink(`Hi ${WHATSAPP_DISPLAY} 👋\nTell me what you're shooting and I'll start.`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_clicked", { content: "sticky-mobile-bar" })}
          className="inline-flex shrink-0 items-center gap-1.5 bg-red px-4 py-2 font-display text-[0.55rem] uppercase tracking-[0.06em] text-white rounded-lg shadow-[0_0_16px_rgba(227,6,19,0.25)]"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
