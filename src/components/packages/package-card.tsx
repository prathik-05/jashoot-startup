import type { Package } from "@/lib/schema";
import { WhatsAppCta } from "../ui/whatsapp-cta";

function availabilityNote(p: Package): string | null {
  switch (p.availabilityType) {
    case "always":
      return "Available now";
    case "date_range":
      return "Seasonal — confirm dates";
    case "weekdays":
      return "Weekday slots";
    case "custom":
      return p.availabilityNote ?? "Custom availability";
    case "contact_only":
    default:
      return "Check availability";
  }
}

export function PackageCard({
  pkg,
  serviceName,
  serviceSlug,
  content,
}: {
  pkg: Package;
  serviceName?: string;
  serviceSlug?: string;
  content: string;
}) {
  const hasPrice = typeof pkg.price === "number" && pkg.price > 0;
  const delivery =
    pkg.deliveryTimeLabel ||
    (pkg.deliveryTimeValue && pkg.deliveryTimeUnit
      ? `${pkg.deliveryTimeValue} ${pkg.deliveryTimeUnit}`
      : null);

  return (
    <article className="flex h-full flex-col card card-glow card-hover p-5">
      <p className="eyebrow text-red">{serviceName ?? pkg.name}</p>
      <h3 className="text-display mt-2 text-xl sm:text-2xl text-white">{pkg.name}</h3>
      {pkg.tagline ? <p className="mt-1.5 text-xs text-fog">{pkg.tagline}</p> : null}

      <p className="mt-4 font-display text-2xl sm:text-3xl">
        {hasPrice ? (
          <>
            ₹{pkg.price!.toLocaleString("en-IN")}
            {pkg.startingPrice ? (
              <span className="ml-2 align-middle font-sans text-[0.5rem] font-normal uppercase tracking-[0.1em] text-fog">
                starting from
              </span>
            ) : null}
          </>
        ) : (
          <span className="font-sans text-xs font-normal normal-case tracking-normal text-fog">
            Pricing on request
          </span>
        )}
      </p>

      <dl className="mt-4 space-y-2 text-xs">
        {pkg.coverageDurationValue ? (
          <Fact k="Coverage" v={`${pkg.coverageDurationValue} ${pkg.coverageDurationUnit ?? ""}`.trim()} />
        ) : null}
        {typeof pkg.numReels === "number" ? <Fact k="Reels" v={String(pkg.numReels)} /> : null}
        {typeof pkg.photos === "number" ? <Fact k="Photos" v={String(pkg.photos)} /> : null}
        {delivery ? <Fact k="Turnaround" v={delivery} /> : null}
        {pkg.format ? <Fact k="Format" v={pkg.format} /> : null}
        {typeof pkg.revisionsAllowed === "number" && pkg.revisionsAllowed > 0 ? (
          <Fact k="Revisions" v={String(pkg.revisionsAllowed)} />
        ) : null}
        <Fact k="Availability" v={availabilityNote(pkg) ?? "—"} />
      </dl>

      {pkg.whatsIncluded.length > 0 ? (
        <div className="mt-4 border-t border-border pt-4">
          <p className="eyebrow text-fog/50">What&apos;s included</p>
          <ul className="mt-2 space-y-1.5 text-xs text-fog">
            {pkg.whatsIncluded.map((f) => (
              <li key={f} className="flex gap-1.5">
                <span aria-hidden="true" className="text-red/50">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {pkg.whatsNotIncluded.length > 0 ? (
        <div className="mt-3">
          <p className="eyebrow text-fog/30">What&apos;s not included</p>
          <ul className="mt-1.5 space-y-1 text-[0.65rem] text-fog/40">
            {pkg.whatsNotIncluded.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <WhatsAppCta
          action={pkg.ctaAction}
          label={pkg.ctaLabel}
          serviceName={pkg.name}
          serviceSlug={serviceSlug}
          content={content}
          fullWidth
        />
      </div>
    </article>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
      <dt className="uppercase tracking-[0.1em] text-fog/50 text-[0.55rem]">{k}</dt>
      <dd className="text-right font-semibold text-fog">{v}</dd>
    </div>
  );
}
