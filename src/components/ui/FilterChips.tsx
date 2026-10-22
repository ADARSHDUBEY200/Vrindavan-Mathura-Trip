import type { ReactNode } from "react";

type Option = { value: string; label: string };

/**
 * Accessible radio-group chips. Pair with a `.filter-root` wrapper and children carrying
 * `data-filters="a b c"`; matching CSS in globals.css hides non-matching items — no client JS.
 */
export function FilterChips({ name, legend, options, allLabel = "All" }: { name: string; legend: string; options: Option[]; allLabel?: string }) {
  const all: Option[] = [{ value: "all", label: allLabel }, ...options];
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{legend}</legend>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {all.map((o, i) => {
          const id = `${name}-${o.value.toLowerCase().replace(/\W+/g, "-")}`;
          return (
            <span key={o.value} className="relative shrink-0">
              <input id={id} type="radio" name={name} value={o.value} defaultChecked={i === 0} className="filter-input" />
              <label htmlFor={id} className="chip min-h-11 cursor-pointer select-none">
                {o.label}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FilterRoot({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`filter-root ${className}`}>{children}</div>;
}
