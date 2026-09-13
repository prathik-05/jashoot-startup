// Brush / scribble graphic primitives — JASHOOTS visual language.
// Hand-drawn energy, single accent color. Pure inline SVG, no image deps.

export function Scribble({ className = "", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 220 24"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke={stroke}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16 C 40 4, 70 4, 96 12 S 150 22, 180 10 S 212 6, 216 8" />
    </svg>
  );
}

export function Splat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className} fill="currentColor">
      <path d="M60 0 C 64 20, 56 28, 72 36 C 88 26, 100 34, 96 48 C 112 52, 112 68, 96 72 C 100 86, 88 94, 72 84 C 56 92, 48 84, 60 64 C 44 60, 32 52, 40 36 C 28 32, 40 16, 56 24 C 60 8, 56 8, 60 0 Z" />
    </svg>
  );
}

export function ReelFrame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="4">
      <circle cx="32" cy="32" r="20" />
      <path d="M26 26 L42 32 L26 38 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 L20 12 M13 5 L20 12 L13 19" />
    </svg>
  );
}