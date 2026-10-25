import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogPackageCard } from "@/components/cards/CatalogPackageCard";
import { packagesGrid } from "@/content/sections";
import type { CatalogPackage } from "@/lib/cms/packages";
import { PackagesGridFilter, type GridItem } from "./PackagesGridFilter";

const BANDS: { id: string; label: string; match: (days: number) => boolean }[] = [
  { id: "same-day", label: "Same day", match: (d) => d <= 1 },
  { id: "2-days", label: "2 days", match: (d) => d === 2 },
  { id: "3-4-days", label: "3–4 days", match: (d) => d >= 3 && d <= 4 },
  { id: "5-plus", label: "5+ days", match: (d) => d >= 5 },
];

const bandOf = (p: CatalogPackage) => (p.days ? BANDS.find((b) => b.match(p.days!))?.id : undefined);

/** One trip from each duration in turn, so the first row under "All trips" shows the range rather than five day trips. */
function interleave(list: CatalogPackage[]): CatalogPackage[] {
  const queues = BANDS.map((b) => list.filter((p) => bandOf(p) === b.id));
  const out: CatalogPackage[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return [...out, ...list.filter((p) => !bandOf(p))];
}

/**
 * Packages grid straight under the hero, in the About page's palette (gray-900 / gray-600 text, orange-500 accent).
 * White, so the hero's front wave flows into it.
 */
export function PackagesGrid({ catalog }: { catalog: CatalogPackage[] }) {
  if (!catalog.length) return null;
  const s = packagesGrid;

  const items: GridItem[] = interleave(catalog).map((p) => ({
    key: p.slug,
    band: bandOf(p),
    card: <CatalogPackageCard pkg={p} perks={s.perks} />,
  }));

  return (
    <section id="packages" aria-labelledby="packages-grid-title" className="relative bg-white pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20">
      <div className="container-x">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:text-left">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[0.8125rem] font-medium text-orange-600">
              <span className="size-1.5 rounded-full bg-orange-500" aria-hidden="true" />
              {s.eyebrow}
            </p>
            <h2 id="packages-grid-title" className="mt-3 text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900">
              {s.titleBefore} <span className="text-orange-500">{s.highlight}</span>
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-gray-600 sm:text-base">{s.lede}</p>
          </div>
          <Link
            href="/tour-packages"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-orange-600 underline decoration-orange-200 decoration-2 underline-offset-4 transition-colors hover:decoration-orange-500"
          >
            View all packages
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-7 lg:mt-8">
          <PackagesGridFilter items={items} bands={BANDS.map(({ id, label }) => ({ id, label }))} />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-gray-500 sm:text-[0.8125rem]">{s.note}</p>
      </div>
    </section>
  );
}
