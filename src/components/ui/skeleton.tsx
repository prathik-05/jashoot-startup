export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-surface rounded-xl ${className}`}
      aria-hidden="true"
    />
  );
}

export function ReelCardSkeleton() {
  return (
    <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-surface">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="mt-3 h-8 w-56 rounded-lg" />
        <Skeleton className="mt-1.5 h-3 w-80 rounded-md" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ReelCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
