import Image from "next/image";

export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}) {
  const heightClass =
    size === "lg"
      ? "h-10 sm:h-12"
      : size === "sm"
      ? "h-7"
      : "h-8 md:h-9";

  return (
    <div className={`inline-flex items-center select-none ${className}`} aria-label="JASHOOTS">
      <Image
        src="/logo-transparent.png"
        alt="JASHOOTS"
        width={140}
        height={40}
        className={`${heightClass} w-auto object-contain`}
        priority
      />
    </div>
  );
}

