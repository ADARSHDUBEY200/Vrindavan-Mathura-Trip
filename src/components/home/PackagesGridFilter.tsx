"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type GridItem = { key: string; band?: string; card: ReactNode };

type Props = {
  items: GridItem[];
  bands: { id: string; label: string }[];
  allLabel?: string;
};

/** The grid is 4 columns from `xl` (1280px) and 2–3 below it; page by whole rows on both. */
const WIDE = "(min-width: 1280px)";
function subscribeWide(cb: () => void) {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Duration tabs + "Show more" over server-rendered cards. Every card stays in the HTML (toggled with `hidden`),
 * so crawlers and no-JS visitors still get the full list.
 */
export function PackagesGridFilter({ items, bands, allLabel = "All trips" }: Props) {
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
  const pageSize = wide ? 8 : 6;
  const [band, setBand] = useState("all");
  // Pages revealed so far, so the count follows the column count if the window is resized.
  const [pages, setPages] = useState(1);
  const shown = pages * pageSize;

  const list = band === "all" ? items : items.filter((i) => i.band === band);
  const visible = new Set(list.slice(0, shown).map((i) => i.key));
  const remaining = list.length - Math.min(shown, list.length);
  const tabs = [{ id: "all", label: allLabel }, ...bands]
    .map((t) => ({ ...t, count: t.id === "all" ? items.length : items.filter((i) => i.band === t.id).length }))
    .filter((t) => t.count > 0);

  return (
    <>
      <div role="group" aria-label="Filter packages by duration" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => {
          const active = t.id === band;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setBand(t.id);
                setPages(1);
              }}
              className={`inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                active
                  ? "border-orange-500 bg-orange-500 font-semibold text-white shadow-[0_8px_18px_-10px_rgb(249_115_22/0.9)]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-gray-900"
              }`}
            >
              {t.label}
              <span className={`min-w-5 rounded-full px-1.5 py-px text-center text-[0.68rem] font-semibold tabular-nums ${active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"}`}>{t.count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-7 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((i) => (
          <li key={i.key} hidden={!visible.has(i.key)}>
            {i.card}
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="sr-only">
        Showing {list.length - remaining} of {list.length} packages
      </p>

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setPages((n) => n + 1)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-900 shadow-[0_1px_2px_rgb(17_24_39/0.05)] transition-colors duration-300 hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Show more packages
            <span className="font-medium text-gray-500">({remaining} more)</span>
            <ChevronDown size={16} aria-hidden="true" className="text-orange-500" />
          </button>
        </div>
      )}
    </>
  );
}
