import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudioLoading() {
  return (
    <Container className="py-14 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Skeleton className="h-3 w-28 rounded" />
          <Skeleton className="mt-3 h-8 w-60 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card card-glow p-4 space-y-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-2.5 w-32 rounded" />
          </div>
        ))}
      </div>

      <div className="mt-8 card card-glow p-5 space-y-3">
        <Skeleton className="h-3 w-36 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    </Container>
  );
}
