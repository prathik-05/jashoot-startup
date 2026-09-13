import { Container } from "../ui/container";
import { Section } from "../ui/section";
import type { PromoBlock } from "@/lib/schema";

export function Promise_({ settings, promo }: { settings: { headline?: string; sub?: string }; promo: PromoBlock | null }) {
  return (
    <Section id="promise" tone="surface" className="py-10 sm:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="text-display max-w-3xl text-2xl sm:text-4xl text-white">
          {settings.headline ?? "YOUR MOMENT → OUR CAMERA → YOUR REEL"}
        </h2>
        <p className="max-w-md text-xs text-fog">
          {settings.sub ?? "Every package carries its promised turnaround."}
        </p>
      </div>
      {promo && promo.enabled && promo.published && (promo.headline || promo.subtext) ? (
        <div className="mt-6 flex flex-col gap-2 border border-red/20 bg-red/[0.05] p-4 rounded-2xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            {promo.badge ? (
              <p className="eyebrow text-red/70">{promo.badge}</p>
            ) : null}
            {promo.headline ? (
              <p className="text-display mt-1 text-lg sm:text-xl text-white">{promo.headline}</p>
            ) : null}
            {promo.subtext ? (
              <p className="mt-1 text-xs text-fog">{promo.subtext}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </Section>
  );
}

export function PromiseStrip() {
  return (
    <Container className="py-8">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar border-y border-border py-3 font-display text-[0.6rem] uppercase tracking-[0.1em] text-fog sm:text-xs">
        {["Shoot", "Edit", "Deliver"].map((s, i) => (
          <span key={s} className="flex items-center gap-2 whitespace-nowrap">
            {i > 0 ? <span aria-hidden="true" className="text-red">→</span> : null}
            {s}
          </span>
        ))}
        <span className="hidden whitespace-nowrap text-fog/50 sm:inline">
          Within your promised turnaround
        </span>
      </div>
    </Container>
  );
}
