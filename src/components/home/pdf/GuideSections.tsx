import { BedDouble, Bus, CalendarDays, CarFront, Footprints, Plane, Route, Sparkles, TrainFront, UserCheck, XCircle, Zap, type LucideIcon } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { TempleSkyline } from "@/components/svg/Ornaments";
import { foodGuide, images, travel, whyChoose } from "@/content/home";
import { Band, Bullets, GuideTip, Paras, Photo, Ticks, h3 } from "./kit";

/** Follows the original "Why travel with us" section, continuing its white band. */
export function PromiseSection() {
  const w = whyChoose;
  return (
    <Band id="why-choose-us" eyebrow={w.eyebrow} title={w.title} lede={<Rich text={w.intro} />} tone="white">
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {w.items.map((item) => (
          <li key={item.title} className="reveal surface card-hover flex flex-col p-4 sm:p-5">
            <span className="grid size-11 place-items-center rounded-full bg-orange-50 text-xl ring-1 ring-orange-200" aria-hidden="true">
              {item.emoji}
            </span>
            <h3 className="mt-3 text-[0.95rem] font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-stone">
              <Rich text={item.text} />
            </p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function FoodGuideSection() {
  const f = foodGuide;
  return (
    <Band id="food-guide" eyebrow={f.eyebrow} title={f.title} tone="cream">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-12">
        <Paras items={[f.intro]} />
        <Photo image={images.food} sizes="(min-width: 1024px) 36vw, 92vw" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {f.foods.map((food) => (
          <article key={food.title} className="reveal surface card-hover group flex flex-col overflow-hidden">
            <Photo image={food.image} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" className="rounded-none shadow-none" />
            <div className="p-4 sm:p-5">
              <h3 className="text-base font-semibold leading-snug sm:text-[1.05rem]">{food.title}</h3>
              <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-stone">
                {food.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className={h3}>{f.otherTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {f.others.map((o) => (
              <li key={o} className="chip leading-relaxed">
                <span>
                  <Rich text={o} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={h3}>{f.safetyTitle}</h3>
          <Ticks items={f.safety} className="mt-4" />
        </div>
      </div>

      {/* Same orange → amber panel as the site's closing call-to-action */}
      <div className="relative mt-12 overflow-hidden rounded-[1.5rem] bg-linear-to-r from-orange-500 to-amber-500 px-5 pb-16 pt-8 shadow-glow sm:px-10 sm:pb-20 lg:rounded-[1.75rem] lg:px-12">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
        <div className="relative">
          <h3 className="display-3 flex items-center gap-2 text-ink">
            <Sparkles size={22} aria-hidden="true" />
            {f.secretsTitle}
          </h3>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {f.secrets.map((s) => (
              <li key={s} className="rounded-card bg-white/85 p-4 text-sm leading-relaxed text-ink-soft">
                <Rich text={s} />
              </li>
            ))}
          </ul>
        </div>
        <TempleSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-white/25 sm:h-16 lg:h-14" />
      </div>
    </Band>
  );
}

const icons: Record<string, LucideIcon> = { train: TrainFront, road: Route, plane: Plane, pickup: UserCheck, car: CarFront, rickshaw: Zap, bus: Bus, walk: Footprints };

const seasonTone = {
  best: "border-t-emerald-500",
  holi: "border-t-fuchsia-500",
  summer: "border-t-orange-500",
  monsoon: "border-t-sky-500",
} as const;

export function TravelSection() {
  const t = travel;
  return (
    <Band id="travel-logistics" eyebrow={t.eyebrow} title={t.title} lede={t.intro} tone="white">
      <h3 className={h3}>{t.reachTitle}</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {t.reach.map((r) => {
          const Icon = icons[r.icon] ?? Route;
          return (
            <li key={r.label} className="reveal surface card-hover flex gap-4 p-4 sm:p-5">
              <span className="icon-badge size-11 rounded-xl">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">{r.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone">
                  <Rich text={r.text} />
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center lg:gap-12">
        <dl className="grid grid-cols-2 divide-x divide-orange-100 rounded-2xl border border-orange-100 bg-white py-4 shadow-soft">
          {t.distance.stats.map((s) => (
            <div key={s.value} className="px-3 text-center">
              <dt className="text-xs text-stone">{s.label}</dt>
              <dd className="mt-1 text-2xl font-extrabold text-orange-600 sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div>
          <h3 className={h3}>{t.distance.title}</h3>
          <Paras items={[t.distance.text]} className="mt-2" />
        </div>
      </div>

      <h3 className={`${h3} mt-12`}>{t.modesTitle}</h3>
      <ul className="surface mt-5 divide-y divide-line">
        {t.modes.map((m) => {
          const Icon = icons[m.icon] ?? CarFront;
          return (
            <li key={m.text} className="flex gap-4 p-4 sm:p-5">
              <Icon size={22} className="mt-0.5 shrink-0 text-saffron" aria-hidden="true" />
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                <Rich text={m.text} />
              </p>
            </li>
          );
        })}
      </ul>

      <h3 className={`${h3} mt-12`}>{t.bestTimeTitle}</h3>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {t.seasons.map((s) => (
          <li key={s.tag} className={`reveal surface border-t-4 p-4 sm:p-5 ${seasonTone[s.tone]}`}>
            <p className="tag">
              <CalendarDays size={13} aria-hidden="true" /> {s.tag} · {s.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              <Rich text={s.text} />
            </p>
          </li>
        ))}
      </ol>

      <h3 className={`${h3} mt-12`}>{t.festivalsTitle}</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.festivals.map((f) => (
          <li key={f.name} className="surface p-4">
            <p className="flex flex-wrap items-center gap-2">
              <strong className="text-[0.95rem] font-semibold text-ink">{f.name}</strong>
              {f.when && <span className="tag">{f.when}</span>}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone">{f.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <GuideTip label={t.advice.label} text={t.advice.text} />
      </div>

      <h3 className={`${h3} mt-12`}>{t.packingTitle}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {t.packing.map((p) => (
          <div key={p.id} className="surface p-4 sm:p-5">
            <p className="text-[0.95rem] font-semibold text-ink">{p.heading}</p>
            <Bullets items={p.items} className="mt-3 text-sm" />
          </div>
        ))}
      </div>
      <p className="mt-5 flex max-w-3xl gap-3 rounded-card border border-red-200 bg-red-50 p-4 text-[0.95rem] leading-relaxed text-ink-soft">
        <XCircle size={20} className="mt-0.5 shrink-0 text-red-700" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-red-900">{t.avoid.label}</strong> {t.avoid.text}
        </span>
      </p>

      <div className="surface mt-12 flex max-w-3xl gap-4 p-5 sm:p-6">
        <span className="icon-badge size-11 rounded-xl">
          <BedDouble size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className={h3}>{t.stay.title}</h3>
          <Paras items={[t.stay.text]} className="mt-2" />
        </div>
      </div>
    </Band>
  );
}
