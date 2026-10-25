import type { ReactNode } from "react";
import { Snowflake, Sun } from "lucide-react";
import { SeasonAuto } from "./SeasonAuto";

export const SEASON_INPUT = "season";

/**
 * Wraps everything that shows season-specific content. Matching CSS in globals.css hides the
 * `[data-season]` content of the season that is not selected — no client JS needed to switch.
 */
export function SeasonRoot({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`season-root ${className}`}>{children}</div>;
}

/** Summer / winter segmented control (visually hidden radios + labels). */
export function SeasonSwitch({ className = "" }: { className?: string }) {
  const options = [
    { value: "summer", label: "Summer", hint: "approx. Holi to Diwali", Icon: Sun },
    { value: "winter", label: "Winter", hint: "approx. Diwali to Holi", Icon: Snowflake },
  ];
  return (
    <fieldset className={`min-w-0 shrink-0 ${className}`}>
      <legend className="sr-only">Show timings for</legend>
      <div className="season-track">
        {options.map(({ value, label, hint, Icon }, i) => (
          <span key={value} className="relative flex-1">
            <input id={`season-${value}`} type="radio" name={SEASON_INPUT} value={value} defaultChecked={i === 0} className="season-input" />
            <label htmlFor={`season-${value}`} className="season-option" title={`${label} hours (${hint})`}>
              <Icon size={14} aria-hidden="true" className="max-sm:hidden" />
              {label}
              <span className="sr-only"> hours ({hint})</span>
            </label>
          </span>
        ))}
      </div>
      <SeasonAuto name={SEASON_INPUT} />
    </fieldset>
  );
}

/**
 * Renders summer and winter content side by side in the HTML; CSS shows the selected one.
 * `winter` undefined = same all year; `null` = nothing in winter.
 */
export function Seasonal({ summer, winter, as: Tag = "span" }: { summer: ReactNode; winter?: ReactNode; as?: "span" | "div" }) {
  if (winter === undefined) return <>{summer}</>;
  return (
    <>
      <Tag data-season="summer">{summer}</Tag>
      <Tag data-season="winter">{winter}</Tag>
    </>
  );
}
