export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[2rem] sm:text-[2.5rem]"
      : size === "sm"
      ? "text-[1.25rem]"
      : "text-[1.55rem]";

  return (
    <div className={`inline-flex flex-col select-none ${className}`} aria-label="JASHOOTS">
      <span className={`font-display ${sizeClass} font-extrabold leading-none tracking-[-0.08em] text-[#f0ebdc]`}>
        JA<span className="text-[#E63838]">S</span>HOOTS
      </span>
    </div>
  );
}

