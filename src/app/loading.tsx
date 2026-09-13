import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center py-24">
      <div className="relative flex flex-col items-center">
        {/* Glowing breathing aperture */}
        <div className="relative size-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-red/30 animate-ping opacity-25" />
          <div className="absolute inset-1 rounded-full border border-white/10" />
          <div className="size-4 rounded-full bg-red animate-pulse shadow-lg shadow-red/50" />
        </div>

        {/* HUD Loading Status */}
        <div className="mt-8 flex items-center gap-2.5 bg-black/40 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full">
          <span className="size-1.5 rounded-full bg-red animate-pulse" />
          <span className="font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/80">
            CONNECTING · JASHOOTS LIVE
          </span>
        </div>
      </div>
    </Container>
  );
}
