import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Clock3, MapPin, Star, Users } from "lucide-react";
import { formatInr } from "@/config/site";
import type { CatalogPackage } from "@/lib/cms/packages";
import { EnquireButton } from "./EnquireButton";

type Props = { pkg: CatalogPackage; perks: readonly string[]; idealFor: string };

const button = "inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

/**
 * Archive card, after the reference grid: image, title, place, duration + audience, four perks, two actions.
 * CMS banners are 850×420 with text baked in, so the frame keeps that shape and they are served as uploaded.
 */
export function TourCard({ pkg, perks, idealFor }: Props) {
  const img = pkg.image;
  const place = pkg.destination || pkg.route[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgb(17_24_39/0.05),0_12px_28px_-16px_rgb(17_24_39/0.22)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgb(17_24_39/0.05),0_22px_40px_-18px_rgb(194_65_12/0.35)]">
      <div className="relative aspect-85/42 overflow-hidden bg-sand">
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 46vw, 92vw"
            unoptimized={typeof img.src === "string"}
            placeholder={typeof img.src === "string" ? "empty" : "blur"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        {pkg.rating && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[0.7rem] font-semibold text-gray-900 shadow-sm">
            <Star size={12} aria-hidden="true" fill="currentColor" strokeWidth={0} className="text-amber-400" />
            {pkg.rating.toFixed(1)}
            <span className="sr-only"> out of 5</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[1.05rem] font-bold leading-snug text-gray-900">{pkg.title}</h3>

        {place && (
          <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={15} aria-hidden="true" className="shrink-0 text-orange-500" />
            {place}
          </p>
        )}
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
          {pkg.durationLabel && (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} aria-hidden="true" className="text-orange-500" />
              {pkg.durationLabel}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} aria-hidden="true" className="text-orange-500" />
            {idealFor}
          </span>
        </p>

        <ul aria-label="Included" className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-[0.8125rem] text-gray-600">
              <CircleCheck size={15} aria-hidden="true" className="shrink-0 text-emerald-600" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          {pkg.price && (
            <p className="mb-3 text-sm text-gray-600">
              From <span className="text-lg font-bold tracking-tight text-gray-900">{formatInr(pkg.price)}</span>
            </p>
          )}
          <div className="flex gap-3">
            {pkg.path && (
              <Link href={pkg.path} className={`${button} bg-orange-500 text-white hover:bg-orange-600`}>
                View Details
                <span className="sr-only">: {pkg.title}</span>
              </Link>
            )}
            <EnquireButton className={`${button} border border-orange-300 bg-white text-orange-600 hover:bg-orange-50`}>Enquire Now</EnquireButton>
          </div>
        </div>
      </div>
    </article>
  );
}
