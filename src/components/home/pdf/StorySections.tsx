import { CalendarCheck, Candy, Clock, Mail, MapPin, ShieldCheck, Smartphone, Users, type LucideIcon } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { Lotus } from "@/components/svg/Ornaments";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/config/site";
import { LAST_UPDATED, brajBhoomi, founderStory, hero, images, trustStats } from "@/content/home";
import { Band, Paras, Photo, h3 } from "./kit";

const lastUpdated = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** The PDF's opening: welcome, intro, direct contacts and trust figures. Sits right after the original hero. */
export function IntroSection() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div>
          <div className="text-center sm:text-left">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h2 id="welcome-title" className="display-2 mt-2.5">
              {hero.title}
            </h2>
            <p className="display-3 mt-5 text-ember-deep">{hero.greeting}</p>
          </div>
          <div id="home-intro">
            <Paras items={hero.intro} className="mt-4" />
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-xs text-stone">
            <CalendarCheck size={14} aria-hidden="true" className="text-saffron" />
            Last updated: <time dateTime={LAST_UPDATED}>{lastUpdated}</time>
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <Photo image={images.hero} sizes="(min-width: 1024px) 38vw, 92vw" />

          <div className="surface p-5 sm:p-6">
            <p className="font-semibold text-ink">{hero.contactTitle}</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink-soft">
              <li className="flex flex-wrap items-center gap-x-2">
                <span className="font-medium text-ink">{hero.contactLabels.call}</span>
                <a href={`tel:${PHONE_E164}`} className="font-semibold text-ember-deep hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-x-2">
                <span className="font-medium text-ink">{hero.contactLabels.email}</span>
                <a href={`mailto:${EMAIL}`} className="break-all font-semibold text-ember-deep hover:underline">
                  {EMAIL}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-x-2">
                <span className="font-medium text-ink">{hero.contactLabels.website}</span>
                <span className="break-all">{hero.website}</span>
              </li>
            </ul>
            <EnquiryButtons size="sm" className="mt-5" />
            <a href={`mailto:${EMAIL}`} className="btn btn-outline btn-sm mt-3 min-h-11">
              <Mail size={16} aria-hidden="true" /> Email us
            </a>
          </div>

          {/* Same stat strip as the hero */}
          <dl className="grid grid-cols-4 divide-x divide-orange-100 rounded-2xl border border-orange-100 bg-white py-3.5 shadow-soft">
            {trustStats.map((s) => (
              <div key={s.label} className="px-1 text-center sm:px-3">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-[0.68rem] leading-snug text-stone sm:text-xs">{s.label}</span>
                  <span className="mt-0.5 block whitespace-nowrap text-base font-extrabold leading-tight text-orange-600 sm:text-xl">{s.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="container-x mt-10">
        <Paras items={hero.afterTrust} />
      </div>
    </section>
  );
}

const lessonIcons: Record<string, LucideIcon> = { clock: Clock, users: Users, sweet: Candy, shield: ShieldCheck, monkey: Smartphone };

export function FounderSection() {
  const s = founderStory;
  return (
    <Band id="founder-story" eyebrow={s.eyebrow} title={s.title} tone="cream">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Photo image={images.founder} sizes="(min-width: 1024px) 30vw, 80vw" className="arch mx-auto max-w-sm lg:max-w-none" />
        </div>
        <div>
          <Paras items={s.story} />
          <blockquote className="my-7 max-w-3xl rounded-card border border-saffron-soft bg-white p-5 shadow-soft sm:p-6">
            <p className="display-3 text-ink">
              <Rich text={s.pullQuote} />
            </p>
          </blockquote>
          <Paras items={[s.promise]} />
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Our four principles">
            {s.principles.map((p) => (
              <li key={p} className="tag min-h-9 px-3.5 text-[0.8rem]">
                <ShieldCheck size={14} aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className={h3}>{s.lessons.title}</h3>
        <p className="lede mt-2 max-w-3xl">{s.lessons.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {s.lessons.items.map((item) => {
            const Icon = lessonIcons[item.icon] ?? Clock;
            return (
              <li key={item.text} className="reveal surface card-hover flex gap-4 p-4 sm:p-5">
                <span className="icon-badge size-11 rounded-xl">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-stone">
                  <Rich text={item.text} />
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="surface relative mt-12 overflow-hidden p-5 sm:p-8">
        <Lotus className="pointer-events-none absolute -right-4 -top-4 size-28 text-saffron-soft" />
        <div className="relative">
          <h3 className={h3}>{s.connection.title}</h3>
          <Paras items={s.connection.paragraphs} className="mt-3" />
        </div>
      </div>
    </Band>
  );
}

export function BrajSection() {
  const b = brajBhoomi;
  return (
    <Band id="braj-bhoomi" eyebrow={b.eyebrow} title={b.title} lede={b.intro} tone="white">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {b.cards.map((card) => (
          <article key={card.title} className="reveal surface p-5 sm:p-6">
            <h3 className={h3}>{card.title}</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone sm:text-[0.95rem]">
              {card.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Places of the wider Braj region">
        {b.places.map((p) => (
          <li key={p} className="surface flex gap-2.5 p-4 text-sm leading-relaxed text-stone">
            <MapPin size={18} className="mt-0.5 shrink-0 text-saffron" aria-hidden="true" />
            <span>
              <Rich text={p} />
            </span>
          </li>
        ))}
      </ul>
      <Paras items={[b.closing]} className="mt-8" />
    </Band>
  );
}
