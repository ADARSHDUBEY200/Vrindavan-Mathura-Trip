import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { formatWindow, type Hours, type TimingArea, type TimingRow, type Window } from "@/content/temple-timings";
import { Seasonal } from "./Season";

/** Small amber flag for timings that need confirming. */
export function VerifyFlag() {
  return <span className="verify-flag">Verify</span>;
}

/** Text the temple search matches against. */
export function searchKey(row: TimingRow): string {
  return [row.name, row.hindi, row.place, row.aliases].filter(Boolean).join(" ").toLowerCase();
}

/** "Shri Radha Raman Temple" → "Radha Raman", for the compact index. */
export function shortName(row: TimingRow): string {
  return row.name.replace(/^Shri /, "").replace(/ Temple$/, "");
}

/** Season-aware value of one field; nothing at all when neither season has it. */
function bySeason<T>(row: TimingRow, pick: (h: Hours) => T | undefined, render: (v: T) => ReactNode, empty: ReactNode = null) {
  const has = pick(row.summer) !== undefined || (row.winter !== undefined && pick(row.winter) !== undefined);
  if (!has && empty === null) return null;
  const show = (h: Hours) => {
    const v = pick(h);
    return v === undefined ? empty : render(v);
  };
  return <Seasonal summer={show(row.summer)} winter={row.winter ? show(row.winter) : undefined} />;
}

const time = (win: Window) => <span className="tt-time">{formatWindow(win)}</span>;
const none = (
  <span className="tt-none">
    <span aria-hidden="true">—</span>
    <span className="sr-only">No session</span>
  </span>
);

function Row({ row, regionName }: { row: TimingRow; regionName: string }) {
  const kind = row.aartiOnly ? "aarti" : "darshan";
  // The region heading already names the town, so only show places that add something.
  const meta = [row.place !== regionName && row.place, !row.winter && "Same all year", row.aartiOnly && "Aarti times"].filter(Boolean).join(" · ");
  const aarti = bySeason(row, (h) => h.aarti, (v) => <span className="tt-aarti block">{v}</span>);
  const seasonNote = bySeason(row, (h) => h.note, (v) => <span className="block">{v}</span>);
  const hasNotes = Boolean(aarti || seasonNote || row.note || row.confirm);

  return (
    <tr id={`t-${row.id}`} data-temple={searchKey(row)}>
      <th scope="row">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {row.templeSlug ? (
            <Link href={`/temples/${row.templeSlug}`} className="tt-name underline-offset-4 hover:text-ember-deep hover:underline">
              {row.name}
            </Link>
          ) : (
            <span className="tt-name">{row.name}</span>
          )}
          {row.confirm && <VerifyFlag />}
        </span>
        <span lang="hi" className="hi tt-hindi">
          {row.hindi}
        </span>
        {meta && <span className="tt-meta">{meta}</span>}
      </th>
      {row.summer.allDay ? (
        <td colSpan={2} data-label="Open through the day" className="tt-span">
          {bySeason(row, (h) => h.allDay, time)}
          <span className="tt-meta">No midday closure listed</span>
        </td>
      ) : (
        <>
          <td data-label={`Morning ${kind}`}>{bySeason(row, (h) => h.morning, time, none)}</td>
          <td data-label={`Evening ${kind}`}>{bySeason(row, (h) => h.evening, time, none)}</td>
        </>
      )}
      <td className={`tt-note ${hasNotes ? "" : "tt-empty"}`}>
        {hasNotes ? (
          <span className="grid gap-1">
            {aarti}
            {seasonNote}
            {row.note && <span className="block">{row.note}</span>}
            {row.confirm && (
              <span className="tt-verify block">
                <strong className="font-semibold">Verify:</strong> {row.confirm}
              </span>
            )}
          </span>
        ) : (
          <span aria-hidden="true">—</span>
        )}
      </td>
    </tr>
  );
}

/** One region: a ruled heading and its ledger-style timetable. */
export function RegionTimetable({ area, rows }: { area: TimingArea; rows: TimingRow[] }) {
  const titleId = `${area.id}-title`;
  return (
    <section id={area.id} data-region aria-labelledby={titleId} className="reveal scroll-mt-20 lg:scroll-mt-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-ink/80 pb-3">
        <div>
          <h2 id={titleId} className="flex flex-wrap items-baseline gap-x-3 text-lg font-bold tracking-tight text-ink sm:text-xl">
            {area.title}
            <span lang="hi" className="hi text-base font-normal text-ember-deep">
              {area.hindi}
            </span>
          </h2>
          <p className="mt-1 max-w-2xl text-[0.8125rem] leading-relaxed text-stone sm:text-sm">{area.lede}</p>
        </div>
        <p className="flex shrink-0 items-center gap-3 text-xs text-stone">
          <span>
            {rows.length} listed · <Seasonal summer="summer hours" winter="winter hours" />
          </span>
          <Link href={area.page.href} className="link-arrow">
            {area.page.label} <ArrowRight size={13} aria-hidden="true" className="btn-arrow" />
          </Link>
        </p>
      </div>
      <div className="tt-wrap mt-4">
        <table className="tt">
          <caption className="sr-only">{`${area.title}: morning and evening darshan for the selected season, with aarti times and notes`}</caption>
          <thead>
            <tr>
              <th scope="col">Temple</th>
              <th scope="col">Morning</th>
              <th scope="col">Evening</th>
              <th scope="col">Aarti & notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <Row key={r.id} row={r} regionName={area.short} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
