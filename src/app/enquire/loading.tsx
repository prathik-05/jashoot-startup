import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function EnquireLoading() {
  return (
    <Container className="py-10 sm:py-14 max-w-2xl">
      <Skeleton className="h-8 w-28 rounded-full mb-6" />
      <Skeleton className="h-4 w-32 rounded-md mb-2" />
      <Skeleton className="h-9 w-64 rounded-lg mb-3" />
      <Skeleton className="h-4 w-80 rounded-md mb-8" />

      <div className="card card-glow p-6 sm:p-8 space-y-6">
        <Skeleton className="h-5 w-40 rounded" />
        <div className="space-y-4">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl mt-6" />
      </div>
    </Container>
  );
}
