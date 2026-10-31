"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { TempleCardData } from "@/lib/cms/temples";
import { ArchCard } from "./kit";

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Search and filters over every published temple. Without JavaScript the full list still renders. */
export function TempleExplorer({ temples, searchLabel, allLabel, emptyText }: { temples: TempleCardData[]; searchLabel: string; allLabel: string; emptyText: string }) {
  const [query, setQuery] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");

  const towns = useMemo(() => [...new Set(temples.map((t) => t.town).filter(Boolean))], [temples]);
  const categories = useMemo(() => [...new Set(temples.map((t) => t.category).filter(Boolean))].sort(), [temples]);

  const visible = useMemo(() => {
    const words = normalise(query).split(" ").filter(Boolean);
    return temples.filter((t) => {
      const text = normalise(`${t.name} ${t.town} ${t.category} ${t.summary}`);
      return (!town || t.town === town) && (!category || t.category === category) && words.every((w) => text.includes(w));
    });
  }, [temples, query, town, category]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <label className="tmpl-search">
          <span className="sr-only">{searchLabel}</span>
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchLabel} />
        </label>
        {categories.length > 1 && (
          <label>
            <span className="sr-only">Filter by temple type</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="tmpl-select">
              <option value="">All types</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}
        <p className="ml-auto text-sm font-medium text-stone" role="status">
          {visible.length} of {temples.length} temples
        </p>
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by town">
        {["", ...towns].map((t) => (
          <button key={t || "all"} type="button" aria-pressed={town === t} onClick={() => setTown(t)} className="tmpl-chip shrink-0">
            {t || allLabel}
          </button>
        ))}
      </div>

      {visible.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {visible.map((t) => (
            <li key={t.slug}>
              <ArchCard temple={t} index={temples.indexOf(t)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-line px-5 py-10 text-center text-stone">{emptyText}</p>
      )}
    </div>
  );
}
