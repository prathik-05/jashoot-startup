import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "../ui/section";

export function ClientExperience({ settings }: { settings: { headline?: string } }) {
  const steps = [
    ["Review", "Your reels land in the client portal the moment they're ready."],
    ["Approve", "Approve per reel — or ask for a revision with one note."],
    ["Receive", "A private delivery link. Nothing public, ever."],
  ] as const;
  return (
    <Section id="client-experience">
      <SectionHead title={settings.headline ?? "Review → Approve → Receive"} />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {steps.map(([k, v], i) => (
          <div
            key={k}
            className="card card-glow card-hover p-4 animate-fade-up"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <p className="font-mono-brand text-3xl font-bold text-white/15">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="font-display mt-1.5 text-base font-bold uppercase text-[#F0EBDC]">{k}</p>
            <p className="font-sans mt-1.5 text-xs text-[#9E9AA0] leading-relaxed">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-fog">
        Already booked?{" "}
        <Link href="/portal" className="font-bold text-red hover:text-red/80 transition-colors">
          Open the client portal →
        </Link>
      </p>
    </Section>
  );
}

export function AppCta({ settings }: { settings: { headline?: string; sub?: string } }) {
  const steps = ["Book", "Track", "Review", "Approve", "Download"] as const;
  return (
    <Section id="app" tone="surface">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow text-red">Jashoots app</p>
          <h2 className="text-display mt-2 text-3xl sm:text-5xl text-white">
            {settings.headline ?? "Your project. In your pocket."}
          </h2>
          <p className="mt-3 max-w-md text-xs text-fog">
            {settings.sub ?? "Track your shoot. Review your reels. Approve edits. Get your final work."}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {steps.map((s) => (
              <span
                key={s}
                className="border border-border px-2.5 py-1 font-display text-[0.55rem] uppercase tracking-[0.1em] text-fog rounded-lg"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white/20">
            Coming to the stores — the web portal works today
          </p>
        </div>
        <div className="mx-auto w-full max-w-[260px]" aria-hidden="true">
          <div className="rounded-[2.5rem] border-[5px] border-shell bg-shell p-2">
            <div className="rounded-[2rem] bg-canvas p-3.5">
              <Image
                src="/logo-transparent.png"
                alt="JASHOOTS"
                width={80}
                height={22}
                className="h-3.5 w-auto object-contain"
              />
              <div className="mt-2.5 space-y-1.5">
                <div className="h-14 rounded-xl bg-gradient-to-br from-red/20 to-red/5 border border-red/10" />
                <div className="flex gap-1.5">
                  <span className="h-5 flex-1 rounded-lg bg-red/10" />
                  <span className="h-5 flex-1 rounded-lg border border-border" />
                </div>
                <div className="space-y-1 pt-1">
                  {[100, 82, 64].map((w) => (
                    <div key={w} className="h-1.5 rounded bg-border" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
