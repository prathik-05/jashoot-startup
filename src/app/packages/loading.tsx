import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function PackagesLoading() {
  return (
    <Container className="pt-14 pb-20">
      <Skeleton className="h-3 w-20 rounded-md" />
      <Skeleton className="mt-2 h-10 w-52 rounded-lg" />
      <Skeleton className="mt-4 h-4 w-96 rounded-md" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card card-glow p-6 space-y-4">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-md" />
            <div className="space-y-2 pt-4 border-t border-white/10">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
              <Skeleton className="h-3 w-4/6 rounded" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl pt-2" />
          </div>
        ))}
      </div>
    </Container>
  );
}
