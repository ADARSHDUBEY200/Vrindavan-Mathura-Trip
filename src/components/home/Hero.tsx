import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchOutline, Flute, Lotus, Mandala, Swash } from "@/components/svg/Ornaments";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { photos } from "@/content/images";
import { hero } from "@/content/home";
import { whatsappLink } from "@/lib/whatsapp";

function Highlight({ children }: { children: string }) {
  return (
    <span className="text-highlight">
      {children}
      <Swash />
    </span>
  );
}

/** Circular seal with text on a path and a flute at the centre. */
function Seal({ className = "" }: { className?: string }) {
  return (
    <div className={`grid size-24 place-items-center rounded-full bg-white shadow-lift sm:size-28 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id="seal-circle" d="M80 80 m -60 0 a 60 60 0 1 1 120 0 a 60 60 0 1 1 -120 0" />
        </defs>
        <text className="fill-ember-deep text-[13.4px] font-semibold uppercase" style={{ letterSpacing: "0.22em" }}>
          <textPath href="#seal-circle">Vrindavan • Mathura • Braj Yatra •</textPath>
        </text>
      </svg>
      <div className="grid size-12 place-items-center rounded-full bg-saffron-wash sm:size-14">
        <Flute className="size-9 sm:size-11" />
      </div>
    </div>
  );
}

export function Hero() {
  const wa = whatsappLink();
  const main = photos[hero.image];
  const inset = photos[hero.inset];

  return (
    <section aria-labelledby="hero-title" className="bg-hero relative overflow-hidden pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(55%_65%_at_25%_40%,black,transparent)]" aria-hidden="true" />
      <Mandala className="pointer-events-none absolute -left-48 top-20 hidden size-[26rem] text-orange-500/10 md:block" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <p className="eyebrow hero-in justify-center lg:justify-start">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display-1 hero-in hero-in-1 mx-auto mt-4 max-w-xl lg:mx-0">
            {hero.titleBefore} <Highlight>{hero.highlight[0]}</Highlight> &amp; <Highlight>{hero.highlight[1]}</Highlight>
          </h1>
          <p className="lede hero-in hero-in-2 mx-auto mt-5 max-w-lg lg:mx-0">{hero.intro}</p>

          <div className="hero-in hero-in-3 mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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

          <dl className="hero-in hero-in-4 mx-auto mt-9 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3 lg:mx-0">
            {hero.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/80 bg-white/75 px-2.5 py-3 text-center shadow-soft backdrop-blur sm:px-3.5 lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="text-gradient block text-base font-bold sm:text-xl">{s.value}</span>
                  <span className="mt-0.5 block text-[0.7rem] leading-snug text-stone sm:text-xs">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[25rem]">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-linear-to-r from-orange-500 to-amber-500 opacity-25 blur-3xl" aria-hidden="true" />
          <ArchOutline className="pointer-events-none absolute -right-3 -top-3 h-full w-full text-orange-400/70" />
          <div className="arch relative aspect-[4/5] bg-sand shadow-lift">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 25rem, (min-width: 640px) 22rem, 18rem"
              placeholder="blur"
              className="object-cover"
            />
          </div>

          <figure className="absolute -bottom-6 -left-3 w-24 rounded-2xl border-[3px] border-white bg-white shadow-lift sm:-left-10 sm:w-32">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image src={inset.src} alt={inset.alt} fill sizes="8rem" className="object-cover" placeholder="blur" />
            </div>
            <figcaption className="px-1 pb-1 pt-1.5 text-center text-[0.65rem] font-semibold text-ink-soft sm:text-[0.7rem]">Aarti at Keshi Ghat</figcaption>
          </figure>

          <Seal className="absolute -right-3 top-4 sm:-right-8 sm:top-8" />
          <Lotus className="absolute -bottom-5 right-8 w-12 text-orange-500 sm:w-14" />
        </div>
      </div>
    </section>
  );
}
