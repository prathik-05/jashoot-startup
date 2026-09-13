import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ReelFrame } from "@/components/brand/scribble";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <ReelFrame className="h-14 w-14 text-red" />
      <p className="eyebrow text-red mt-5 mb-3">
        <span className="mr-2 inline-block h-px w-8 align-middle bg-red/40" />
        404
      </p>
      <h1 className="text-display text-3xl sm:text-5xl text-white">Page Not Found</h1>
      <p className="mt-3 max-w-md text-xs text-fog">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="solid" size="md">
          Go home
        </ButtonLink>
        <ButtonLink href="/work" variant="outline" size="md">
          See our work
        </ButtonLink>
      </div>
    </Container>
  );
}
