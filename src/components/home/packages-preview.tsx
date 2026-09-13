import type { Package, Service } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";
import { PackageCard } from "../packages/package-card";
import { PendingContent } from "../ui/empty-state";

export function PackagesPreview({
  packages,
  services,
  settings,
}: {
  packages: Package[];
  services: Service[];
  settings: { headline?: string; sub?: string };
}) {
  const serviceById = new Map(services.map((s) => [s.id, s]));
  const shown = packages.filter((p) => p.published).slice(0, 3);

  return (
    <Section id="packages">
      <SectionHead
        title={settings.headline ?? "Packages"}
        sub={settings.sub ?? "Transparent. No hidden quotes."}
      />
      {shown.length === 0 ? (
        <div className="mt-6">
          <PendingContent
            title="Packages finalizing"
            sub="Transparent packages with coverage, delivery and revisions are being finalized in the Studio. Real pricing only — never placeholders."
            ctaLabel="ASK ON WHATSAPP"
            content="packages-empty"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {shown.map((p) => {
            const s = serviceById.get(p.serviceId);
            return (
              <PackageCard
                key={p.id}
                pkg={p}
                serviceName={s?.name}
                serviceSlug={s?.slug}
                content="home-packages"
              />
            );
          })}
        </div>
      )}
    </Section>
  );
}
