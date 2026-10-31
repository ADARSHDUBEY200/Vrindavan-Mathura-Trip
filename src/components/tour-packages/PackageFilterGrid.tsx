"use client";

import { useState, type ReactNode } from "react";

export type FilterItem = { key: string; days: number | null; card: ReactNode };

const PAGE_SIZE = 6;

/**
 * Day tiles + "View More" over server-rendered cards. Every card stays in the HTML (toggled with `hidden`),
 * so crawlers and no-JS visitors still get the full list.
 */
export function PackageFilterGrid({ items }: { items: FilterItem[] }) {
  const [days, setDays] = useState<number | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  const list = days === null ? items : items.filter((i) => i.days === days);
  const visible = new Set(list.slice(0, shown).map((i) => i.key));
  const remaining = Math.max(0, list.length - shown);
  const tiles = [...new Set(items.map((i) => i.days).filter((d): d is number => d !== null))].sort((a, b) => a - b);

  const select = (value: number | null) => {
    setDays(value);
    setShown(PAGE_SIZE);
  };

  const tile = (value: number | null, big: ReactNode, unit: string) => {
    const active = days === value;
    return (
      <button
        key={value ?? "all"}
        type="button"
        aria-pressed={active}
        onClick={() => select(value)}
        className={`flex h-23 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
          active ? "border-orange-500 bg-linear-to-b from-orange-400 to-orange-600 text-white shadow-[0_12px_22px_-10px_rgb(234_88_12/0.8)]" : "border-orange-200 bg-white text-orange-700 hover:border-orange-400"
        }`}
      >
        <span className="text-xl font-extrabold leading-none">{big}</span>
        <span className={`mt-1.5 text-[0.6rem] font-bold uppercase leading-tight tracking-[0.12em] ${active ? "text-white/90" : "text-orange-600"}`}>
          {unit}
          <br />
          package
        </span>
      </button>
    );
  };

  return (
    <>
      <div role="group" aria-label="Filter packages by number of days" className="no-scrollbar -mx-4 mt-7 flex gap-2.5 overflow-x-auto px-4 py-2 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0">
        {tile(null, "All", "days")}
        {tiles.map((d) => tile(d, d, d === 1 ? "day" : "days"))}
      </div>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="inline-flex h-12 cursor-pointer items-center rounded-xl border-2 border-orange-500 bg-white px-7 text-sm font-semibold text-orange-600 transition-colors duration-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            View More Packages ({remaining} remaining)
          </button>
        </div>
      )}
    </>
  );
}
