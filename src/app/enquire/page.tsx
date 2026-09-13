import type { Metadata } from "next";
import Link from "next/link";
import { getCachedSiteData } from "@/lib/content";
import { TrackPageView } from "@/components/track-page-view";
import { Container } from "@/components/ui/container";
import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { WhatsAppIcon } from "@/components/ui/whatsapp-cta";
import { waMeLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Book a shoot — JASHOOTS",
  description:
    "Tell us what you're shooting. One form → one structured WhatsApp enquiry, or chat directly with creator Jashwanth.",
};

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const data = await getCachedSiteData();
  const { service } = await searchParams;

  const directWhatsAppUrl = waMeLink(
    "Hi JASHOOTS, I would like to check availability and enquire about a shoot."
  );

  return (
    <>
      <TrackPageView />
      <Container className="py-10 sm:py-14 max-w-3xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-red/40 text-white/70 hover:text-white transition-all text-xs font-mono-brand group"
          >
            <svg
              className="w-4 h-4 text-red transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>BACK TO HOME</span>
          </Link>
        </div>

        <p className="eyebrow text-red">Let&apos;s shoot</p>
        <h1 className="text-display mt-2 text-4xl sm:text-6xl text-white">
          Tell us the moment
        </h1>
        <p className="mt-3 text-xs text-fog leading-relaxed max-w-xl">
          Fill this once — your details land in a structured WhatsApp enquiry docket with an instant reference number.
        </p>

        {/* Compact WhatsApp Direct Fast-Track Bar */}
        <div className="mt-6 mb-8 rounded-xl border border-[#25D366]/25 bg-gradient-to-r from-[#25D366]/[0.08] via-black/40 to-black/60 p-3.5 sm:p-4 flex items-center justify-between gap-4 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center text-[#25D366] shrink-0">
              <WhatsAppIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">
                Prefer to chat directly?
              </p>
              <p className="text-[11px] text-white/50 truncate">
                Instant answers &amp; custom shoot quotes directly with Jashwanth
              </p>
            </div>
          </div>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-mono-brand text-[11px] font-bold px-3.5 py-2 rounded-lg transition-all duration-200 shadow-md shadow-[#25D366]/20 active:scale-[0.98] uppercase tracking-wider shrink-0 cursor-pointer"
          >
            <WhatsAppIcon className="size-3.5" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>

        {/* Primary Enquiry Form at the Top */}
        <div>
          <EnquiryForm services={data.services} presetService={service ?? ""} />
        </div>
      </Container>
    </>
  );
}