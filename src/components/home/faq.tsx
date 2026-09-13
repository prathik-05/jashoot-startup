import type { Faq } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";
import { FaqAccordion } from "../ui/accordion";

export function FaqSection({
  faqs,
  settings,
}: {
  faqs: Faq[];
  settings: { headline?: string };
}) {
  if (faqs.length === 0) return null;
  return (
    <Section id="faq">
      <SectionHead title={settings.headline ?? "Questions before you shoot?"} />
      <div className="mt-6">
        <FaqAccordion faqs={faqs} />
      </div>
    </Section>
  );
}
