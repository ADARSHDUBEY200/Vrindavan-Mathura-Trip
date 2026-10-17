import Link from "next/link";
import { Yatra_One } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { HeroSlider, type HeroSlideData } from "@/components/home/HeroSlider";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { photos } from "@/content/images";
import { hero, heroSlides } from "@/content/home";
import { whatsappLink } from "@/lib/whatsapp";

/** Devanagari display face for the decorative "राधे राधे" accent only. */
const devanagari = Yatra_One({ subsets: ["devanagari"], weight: "400", display: "swap", preload: false });

/**
 * Seamless wave across 2880 units (two 1440-unit periods), so shifting it by 50% loops perfectly.
 * `base` is the resting height (0 = top, 120 = bottom), `amp` the wave height, `phase` an x offset.
 */
function WAVE(base: number, amp: number, phase = 0): string {
  const pts: string[] = [];
  for (let x = 0; x <= 2880; x += 24) {
    const y = base + amp * Math.sin((2 * Math.PI * (x + phase)) / 1440);
    pts.push(`${x} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")} L2880 120 L0 120 Z`;
}

export function Hero() {
  const wa = whatsappLink();
  const slides: HeroSlideData[] = heroSlides.map((sl) => {
    const ph = photos[sl.image];
    return { image: ph.src, alt: ph.alt, eyebrow: sl.eyebrow, title: sl.title, text: sl.text, cta: sl.cta };
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white pb-28 pt-24 sm:pb-36 sm:pt-28 lg:pb-40 lg:pt-32">
      {/* Background: dot grid + bright rising-sun disc with rings behind the carousel */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fdba74_1px,transparent_1.2px)] bg-[length:24px_24px] opacity-50 mask-[radial-gradient(70%_60%_at_20%_30%,black,transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-36 top-16 size-[24rem] sm:size-[30rem] lg:-right-32 lg:top-20 lg:size-[40rem]" aria-hidden="true">
        <div className="sun-rings absolute -inset-16 rounded-full border border-orange-200" />
        <div className="sun-rings absolute -inset-8 rounded-full border border-orange-300/70 [animation-delay:-3s]" />
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 shadow-[0_0_120px_20px_rgb(249_115_22/0.35)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.35),transparent_55%)]" />
      </div>

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,31rem)]">
        {/* Copy (left on laptop, below the carousel on phones) */}
        <div className="text-center lg:text-left">
          <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-orange-50 py-1 pl-1 pr-4 text-xs font-medium text-ember-deep sm:text-sm">
            <span className={`${devanagari.className} rounded-full bg-orange-600 px-2.5 pb-0.5 pt-1 text-sm leading-none text-white`} lang="hi">
              राधे राधे
            </span>
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display-1 hero-in hero-in-1 mx-auto mt-6 max-w-2xl font-extrabold text-ink lg:mx-0">
            {hero.titleBefore}{" "}
            <span className="sticker sticker-solid">{hero.highlight[0]}</span> <span className="text-orange-500">&amp;</span>{" "}
            <span className="sticker sticker-outline">{hero.highlight[1]}</span>
          </h1>

          <p className="lede hero-in hero-in-2 mx-auto mt-6 max-w-lg lg:mx-0">{hero.intro}</p>

          <div className="hero-in hero-in-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/tour-packages" className="btn btn-primary">
              Explore Tour Packages
              <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
            </Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsappIcon size={18} />
                Enquire on WhatsApp
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            ) : (
              <Link href="/contact" className="btn btn-outline">
                Plan a custom trip
              </Link>
            )}
          </div>

          <dl className="hero-in hero-in-4 mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-orange-100 rounded-2xl border border-orange-100 bg-white/80 py-3.5 shadow-soft backdrop-blur lg:mx-0">
            {hero.stats.map((st) => (
              <div key={st.label} className="px-2 text-center sm:px-4">
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="block whitespace-nowrap text-lg font-extrabold leading-tight text-orange-600 sm:text-2xl">{st.value}</span>
                  <span className="mt-1 block text-[0.68rem] leading-snug text-stone sm:text-xs">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Card carousel (right on laptop, first on phones) */}
        <div className="hero-in order-first min-w-0 lg:order-none">
          <HeroSlider slides={slides} />
        </div>
      </div>

      {/* Layered waves: two soft orange ribbons behind a white front wave that flows into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 overflow-hidden sm:h-28 lg:h-32" aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave-drift wave-slow absolute bottom-0 left-0 h-full w-[200%] text-orange-300/60">
          <path d={WAVE(48, 22)} fill="currentColor" />
        </svg>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave-drift wave-mid absolute bottom-0 left-0 h-full w-[200%] text-orange-100">
          <path d={WAVE(66, 18, 360)} fill="currentColor" />
        </svg>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave-drift wave-fast absolute bottom-0 left-0 h-full w-[200%] text-white">
          <path d={WAVE(84, 14, 720)} fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
