import { Container } from "../ui/container";
import { WhatsAppCta } from "../ui/whatsapp-cta";

export function FinalCta({
  settings,
}: {
  settings: { headline?: string; sub?: string; cta?: { label?: string; action?: "book_on_whatsapp" | "discuss_on_whatsapp" | "enquire" } };
}) {
  return (
    <div className="relative overflow-hidden bg-red">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative py-16 text-center sm:py-20">
        <h2 className="text-display text-4xl text-white sm:text-6xl">
          {settings.headline ?? "Got a moment?"}
        </h2>
        <p className="text-display mt-2 text-lg text-white/90 sm:text-2xl">
          {settings.sub ?? "Let's make it a reel."}
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppCta
            label={settings.cta?.label ?? "Book on WhatsApp"}
            action={settings.cta?.action ?? "book_on_whatsapp"}
            content="final-cta"
            size="lg"
            variant="brush"
          />
        </div>
        <p className="mx-auto mt-4 max-w-md text-xs text-white/70">
          Tell us what you&apos;re shooting — we&apos;ll check availability and take it from there.
        </p>
      </Container>
    </div>
  );
}
