"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PortfolioProject, ServiceCategory } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";
import { ButtonLink } from "../ui/button";
import { trackEvent } from "@/lib/track";

const GRADIENTS = [
  "from-red/20 to-canvas",
  "from-[#1a0a0f] to-canvas",
  "from-[#0a0f1a] to-canvas",
  "from-[#0f1a0a] to-canvas",
];

function gradientFor(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return GRADIENTS[h % GRADIENTS.length];
}

type Option = "a" | "b" | "c";

export function WorkWall({
  projects,
  categories,
  settings,
  preview = false,
}: {
  projects: PortfolioProject[];
  categories: ServiceCategory[];
  settings: { headline?: string; kicker?: string };
  preview?: boolean;
}) {
  const [filter, setFilter] = useState<string>("all");
  const [option, setOption] = useState<Option>("a");

  const catById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );

  const filterCats = useMemo(
    () => categories.filter((c) => c.published && ["events", "weddings", "bike", "car", "business", "brands", "food"].includes(c.slug)),
    [categories],
  );

  const visible = useMemo(
    () =>
      (filter === "all"
        ? projects
        : projects.filter((p) => p.categoryId === filter)
      ).slice(0, preview ? 6 : projects.length),
    [projects, filter, preview],
  );

  const getCatName = (p: PortfolioProject) =>
    p.categoryId ? catById.get(p.categoryId)?.name : undefined;

  return (
    <Section id="work">
      <SectionHead
        eyebrow={settings.kicker ?? "Real moments. Real Jashoots."}
        title={settings.headline ?? "The Work"}
      />

      {/* Layout toggle */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-1.5" role="tablist" aria-label="Filter work">
          <FilterTab active={filter === "all"} label="All" onClick={() => setFilter("all")} />
          {filterCats.map((c) => (
            <FilterTab
              key={c.id}
              active={filter === c.id}
              label={c.name}
              onClick={() => setFilter(c.id)}
            />
          ))}
        </div>
        <span className="h-4 w-px bg-white/[0.08]" />
        <div className="flex gap-1">
          {(["a", "b", "c"] as Option[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setOption(opt)}
              className={`px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.15em] transition-colors ${
                option === opt
                  ? "text-red"
                  : "text-white/20 hover:text-white/40"
              }`}
            >
              {opt === "a" ? "Editorial" : opt === "b" ? "Cinematic" : "Clean"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-8 border border-dashed border-white/[0.08] bg-white/[0.01] p-8 text-center text-white/20">
          No published work in this lane yet — the Studio adds reels from the Work CMS.
        </p>
      ) : option === "a" ? (
        <OptionA projects={visible} getCatName={getCatName} content={preview ? "home-work-wall" : "work-page-wall"} />
      ) : option === "b" ? (
        <OptionB projects={visible} getCatName={getCatName} content={preview ? "home-work-wall" : "work-page-wall"} />
      ) : (
        <OptionC projects={visible} getCatName={getCatName} content={preview ? "home-work-wall" : "work-page-wall"} />
      )}

      {/* CTA */}
      {preview ? (
        <div className="mt-8">
          <ButtonLink href="/work" variant="ghost">
            Explore all work
          </ButtonLink>
        </div>
      ) : (
        <p className="mt-8 text-[0.65rem] text-white/20">
          Like what you see?{" "}
          <Link href="/enquire" className="font-bold text-red/70 transition-colors hover:text-red">
            Book a similar shoot →
          </Link>
        </p>
      )}
    </Section>
  );
}

/* ── OPTION A: Editorial Magazine ───────────────────────────────────────
   Asymmetric 3-col grid. First card spans 2 rows. Bold type. No borders. */

function OptionA({
  projects,
  getCatName,
  content,
}: {
  projects: PortfolioProject[];
  getCatName: (p: PortfolioProject) => string | undefined;
  content: string;
}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      {/* Hero card — tall */}
      {projects[0] && (
        <CardA project={projects[0]} catName={getCatName(projects[0])} content={content} tall />
      )}
      {/* Standard cards */}
      {projects.slice(1).map((p) => (
        <CardA key={p.id} project={p} catName={getCatName(p)} content={content} />
      ))}
    </div>
  );
}

