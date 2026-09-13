import type { Metadata } from "next";
import { TrackPageView } from "@/components/track-page-view";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Client portal — JASHOOTS",
  description: "Review, approve and receive your shoot. Portal accounts open after booking confirmation.",
  robots: "noindex,nofollow",
};

export default function PortalPage() {
  return (
    <>
      <TrackPageView />
      <Container className="py-14">
        <SectionHead
          eyebrow="Client portal"
          title="Your shoot, in your pocket"
        />
        <div className="mt-8 max-w-2xl card card-glow p-6">
          <p className="text-xs text-fog">
            The portal opens after your booking is confirmed — this is where you
            review reels, approve edits and receive your private delivery link.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-fog">
            <li>→ Bookings and project timelines</li>
            <li>→ Per-reel review & approve</li>
            <li>→ Razorpay deposit status</li>
            <li>→ Private delivery link after approval</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/enquire" size="md">
              New here? Start an enquiry
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="md">
              See the work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}