import { Container } from "./container";
import { WhatsAppCta } from "./whatsapp-cta";

/**
 * Real-data-only empty state: shown when CMS has no content for a section.
 * Honest, on-brand, with the single conversion path intact.
 */
export function PendingContent({
  title = "Content being shot",
  sub = "JASHOOTS is publishing this section from the Studio. Check back soon — or start on WhatsApp.",
  ctaLabel = "START ON WHATSAPP",
  content = "pending-section",
}: {
  title?: string;
  sub?: string;
  ctaLabel?: string;
  content?: string;
}) {
  return (
    <Container>
      <div className="flex flex-col items-start gap-3 border border-border bg-surface p-8 sm:p-10">
        <span className="eyebrow text-red/60">Pending CMS content</span>
        <h3 className="text-display text-xl sm:text-2xl text-fog">{title}</h3>
        <p className="max-w-lg text-xs text-muted">{sub}</p>
        <WhatsAppCta
          label={ctaLabel}
          content={content}
          variant="ghost"
          size="sm"
        />
      </div>
    </Container>
  );
}
