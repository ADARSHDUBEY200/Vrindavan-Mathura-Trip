import { Droplets, Footprints, RotateCw, Sunrise } from "lucide-react";
import { SectionHead } from "@/components/destination/kit";
import { govardhanParikrama as p } from "@/content/braj/govardhan";
import { Bullets, Paragraphs, Rich } from "./parts";

/** The Parikrama chapter: the loop, the two circuits, the numbers, and the practical rules of the road. */
export function GovardhanParikrama() {
  return (
    <section id="parikrama" aria-labelledby="parikrama-title" className="dg-section pb-0 lg:pb-0">
      <div className="container-x">
        <SectionHead id="parikrama-title" eyebrow="21 km · 7 kos · clockwise" title={p.title} lede={<Rich text={p.intro} />} />

        {/* The numbers, at a glance */}
        <dl className="reveal-stagger mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p.facts.map((f) => (
            <div key={f.label} className="dg-card flex flex-col-reverse justify-end p-5">
              <dt className="dg-small mt-2">
                <span className="dg-label block">{f.label}</span>
                <span className="mt-1 block">{f.note}</span>
              </dt>
              <dd className="dg-brand text-2xl font-bold tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="sr-only">{p.factsTitle}</p>

        {/* The loop */}
        <div className="dg-card mt-5 p-6 sm:p-8">
          <div className="dg-head flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="dg-h3">{p.routeTitle}</h3>
              <p className="dg-small mt-1.5 max-w-2xl">{p.routeLede}</p>
            </div>
            <p className="inline-flex items-center gap-2 self-center text-sm font-medium text-ember-deep lg:self-end">
              <RotateCw size={16} aria-hidden="true" /> Keep Giriraj on your right
            </p>
          </div>
          <ol className="relative mt-7 grid gap-3 lg:grid-cols-5 lg:gap-4">
            <span aria-hidden="true" className="absolute inset-x-[10%] top-[1.05rem] hidden h-0.5 rounded bg-linear-to-r from-[var(--dg-o400)] to-[var(--dg-a300)] lg:block" />
            {p.route.map((r, i) => (
              <li key={r.stretch} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-ember-deep shadow-[inset_0_0_0_2px_var(--dg-o400)]">{i + 1}</span>
                <span>
                  <span className="dg-h4 block">{r.stretch}</span>
                  <span className="dg-small mt-1 block">
                    <Rich text={r.stops} />
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Badi vs Chhoti */}
        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h3 className="dg-h3 dg-head">{p.badiTitle}</h3>
            <Paragraphs items={p.badi} className="mt-4" />
          </div>
          <div className="lg:col-span-5">
            <p className="dg-label dg-head">{p.chooseTitle}</p>
            <ul className="reveal-stagger mt-3 grid gap-3">
              {p.choose.map((c, i) => (
                <li key={c.name} className="dg-card flex gap-4 p-5">
                  <span className="dg-num shrink-0" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>
                    <span className="dg-h4 block">{c.name}</span>
                    <span className="dg-small mt-1 block">{c.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The one tip to remember */}
        <div className="dg-dark mt-12 grid gap-5 overflow-hidden rounded-[1.75rem] p-6 sm:p-9 lg:mt-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8 lg:p-11">
          <span className="dg-icon mx-auto size-14 lg:mx-0" aria-hidden="true">
            <Sunrise size={24} />
          </span>
          <div>
            <h3 className="dg-h2 dg-head">{p.secretTitle}</h3>
            <p className="mt-4 text-[1rem] leading-[1.75] text-white/90 sm:text-[1.05rem]">
              <Rich text={p.secret} />
            </p>
          </div>
        </div>

        {/* Walking, water */}
        <div className="reveal-stagger mt-5 grid gap-5 lg:grid-cols-2">
          <div className="dg-card p-6 sm:p-7">
            <h3 className="dg-h4 flex items-center gap-3">
              <span className="dg-icon">
                <Footprints size={18} aria-hidden="true" />
              </span>
              {p.walkingTitle}
            </h3>
            <Bullets items={p.walking} className="mt-5" />
          </div>
          <div className="dg-card p-6 sm:p-7">
            <h3 className="dg-h4 flex items-center gap-3">
              <span className="dg-icon">
                <Droplets size={18} aria-hidden="true" />
              </span>
              {p.waterTitle}
            </h3>
            <p className="dg-small mt-4">{p.waterLede}</p>
            <Bullets items={p.water} className="mt-4" />
          </div>
        </div>

        {/* Dandavat, etiquette */}
        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h3 className="dg-h3 dg-head">{p.dandavatTitle}</h3>
            <p className="dg-body mt-4">
              <Rich text={p.dandavat} />
            </p>
          </div>
          <div className="dg-wash rounded-[1.25rem] border border-[var(--dg-o100)] p-6 sm:p-7 lg:col-span-6">
            <h3 className="dg-h3 dg-head">{p.etiquetteTitle}</h3>
            <ol className="dg-rules mt-3">
              {p.etiquette.map((e) => (
                <li key={e}>
                  <Rich text={e} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
