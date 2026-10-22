import { MapPin, Plus } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { darshanEntries, darshanGuide, timingsAtGlance, type TempleBlock } from "@/content/home";
import { Band, Bullets, Note, Photo, h3 } from "./kit";

const LABEL = "text-xs font-semibold uppercase tracking-[0.16em] text-ember-deep";

function Block({ block }: { block: TempleBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div>
          {block.label && <p className={LABEL}>{block.label}</p>}
          <p className={`${block.label ? "mt-1.5" : ""} text-[0.95rem] leading-[1.8] text-ink-soft`}>
            <Rich text={block.text} />
          </p>
        </div>
      );
    case "tips":
      return (
        <div>
          <p className={LABEL}>{block.label}</p>
          <Bullets items={block.items} className="mt-2 text-[0.95rem]" />
        </div>
      );
    case "seasons":
      return (
        <div>
          <p className={LABEL}>{block.label}</p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-saffron-wash text-ink">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Season</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Morning darshan</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Evening darshan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink-soft">
                {block.rows.map((r) => (
                  <tr key={r.season}>
                    <th scope="row" className="px-4 py-2.5 font-semibold italic text-ink">{r.season}</th>
                    <td className="px-4 py-2.5">{r.morning}</td>
                    <td className="px-4 py-2.5">{r.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "places":
      return (
        <ul className="grid gap-3 md:grid-cols-2">
          {block.items.map((p) => (
            <li key={p.id} id={p.id} className="flex gap-3 rounded-card bg-cream p-4 text-[0.95rem] leading-relaxed text-ink-soft">
              <MapPin size={18} className="mt-1 shrink-0 text-saffron" aria-hidden="true" />
              <span>
                <Rich text={p.text} />
              </span>
            </li>
          ))}
        </ul>
      );
  }
}

/** Follows the original "Temples you'll visit" rail, continuing its cream band. */
export function DarshanGuideSection() {
  const g = darshanGuide;
  return (
    <Band id="darshan-guide" eyebrow={g.eyebrow} title={g.title} lede={<Rich text={g.intro} />} tone="cream">
      <Note label={g.note.label} text={g.note.text} />

      <figure className="mt-8">
        <h3 className={h3}>{g.glanceTitle}</h3>
        <div className="surface mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-saffron-wash text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Temple</th>
                <th scope="col" className="px-4 py-3 font-semibold">Morning</th>
                <th scope="col" className="px-4 py-3 font-semibold">Evening</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink-soft">
              {timingsAtGlance.map((r) => (
                <tr key={r.temple}>
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    <a href={r.href} className="hover:text-ember-deep hover:underline">
                      {r.temple}
                    </a>
                  </th>
                  <td className="whitespace-nowrap px-4 py-3">{r.morning}</td>
                  <td className="whitespace-nowrap px-4 py-3">{r.evening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-2 text-xs text-stone">{g.glanceCaption}</figcaption>
      </figure>

      {/* Same accordion as the site's FAQ list. Native <details>: all text is in the HTML. */}
      <div className="mt-10 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
        {darshanEntries.map((t) => (
          <details key={t.id} id={t.id} open={t.n === 1} className="faq-item group">
            <summary className="flex min-h-11 items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-orange-50/60 sm:px-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-50 text-sm font-bold text-ember-deep ring-1 ring-orange-200" aria-hidden="true">
                {String(t.n).padStart(2, "0")}
              </span>
              <h3 className="flex-1 text-[0.95rem] font-semibold text-ink sm:text-base">
                <span className="sr-only">{t.n}. </span>
                {t.title}
              </h3>
              <span className="faq-icon icon-badge size-6 rounded-full">
                <Plus size={14} aria-hidden="true" />
              </span>
            </summary>
            <div className="space-y-5 px-4 pb-6 sm:px-6 sm:pl-[4.75rem]">
              {t.image && <Photo image={t.image} sizes="(min-width: 1024px) 40rem, 90vw" className="max-w-2xl" />}
              {t.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </Band>
  );
}
