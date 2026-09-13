import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCachedSiteData } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";
import { TrackPageView } from "@/components/track-page-view";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { ReelFrame } from "@/components/brand/scribble";

export async function generateStaticParams() {
  const data = await getCachedSiteData();
  return data.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCachedSiteData();
  const p = data.projects.find((x) => x.slug === slug);
  if (!p) return { title: "Work — JASHOOTS" };
  const cat = p.categoryId ? data.categories.find((c) => c.id === p.categoryId) : null;
  return {
    title: `${p.title} — JASHOOTS`,
    description: p.story ?? `${p.title}${cat ? ` · ${cat.name}` : ""}${p.location ? ` · ${p.location}` : ""}`,
    alternates: { canonical: `${SITE_URL}/work/${p.slug}` },
    openGraph: p.coverMedia
      ? { images: [{ url: p.coverMedia }], title: p.title, description: p.story ?? undefined }
      : { title: p.title, description: p.story ?? undefined },
  };
}

/**
 * Project case study: title, location, fullscreen reel, stats, THE MOMENT,
 * WHAT WE DID, DELIVERY — ending in BOOK A SIMILAR SHOOT (auto-resolved).
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCachedSiteData();
  const project = data.projects.find((p) => p.slug === slug && p.published);
  if (!project) notFound();

  const category = project.categoryId
    ? data.categories.find((c) => c.id === project.categoryId) ?? null
    : null;
  const service = project.relatedServiceId
    ? data.services.find((s) => s.id === project.relatedServiceId) ?? null
    : null;

  const media = project.fullReel ?? project.previewReel ?? project.coverMedia;
  const stats = [...project.engagementStats, ...project.results].slice(0, 6);

  return (
    <>
      <TrackPageView />
      <Container className="pt-14">
        <p className="eyebrow text-red">
          {category?.name ?? "Work"}
          {project.location ? ` · ${project.location}` : ""}
          {project.projectYear ? ` · ${project.projectYear}` : ""}
        </p>
        <h1 className="text-display mt-2 max-w-4xl text-4xl sm:text-6xl text-white">{project.title}</h1>
      </Container>

      <Container className="mt-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-panel">
          {media ? (
            <Image
              src={media}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-[#E30613] to-[#8B0000] p-8 text-center">
              <div>
                <ReelFrame className="mx-auto h-10 w-10 text-white" />
                <p className="mt-2 font-display text-xs uppercase tracking-[0.1em] text-white/60">
                  Fullscreen reel attaching soon
                </p>
              </div>
            </div>
          )}
        </div>

        {stats.length > 0 ? (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label + s.value} className="card card-glow p-3 text-center">
                <dd className="text-display text-2xl text-white">{s.value}</dd>
                <dt className="mt-1 text-[0.5rem] uppercase tracking-[0.1em] text-fog">{s.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {project.story ? (
            <div>
              <h2 className="text-display text-lg text-white">The moment</h2>
              <p className="mt-2 text-xs text-fog leading-relaxed">{project.story}</p>
            </div>
          ) : null}
          {project.whatWeDid.length > 0 ? (
            <div>
              <h2 className="text-display text-lg text-white">What we did</h2>
              <ul className="mt-2 space-y-1 text-xs text-fog">
                {project.whatWeDid.map((w) => (
                  <li key={w} className="flex gap-1.5">
                    <span aria-hidden="true" className="text-red/50">▸</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {project.deliveryTimeLabel ? (
          <p className="mt-8 border-y border-border py-4 font-display text-sm uppercase tracking-[0.06em] text-white">
            Delivery — reel delivered within{" "}
            <span className="text-red">{project.deliveryTimeLabel}</span>
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 pb-20 sm:flex-row">
          <WhatsAppCta
            label="Book a similar shoot"
            serviceName={service?.name ?? project.title}
            serviceSlug={service?.slug}
            content={`project:${project.slug}`}
            size="lg"
          />
          <ButtonLink href="/work" variant="outline" size="lg">
            Back to work
          </ButtonLink>
        </div>
      </Container>

      {/* shareable structured metadata — escape </script> to prevent XSS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            url: `${SITE_URL}/work/${project.slug}`,
            creator: { "@type": "Organization", name: "JASHOOTS" },
          }).replace(/<\/script>/gi, "<\\/script>"),
        }}
      />
    </>
  );
}