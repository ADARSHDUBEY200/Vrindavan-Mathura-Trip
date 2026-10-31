import Image from "next/image";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/*
 * Building blocks of the /tour-packages pages. Same language as the rest of the site (orange-500 accent,
 * gray-900 text, soft cards), arranged the way the reference pages arrange them: a short orange bar + label
 * over a heading with an accented phrase and a fading rule.
 */

export function SectionLabel({ icon: Icon, children, center = false }: { icon?: LucideIcon; children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600 ${center ? "justify-center" : ""}`}>
      <span className="h-5 w-1 rounded-full bg-orange-500" aria-hidden="true" />
      {Icon && <Icon size={14} aria-hidden="true" />}
      {children}
    </p>
  );
}

export function Rule({ center = false }: { center?: boolean }) {
  return <span aria-hidden="true" className={`mt-3 block h-1 w-36 rounded-full bg-linear-to-r from-orange-500 via-amber-400 to-transparent ${center ? "mx-auto" : ""}`} />;
}

const headingClass = "text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-extrabold leading-tight tracking-[-0.02em] text-gray-900";

/** H2 with an optional orange phrase. */
export function Heading({ id, children, accent, rule = true, className = "" }: { id?: string; children?: ReactNode; accent?: ReactNode; rule?: boolean; className?: string }) {
  return (
    <div className={className}>
      <h2 id={id} className={headingClass}>
        {children}
        {children && accent ? " " : null}
        {accent && <span className="text-orange-500">{accent}</span>}
      </h2>
      {rule && <Rule />}
    </div>
  );
}

export type Column<K extends string> = { key: K; label: string; tone?: "strong" | "orange" | "blue" };

const cellTone = { strong: "font-semibold text-gray-900", orange: "font-medium text-orange-600", blue: "font-medium text-blue-700" };

/** Reference-style data table: quiet header row, a strong first column, tinted values. Scrolls sideways on phones. */
export function DataTable<K extends string>({ columns, rows, label }: { columns: Column<K>[]; rows: Record<K, string | undefined>[]; label: string }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft" role="region" aria-label={label} tabIndex={0}>
      <table className="w-full min-w-[38rem] text-left text-sm">
        <thead className="border-b border-gray-100 text-xs text-gray-500">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className="px-5 py-3.5 font-semibold">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c, j) => {
                const Cell = j === 0 ? "th" : "td";
                return (
                  <Cell key={c.key} scope={j === 0 ? "row" : undefined} className={`px-5 py-3.5 align-top leading-snug ${c.tone ? cellTone[c.tone] : "text-gray-600"}`}>
                    {r[c.key] || "—"}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Sanitised CMS HTML (prepareArticleHtml) in the site's article typography. */
export function RichHtml({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`prose-travel ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A fixed-shape photo that accepts site photos and CMS uploads alike. */
export function FramedImage({ src, alt, sizes, className = "", preload = false }: { src: string; alt: string; sizes: string; className?: string; preload?: boolean }) {
  return (
    <div className={`zoom-media relative overflow-hidden rounded-2xl bg-sand shadow-soft ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
    </div>
  );
}
