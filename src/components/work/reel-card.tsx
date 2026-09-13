"use client";

import Link from "next/link";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/schema";
import { ReelFrame } from "../brand/scribble";
import { ButtonLink } from "../ui/button";
import { trackEvent } from "@/lib/track";

const TILE_GRADIENTS = [
  "from-red to-red/80",
  "from-surface-elevated to-canvas",
  "from-[#1a0a0f] to-canvas",
  "from-[#12080a] to-canvas",
];

function gradientFor(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return TILE_GRADIENTS[h % TILE_GRADIENTS.length];
}

export function ReelCard({
  project,
  categoryName,
  content,
}: {
  project: PortfolioProject;
  categoryName?: string;
  content: string;
}) {
  const media = project.previewReel ?? project.coverMedia;
  const stats = project.engagementStats.slice(0, 2);
  return (
    <article className="group relative aspect-[9/16] overflow-hidden bg-canvas">
      {/* Flat border — hairline only */}
      <div className="absolute inset-0 border border-white/[0.06] transition-colors duration-500 group-hover:border-red/30 z-[1]" />

      {media ? (
        <Image
          src={media}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-b ${gradientFor(project.slug)} opacity-60 transition-opacity duration-500 group-hover:opacity-80`}
        />
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-[2]" />

      {/* Category tag — flat pill */}
      <div className="absolute left-3 top-3 z-[3]">
        {categoryName ? (
          <span className="rounded-full bg-black/70 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm transition-colors duration-300 group-hover:text-red/80">
            {categoryName}
          </span>
        ) : null}
      </div>

      {/* Reel icon — flat */}
      <div className="absolute right-3 top-3 z-[3] grid h-6 w-6 place-items-center rounded-full border border-white/[0.08] bg-black/50 transition-colors duration-300 group-hover:border-red/30">
        <ReelFrame className="h-3 w-3 text-white/40 transition-colors duration-300 group-hover:text-red/60" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-[3] p-3">
        <h3 className="font-display text-xs uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-red">
          {project.title}
        </h3>
        {project.location ? (
          <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-white/40">
            {project.location}
            {project.projectYear ? ` · ${project.projectYear}` : ""}
          </p>
        ) : null}
        {stats.length > 0 ? (
          <p className="mt-1.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-red/60">
            {stats.map((s) => `${s.value} ${s.label}`).join(" · ")}
          </p>
        ) : null}
        <div className="mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ButtonLink
            href={`/work/${project.slug}`}
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
          >
            Watch reel
          </ButtonLink>
        </div>
      </div>

      <Link
        href={`/work/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 z-[4]"
        onClick={() => trackEvent("work_opened", { content, meta: { project: project.slug } })}
      />
    </article>
  );
}

export function ReelTilePlaceholder({ title }: { title: string }) {
  return (
    <div className="grid aspect-[9/16] place-items-center border border-dashed border-white/[0.08] bg-white/[0.01] p-4 text-center transition-colors duration-300 hover:border-red/20">
      <div>
        <ReelFrame className="mx-auto h-6 w-6 text-white/15" />
        <p className="mt-2 font-display text-[0.6rem] uppercase tracking-widest text-white/20">{title}</p>
        <p className="mt-1 text-[0.5rem] text-white/10">Reel attaching soon</p>
      </div>
    </div>
  );
}
