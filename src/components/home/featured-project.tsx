import type { PortfolioProject, Service, ServiceCategory } from "@/lib/schema";
import Image from "next/image";
import { Section, SectionHead } from "../ui/section";
import { ButtonLink } from "../ui/button";
import { WhatsAppCta } from "../ui/whatsapp-cta";
import { PendingContent } from "../ui/empty-state";

export function FeaturedProject({
  project,
  category,
  service,
}: {
  project: PortfolioProject | null;
  category?: ServiceCategory | null;
  service?: Service | null;
}) {
  if (!project) {
    return (
      <Section id="featured-project">
        <SectionHead title="Featured project" />
        <div className="mt-6">
          <PendingContent
            title="Featured case study coming soon"
            sub="A full case study — reel, story, result — will be pinned here from the Work CMS."
            content="featured-project-empty"
          />
        </div>
      </Section>
    );
  }

  const media = project.fullReel ?? project.previewReel ?? project.coverMedia;
  const stats = [...project.engagementStats, ...project.results].slice(0, 4);

  return (
    <Section id="featured-project" tone="surface" className="overflow-hidden">
      <SectionHead eyebrow={category?.name ?? "Featured"} title={project.title} />

      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        {/* Image */}
        <div className="relative aspect-[9/16] max-h-[400px] w-full overflow-hidden rounded-2xl bg-canvas sm:aspect-video md:aspect-auto border border-border">
          {media ? (
            <Image
              src={media}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full min-h-[240px] place-items-center bg-panel p-6 text-center">
              <div>
                <p className="text-heading text-base text-ash">{project.title}</p>
                <p className="mt-1 text-[0.5rem] uppercase tracking-[0.1em] text-fog/40">Full reel attaching soon</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <p className="text-[0.5rem] uppercase tracking-[0.1em] text-fog/50">
              {[project.location, project.projectYear ? String(project.projectYear) : null].filter(Boolean).join(" · ")}
            </p>
            {project.deliveryTimeLabel && (
              <span className="bg-red px-2 py-0.5 text-[0.45rem] font-bold uppercase tracking-[0.1em] text-white rounded-md">
                {project.deliveryTimeLabel}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
              {stats.map((s) => (
                <div key={s.label + s.value} className="bg-surface p-3">
                  <dt className="text-[0.5rem] uppercase tracking-[0.1em] text-fog/50">{s.label}</dt>
                  <dd className="text-display mt-0.5 text-xl text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.story && (
            <div className="mt-4">
              <p className="eyebrow text-red/70">The moment</p>
              <p className="mt-1 text-xs text-fog leading-relaxed">{project.story}</p>
            </div>
          )}

          {project.whatWeDid.length > 0 && (
            <div className="mt-4">
              <p className="eyebrow text-red/70">What we did</p>
              <ul className="mt-1 space-y-1 text-xs text-fog">
                {project.whatWeDid.map((w) => (
                  <li key={w} className="flex gap-1.5">
                    <span aria-hidden="true" className="text-red/40">▸</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <WhatsAppCta
              label="Book a similar shoot"
              serviceName={service?.name ?? project.title}
              serviceSlug={service?.slug}
              content={`featured-project:${project.slug}`}
              variant="solid"
            />
            <ButtonLink href={`/work/${project.slug}`} variant="outline">
              Watch full reel
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
