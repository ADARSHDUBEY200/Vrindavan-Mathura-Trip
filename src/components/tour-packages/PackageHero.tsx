import Image from "next/image";
import { CalendarDays, Flag, Flame, Home, IndianRupee, MapPin, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatInr } from "@/config/site";
import type { PackageDetail } from "@/lib/cms/package-detail";
import type { Crumb } from "@/lib/schema";

/** Rating stars out of five, with the value for screen readers. */
export function Stars({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} aria-hidden="true" fill="currentColor" strokeWidth={0} className={n <= Math.round(value) ? "text-amber-400" : "text-gray-200"} />
      ))}
    </span>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-amber-200">{label}</p>
        <p className="truncate text-sm font-semibold sm:text-[0.95rem]">{value}</p>
      </div>
    </div>
  );
}

/** Banner + 2×2 thumbnails, title row and the maroon facts strip. CMS images are served as uploaded (their text is baked in). */
export function PackageHero({ p, crumbs }: { p: PackageDetail; crumbs: Crumb[] }) {
  const thumbs = p.gallery.slice(0, 4);
  const stats = [
    p.durationLabel && { icon: CalendarDays, label: "Duration", value: p.durationLabel },
    p.route.source && { icon: MapPin, label: "Starts from", value: p.route.source },
    p.route.destination && { icon: Flag, label: "Ends at", value: p.route.destination },
    p.price && { icon: IndianRupee, label: "Starting from", value: `${formatInr(p.price)} per person` },
  ].filter((s): s is { icon: typeof MapPin; label: string; value: string } => Boolean(s));

  return (
    <>
      <section aria-labelledby="page-title" className="bg-linear-to-b from-orange-50 to-white pb-8 pt-26 sm:pt-28">
        <div className="container-x">
          <div className="inline-flex items-start gap-2 rounded-2xl bg-white/80 px-3.5 py-1.5 shadow-[0_1px_2px_rgb(17_24_39/0.05)]">
            <Home size={14} aria-hidden="true" className="mt-[0.2rem] shrink-0 text-orange-600" />
            <Breadcrumbs items={crumbs} />
          </div>

          <div className={`mt-5 grid gap-4 ${thumbs.length ? "lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]" : ""}`}>
            <div className="relative aspect-85/42 overflow-hidden rounded-3xl bg-sand shadow-soft">
              {p.hero && <Image src={p.hero.src} alt={p.hero.alt} fill preload unoptimized sizes="(min-width: 1024px) 50rem, 92vw" className="object-cover" />}
              {p.heroBadge && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-bold text-orange-600 shadow-sm">
                  <Flame size={14} aria-hidden="true" /> {p.heroBadge}
                </span>
              )}
            </div>
            {thumbs.length > 0 && (
              <ul className="grid grid-cols-4 gap-3 lg:grid-cols-2 lg:gap-4">
                {thumbs.map((img) => (
                  <li key={img.src} className="relative aspect-square overflow-hidden rounded-2xl bg-sand shadow-soft lg:aspect-auto">
                    <Image src={img.src} alt={img.alt} fill unoptimized sizes="(min-width: 1024px) 14rem, 23vw" className="object-cover" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 id="page-title" className="text-[clamp(1.6rem,1.25rem+1.5vw,2.5rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900">
                {p.title}
              </h1>
              {p.rating && (
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <Stars value={p.rating} />
                  <span className="font-semibold text-gray-900">{p.rating.toFixed(1)}</span>
                  {p.reviews && <span>({p.reviews.toLocaleString("en-IN")} reviews)</span>}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft sm:px-6">
              <p className="leading-tight">
                <span className="block text-xs font-medium text-gray-500">Starting from</span>
                <span className="mt-0.5 block text-2xl font-extrabold tracking-tight text-orange-600">{p.price ? formatInr(p.price) : "On request"}</span>
                {p.price && <span className="mt-0.5 block text-xs text-gray-500">per person</span>}
              </p>
              <a href="#enquire" className="inline-flex h-12 items-center rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <div className="bg-linear-to-r from-[#7c1d06] to-[#8c2a0a] text-white">
          <div className="container-x grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
