import type { ReactNode } from "react";
import { Container } from "./container";

export function Section({
  id,
  children,
  className = "",
  tone = "canvas",
  bleed = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "surface" | "panel";
  bleed?: boolean;
}) {
  const bg = tone === "panel" ? "bg-panel" : tone === "surface" ? "bg-surface" : "bg-canvas";
  return (
    <section
      id={id}
      className={`${bg} ${bleed ? "" : "py-12 sm:py-16 lg:py-20"} ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCx = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 ${alignCx} ${className}`}>
      {eyebrow ? (
        <span className="eyebrow">{eyebrow}</span>
      ) : null}
      {title ? <h2 className="text-display text-2xl sm:text-4xl lg:text-5xl text-white">{title}</h2> : null}
      {sub ? <p className="max-w-lg text-sm text-fog">{sub}</p> : null}
    </div>
  );
}
