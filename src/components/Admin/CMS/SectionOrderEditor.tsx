"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { IconButton } from "./ui";

export type OrderItem = { key: string; label: string };

/** The sections of a page, in order: move each one up or down, or hide it. */
export function SectionOrderEditor({ items, hidden, onChange }: { items: OrderItem[]; hidden: string[]; onChange: (next: { order: string[]; hidden: string[] }) => void }) {
  const keys = items.map((i) => i.key);
  const move = (index: number, dir: -1 | 1) => {
    const order = [...keys];
    [order[index], order[index + dir]] = [order[index + dir], order[index]];
    onChange({ order, hidden });
  };
  const toggle = (key: string, show: boolean) => onChange({ order: keys, hidden: show ? hidden.filter((k) => k !== key) : [...hidden, key] });

  return (
    <ol className="space-y-1.5">
      {items.map((item, i) => {
        const shown = !hidden.includes(item.key);
        return (
          <li key={item.key} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
            <span className="w-6 shrink-0 text-center text-xs tabular-nums text-slate-400">{i + 1}</span>
            <span className={`min-w-0 flex-1 truncate text-sm ${shown ? "text-slate-100" : "text-slate-500 line-through"}`}>{item.label}</span>
            <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs text-slate-300">
              <input type="checkbox" checked={shown} onChange={(e) => toggle(item.key, e.target.checked)} className="size-4 accent-sky-500" aria-label={`Show ${item.label}`} />
              Show
            </label>
            <IconButton label={`Move ${item.label} up`} onClick={() => move(i, -1)} disabled={i === 0}>
              <ArrowUp size={15} />
            </IconButton>
            <IconButton label={`Move ${item.label} down`} onClick={() => move(i, 1)} disabled={i === items.length - 1}>
              <ArrowDown size={15} />
            </IconButton>
          </li>
        );
      })}
    </ol>
  );
}
