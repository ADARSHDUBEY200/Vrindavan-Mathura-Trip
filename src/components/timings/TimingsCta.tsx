import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { TempleLineArt } from "./TempleLineArt";

const promises = [
  "We check the day’s darshan timings before you set out",
  "Your route is planned around the midday closures",
  "Private car, local Braj know-how and WhatsApp support",
];

/** Closing call to action in the hero's palette, so the page opens and closes on the same note. */
export function TimingsCta() {
  return (
    <section aria-labelledby="timings-cta-title" className="bg-white pb-16 pt-4 sm:pb-20 lg:pb-24">
      <div className="container-x">
        <div className="tt-hero reveal-zoom relative isolate overflow-hidden rounded-3xl px-6 py-10 shadow-lift sm:px-10 sm:py-12 lg:rounded-[1.75rem] lg:px-14 lg:py-14">
          <TempleLineArt gid="cta-art" className="pointer-events-none absolute -bottom-12 -right-20 -z-10 w-[24rem] text-orange-100/10 sm:w-[28rem] lg:-bottom-16 lg:-right-24 lg:w-[30rem]" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/10 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-orange-200">
                Free trip planning · Radhe Radhe
              </p>
              <h2 id="timings-cta-title" className="mt-5 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.25rem] lg:text-[2.6rem]">
                Let us time your <span className="text-orange-400">darshan</span>
              </h2>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/80">
                Tell us your dates and the temples you long to see. We’ll plan a calm day around the current timings, so you spend it in darshan, not in queues or in front of closed doors.
              </p>
              <ul className="reveal-stagger mt-7 grid gap-3">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-white/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/40">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-orange-200/90">Talk to a local planner</p>
              <EnquiryButtons
                light
                message="Radhe Radhe! I’d like help planning my darshan around the temple timings."
                className="mt-4 flex-col items-stretch sm:flex-row sm:items-center lg:flex-col lg:items-stretch"
              />
              <Link href="/contact" className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/35 underline-offset-[6px] transition-colors hover:decoration-white">
                Prefer a form? Send your trip details
                <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