function CardA({
  project,
  catName,
  content,
  tall = false,
}: {
  project: PortfolioProject;
  catName?: string;
  content: string;
  tall?: boolean;
}) {
  const media = project.previewReel ?? project.coverMedia;
  return (
    <article className={`group relative overflow-hidden bg-surface ${tall ? "row-span-2" : ""}`}>
      <div className={`relative w-full ${tall ? "aspect-[9/16]" : "aspect-[9/16]"}`}>
        {media ? (
          <Image
            src={media}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b ${gradientFor(project.slug)} opacity-40`} />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category */}
        {catName && (
          <div className="absolute left-4 top-4 z-10">
            <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-red/80">
              {catName}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <h3 className="text-display text-xl font-bold uppercase text-white transition-colors duration-300 group-hover:text-red sm:text-2xl">
            {project.title}
          </h3>
          {project.location && (
            <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              {project.location}
              {project.projectYear ? ` · ${project.projectYear}` : ""}
            </p>
          )}

          {/* Hover reveal CTA */}
          <div className="mt-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 bg-red px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:brightness-110"
              onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
            >
              Watch reel
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── OPTION B: Cinematic Showcase ──────────────────────────────────────
   1 large hero + 5 small. Film-strip feel. Red accent bar. Vignette.    */

function OptionB({
  projects,
  getCatName,
  content,
}: {
  projects: PortfolioProject[];
  getCatName: (p: PortfolioProject) => string | undefined;
  content: string;
}) {
  const hero = projects[0];
  const rest = projects.slice(1);

  return (
    <div className="mt-8">
      {/* Hero row */}
      {hero && (
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <article className="group relative aspect-video overflow-hidden bg-canvas">
            {hero.previewReel || hero.coverMedia ? (
              <Image
                src={hero.previewReel ?? hero.coverMedia!}
                alt={hero.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientFor(hero.slug)} opacity-30`} />
            )}

            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)"
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Red accent bar */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-red transition-all duration-500 group-hover:w-full" />

            {getCatName(hero) && (
              <div className="absolute left-5 top-5 z-10">
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-red">
                  {getCatName(hero)}
                </span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 p-6">
              <h3 className="text-display text-3xl font-bold uppercase text-white sm:text-4xl">
                {hero.title}
              </h3>
              {hero.location && (
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
                  {hero.location}{hero.projectYear ? ` · ${hero.projectYear}` : ""}
                </p>
              )}
              <div className="mt-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <Link
                  href={`/work/${hero.slug}`}
                  className="inline-flex items-center gap-2 bg-red px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white"
                  onClick={() => trackEvent("work_opened", { content, meta: { project: hero.slug } })}
                >
                  Watch reel
                </Link>
              </div>
            </div>
          </article>

          {/* Side column */}
          {rest.length > 0 && (
            <div className="grid gap-4 grid-rows-2">
              {rest.slice(0, 2).map((p) => (
                <CardB key={p.id} project={p} catName={getCatName(p)} content={content} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom row */}
      {rest.length > 2 && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {rest.slice(2).map((p) => (
            <CardB key={p.id} project={p} catName={getCatName(p)} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}

function CardB({
  project,
  catName,
  content,
}: {
  project: PortfolioProject;
  catName?: string;
  content: string;
}) {
  const media = project.previewReel ?? project.coverMedia;
  return (
    <article className="group relative aspect-[9/16] overflow-hidden bg-canvas">
      {media ? (
        <Image
          src={media}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${gradientFor(project.slug)} opacity-30`} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full" />

      {catName && (
        <div className="absolute left-3 top-3 z-10">
          <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-red/70">{catName}</span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <h3 className="text-display text-sm font-bold uppercase text-white group-hover:text-red">
          {project.title}
        </h3>
        <div className="mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Link
            href={`/work/${project.slug}`}
            className="text-[0.55rem] font-bold uppercase tracking-[0.15em] text-red"
            onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
          >
            Watch reel →
          </Link>
        </div>
      </div>

      <Link
        href={`/work/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 z-20"
        onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
      />
    </article>
  );
}

/* ── OPTION C: Clean Breathing Grid ───────────────────────────────────
   Uniform 3x2. Generous padding. Subtle depth. Minimal.               */

function OptionC({
  projects,
  getCatName,
  content,
}: {
  projects: PortfolioProject[];
  getCatName: (p: PortfolioProject) => string | undefined;
  content: string;
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <CardC key={p.id} project={p} catName={getCatName(p)} content={content} />
      ))}
    </div>
  );
}

function CardC({
  project,
  catName,
  content,
}: {
  project: PortfolioProject;
  catName?: string;
  content: string;
}) {
  const media = project.previewReel ?? project.coverMedia;
  return (
    <article className="group relative overflow-hidden bg-surface">
      <div className="relative aspect-[9/16]">
        {media ? (
          <Image
            src={media}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b ${gradientFor(project.slug)} opacity-30`} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {catName && (
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.2em] text-red/70 backdrop-blur-sm">
              {catName}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <h3 className="text-display text-lg font-bold uppercase text-white transition-colors duration-300 group-hover:text-red">
            {project.title}
          </h3>
          {project.location && (
            <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-white/25">
              {project.location}{project.projectYear ? ` · ${project.projectYear}` : ""}
            </p>
          )}

          <div className="mt-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 border border-white/[0.15] px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-canvas"
              onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
            >
              Watch reel
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Shared ──────────────────────────────────────────────────────────── */

function FilterTab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
        active
          ? "bg-red text-white"
          : "border border-white/[0.06] text-white/40 hover:border-white/[0.15] hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );
}
