"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow text-red mb-4">
        <span className="mr-2 inline-block h-px w-8 align-middle bg-red/40" />
        SOMETHING WENT WRONG
      </p>
      <h1 className="text-display text-4xl sm:text-5xl text-white">Error</h1>
      <p className="mt-4 max-w-md text-xs text-fog">
        An unexpected error occurred. Please try again or contact us on WhatsApp if the problem
        persists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 bg-red px-6 py-3 font-display text-[0.65rem] uppercase tracking-[0.06em] text-white rounded-lg transition hover:brightness-110"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="outline" size="md">
          Go home
        </ButtonLink>
      </div>
    </Container>
  );
}
