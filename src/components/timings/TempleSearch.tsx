"use client";

import { useState } from "react";
import { Search } from "lucide-react";

/**
 * Filters the timetable rows and the temple index as you type. Rows carry `data-temple` (their
 * search text); `data-region` groups hide when none of their rows match. Without JavaScript the
 * full list simply stays visible.
 */
export function TempleSearch({ total, className = "" }: { total: number; className?: string }) {
  const [shown, setShown] = useState<number | null>(null);

  function filter(value: string) {
    const term = value.trim().toLowerCase();
    let matches = 0;
    document.querySelectorAll<HTMLElement>("[data-temple]").forEach((el) => {
      const match = !term || (el.dataset.temple ?? "").includes(term);
      el.hidden = !match;
      if (match && el.tagName === "TR") matches++;
    });
    document.querySelectorAll<HTMLElement>("[data-region]").forEach((el) => {
      el.hidden = !el.querySelector("[data-temple]:not([hidden])");
    });
    const empty = document.getElementById("timings-empty");
    if (empty) empty.hidden = matches > 0;
    setShown(term ? matches : null);

    const results = document.getElementById("timetables");
    if (term && results && results.getBoundingClientRect().top < 0) results.scrollIntoView({ block: "start" });
  }

  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor="temple-search" className="sr-only">
        Find a temple
      </label>
      <div className="relative">
        <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
        <input
          id="temple-search"
          type="search"
          autoComplete="off"
          placeholder="Find a temple…"
          onChange={(e) => filter(e.target.value)}
          className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-4 text-base text-ink placeholder:text-stone/80 focus:border-saffron focus:outline-none focus:ring-4 focus:ring-orange-500/15 sm:text-sm"
        />
      </div>
      <p aria-live="polite" className="sr-only text-xs text-stone lg:not-sr-only lg:mt-2 lg:block lg:px-1">
        {shown === null ? `${total} temples & ghats` : `Showing ${shown} of ${total}`}
      </p>
    </div>
  );
}
