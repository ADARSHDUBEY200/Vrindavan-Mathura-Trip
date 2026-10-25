import type { CSSProperties } from "react";
import { BellRing, ChevronDown, CircleAlert, Clock, Landmark, MapPin, Sun } from "lucide-react";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Crumb } from "@/lib/schema";
import { TempleLineArt } from "./TempleLineArt";
import { VerifyFlag } from "./Timetable";

type Props = {
  crumbs: Crumb[];
  templeCount: number;
  regionCount: number;
  compiled: { iso: string; label: string };
  /** WhatsApp (or contact page) link for confirming the day's timings. */
  confirmHref: string;
};

/** The temple day around the drawing. Each time is a real slot from the timetables below. */
/** Laid out as the sun's path over the temple: dawn on the left, night on the right. */
const dayPills = [
  { label: "Mangla", time: "5:00 am", pos: "top-[52%] right-[71%]" },
  { label: "Shringar", time: "8:00 am", pos: "top-[38%] right-[62%]" },
  { label: "Rajbhog", time: "12:00 noon", pos: "top-[27%] right-[44%]" },
  { label: "Utthapan", time: "4:00 pm", pos: "top-[27%] right-[17%]" },
  { label: "Sandhya", time: "6:30 pm", pos: "top-[38%] right-[5%]" },
  { label: "Shayan", time: "9:00 pm", pos: "top-[52%] right-[3%]" },
];

/**
 * Full-width rust-and-maroon hero: headline, stats and actions on the left; a gold line drawing of a
 * Braj temple on the right, ringed by the aarti times of a temple day. Image-free and static.
 */
export function TimingsHero({ crumbs, templeCount, regionCount, compiled, confirmHref }: Props) {
  const external = confirmHref.startsWith("http");
  const stats = [
    { Icon: Landmark, value: `${templeCount}`, label: "Temples & ghats" },
    { Icon: Sun, value: "2", label: "Seasonal schedules" },
    { Icon: MapPin, value: `${regionCount}`, label: "Regions of Braj" },
  ];

  return (
    <section aria-labelledby="page-title" className="tt-hero relative isolate overflow-hidden pb-14 pt-26 text-white sm:pb-16 sm:pt-30 lg:pb-20 lg:pt-32">
      {/* Temple drawing and the day's aarti times */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full xl:w-[44%]" aria-hidden="true">
        <TempleLineArt className="tt-art-in absolute -bottom-6 left-1/2 w-[30rem] -translate-x-1/2 text-orange-100/10 sm:w-[36rem] xl:bottom-0 xl:left-auto xl:right-[5%] xl:w-[34rem] xl:translate-x-0 xl:text-orange-100/45" />
        {dayPills.map((p, i) => (
          <span key={p.label} style={{ "--i": i } as CSSProperties} className={`tt-pill absolute hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 shadow-[0_8px_20px_-12px_rgb(0_0_0/0.6)] backdrop-blur-sm xl:inline-flex ${p.pos}`}>
            <Clock size={12} className="text-orange-300" />
            <span className="text-white/60">{p.label}</span>
            <span className="tabular-nums">{p.time}</span>
          </span>
        ))}
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left xl:max-w-[46rem]">
          <div className="hero-in flex justify-center sm:justify-start">
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Breadcrumbs items={crumbs} light />
            </div>
          </div>

          <p className="hero-in hero-in-1 mt-6 inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/10 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-orange-200">
            <BellRing size={13} aria-hidden="true" />
            Complete temple guide · {compiled.iso.slice(0, 4)}
          </p>

          <h1 id="page-title" className="hero-in hero-in-2 mt-5 text-[2.15rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.9rem] lg:text-[3.4rem]">
            Mathura Vrindavan
            <span className="block">
              <span className="text-orange-400">Temple Timings</span> <em className="font-semibold text-orange-100">{compiled.iso.slice(0, 4)}</em>
            </span>
          </h1>
          <span className="tt-underline mx-auto mt-5 block h-[3px] w-28 rounded-full bg-linear-to-r from-orange-500 via-amber-400 to-amber-200/0 sm:mx-0 sm:w-full sm:max-w-[34rem]" aria-hidden="true" />

          <p lang="hi" className="hi hero-in hero-in-3 mt-4 text-lg text-orange-100/80">
            मथुरा वृन्दावन मंदिर दर्शन समय
          </p>
          <p className="hero-in hero-in-3 mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/80 sm:mx-0 sm:text-base">
            Most temples open between 5:00 and 9:00 am, close for the afternoon around noon, reopen between 3:00 and 6:30 pm, and stay open until about 8:00–9:30 pm. Summer hours start earlier and end later than winter. Every temple’s darshan and aarti times are below.
          </p>

          <dl className="hero-in hero-in-4 mt-8 grid grid-cols-3 gap-3 sm:flex sm:gap-0">
            {stats.map(({ Icon, value, label }, i) => (
              <div key={label} className={`flex flex-col items-center gap-2 sm:flex-row sm:gap-3 sm:px-6 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-white/15"}`}>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/35">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="flex flex-col-reverse text-center sm:text-left">
                  <dt className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/60">{label}</dt>
                  <dd className="text-lg font-bold leading-none tabular-nums text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="hero-in hero-in-4 mt-9 flex flex-wrap justify-center gap-3 sm:justify-start">
            <a href={confirmHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="btn btn-primary">
              {external && <WhatsappIcon size={18} />}
              Get today’s timings on WhatsApp
              {external && <span className="sr-only"> (opens WhatsApp)</span>}
            </a>
            <a href="#timetables" className="btn btn-outline-light">
              View all timings <ChevronDown size={17} aria-hidden="true" />
            </a>
            <a href="#aarti-schedules" className="btn btn-outline-light">
              <Clock size={16} aria-hidden="true" /> Aarti schedules
            </a>
          </div>

          <p className="hero-in hero-in-4 mx-auto mt-7 flex max-w-xl items-start justify-center gap-2 text-[0.8125rem] leading-relaxed text-white/65 sm:mx-0 sm:justify-start">
            <CircleAlert size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-300" />
            <span className="text-left">
              Timings change with seasons and festivals; each temple switches on its own date. Rows marked <VerifyFlag /> need confirming. Compiled <time dateTime={compiled.iso}>{compiled.label}</time>.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
