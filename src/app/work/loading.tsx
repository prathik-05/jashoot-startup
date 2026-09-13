import { Container } from "@/components/ui/container";
import { Skeleton, ReelCardSkeleton } from "@/components/ui/skeleton";

export default function WorkLoading() {
  return (
    <>
      <Container className="pt-14">
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="mt-3 h-10 w-64 rounded-lg" />
        <Skeleton className="mt-4 h-4 w-96 rounded-md" />
      </Container>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ReelCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
