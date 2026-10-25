import type { AartiItem, AartiSchedule } from "@/content/temple-timings";
import { Seasonal } from "./Season";
import { VerifyFlag } from "./Timetable";

function Schedule({ items }: { items: AartiItem[] }) {
  return (
    <dl className="divide-y divide-line/80 px-4 sm:px-5">
      {items.map((i) => (
        <div key={`${i.time}-${i.name}`} className="flex items-baseline gap-4 py-1.5 text-[0.8125rem]">
          <dt className="w-[7.25rem] shrink-0 font-medium tabular-nums text-ink">{i.time}</dt>
          <dd className="text-ink-soft">{i.name}</dd>
        </div>
      ))}
    </dl>
  );
}

/** One temple's full daily aarti sequence, season-aware. */
export function AartiPanel({ schedule: s }: { schedule: AartiSchedule }) {
  const titleId = `${s.id}-title`;
  return (
    <article id={s.id} aria-labelledby={titleId} className="card-hover scroll-mt-20 overflow-hidden rounded-2xl border border-line bg-white lg:scroll-mt-6">
      <header className="flex items-start justify-between gap-3 border-b border-line bg-cream px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <h3 id={titleId} className="text-[0.95rem] font-semibold leading-snug text-ink">
            <a href={`#t-${s.rowId}`} className="underline-offset-4 hover:text-ember-deep hover:underline">
              {s.name}
            </a>
          </h3>
          <p className="mt-0.5 text-xs text-stone">
            <span lang="hi" className="hi text-[0.8125rem] text-ember-deep">
              {s.hindi}
            </span>
            {" · "}
            {s.place}
            {!s.winter && " · Same all year"}
          </p>
        </div>
        {s.confirm && <VerifyFlag />}
      </header>
      <div className="py-1.5">
        <Seasonal as="div" summer={<Schedule items={s.summer} />} winter={s.winter ? <Schedule items={s.winter} /> : undefined} />
      </div>
      {(s.note || s.confirm) && (
        <div className="grid gap-1.5 border-t border-line px-4 py-3 text-xs leading-relaxed text-stone sm:px-5">
          {s.note && <p>{s.note}</p>}
          {s.confirm && (
            <p className="text-amber-900">
              <strong className="font-semibold">Verify:</strong> {s.confirm}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
