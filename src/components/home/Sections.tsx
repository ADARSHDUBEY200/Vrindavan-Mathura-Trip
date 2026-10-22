import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Quote } from "lucide-react";
import { GuideCard } from "@/components/cards/GuideCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { TempleCard } from "@/components/cards/TempleCard";
import { TempleSkyline } from "@/components/svg/Ornaments";
import { DiyaIcon } from "@/components/svg/TravelIcons";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FaqList } from "@/components/ui/FaqList";
import { FilterChips, FilterRoot } from "@/components/ui/FilterChips";
import { CardRail } from "@/components/ui/CardRail";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/content/faqs";
import { festivals } from "@/content/festivals";
import { guides } from "@/content/guides";
import { about, circuits, experiences, testimonials, whyUs } from "@/content/sections";
import { photos } from "@/content/images";
import { durationFilters, packages } from "@/content/packages";
import { getTemples, temples } from "@/content/temples";

const seeAll = (href: string, label: string) => (
  <Link href={href} className="link-arrow text-sm">
    {label}
    <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
  </Link>
);

/* 3. Tour packages rail ---------------------------------------------------- */
export function FeaturedPackages() {
  const ordered = [...packages].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  return (
    <section aria-labelledby="packages-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          centerOnMobile
          id="packages-title"
          eyebrow="Tour packages"
          title="Private yatras, paced for darshan"
          lede="Starting points we tailor to your dates, your group and the temples closest to your heart."
          action={seeAll("/tour-packages", "All packages")}
        />
        <FilterRoot className="mt-7 lg:mt-8">
          <FilterChips name="home-duration" legend="Filter packages by duration" options={durationFilters.map((f) => ({ value: f.id, label: f.label }))} allLabel="All trips" />
          <CardRail label="Tour packages" className="reveal mt-5">
            {ordered.map((p) => (
              <li key={p.slug} data-filters={p.filters.join(" ")} className="w-[80%] sm:w-[46%] lg:w-[calc((100%-3.75rem)/4)]">
                <PackageCard pkg={p} />
              </li>
            ))}
          </CardRail>
        </FilterRoot>
      </div>
    </section>
  );
}

/* 4. Signature experiences ------------------------------------------------- */
export function Experiences() {
  return (
    <section aria-labelledby="experiences-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="text-center sm:text-left">
            <Eyebrow>Signature experiences</Eyebrow>
            <h2 id="experiences-title" className="display-2 mt-2.5">
              Moments that stay with you long after the yatra
            </h2>
          </div>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-1">
            {experiences.map((e, i) => (
              <li key={e.title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-50 text-xs font-bold text-ember-deep ring-1 ring-orange-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-ink">{e.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-stone">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul aria-label="Experience photos" className="reveal swipe-row sm:grid sm:grid-flow-row sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-2 lg:gap-5">
          {experiences.map((e, i) => {
            const img = photos[e.image];
            return (
              <li key={e.title} className={i % 2 === 1 ? "lg:translate-y-10" : ""}>
                <figure>
                  <div className={`zoom-media relative aspect-[4/3] overflow-hidden bg-sand shadow-soft sm:aspect-[4/5] ${e.shape === "arch" ? "rounded-card sm:rounded-t-full sm:rounded-b-[var(--radius-media)]" : "rounded-card"}`}>
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 26vw, (min-width: 640px) 30vw, 80vw" className="object-cover" placeholder="blur" />
                  </div>
                  <figcaption className="mt-2.5 flex items-center gap-2 text-[0.8rem] font-semibold text-ink-soft">
                    <span className="text-ember-deep">{String(i + 1).padStart(2, "0")}</span> {e.title}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 5. Temples rail ---------------------------------------------------------- */
export function TemplesSection() {
  const list = getTemples(["banke-bihari", "prem-mandir", "iskcon-krishna-balaram", "radha-raman", "nidhivan", "krishna-janmabhoomi", "dwarkadhish", "vishram-ghat", "radha-rani-temple-barsana", "daan-ghati-govardhan"]);
  return (
    <section aria-labelledby="temples-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          centerOnMobile
          id="temples-title"
          eyebrow="Temples you’ll visit"
          title="Darshan at the great temples of Braj"
          lede="Timings are indicative — they change with seasons and festivals, and we check them for your dates."
          action={seeAll("/temples", "All temples")}
        />
        <CardRail label="Temples" className="reveal mt-8 lg:mt-10">
          {list.map((t) => (
            <li key={t.slug} className="w-[46%] sm:w-[30%] lg:w-[calc((100%-5rem)/5)]">
              <TempleCard temple={t} />
            </li>
          ))}
        </CardRail>
      </div>
    </section>
  );
}

/* 6. Extend your yatra ----------------------------------------------------- */
export function Circuits() {
  return (
    <section aria-labelledby="circuits-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          centerOnMobile
          id="circuits-title"
          eyebrow="Extend your yatra"
          title="Combine Braj with India’s great tirthas"
          lede="Add the Taj Mahal, Shri Ram’s Ayodhya and Kashi, or the Ganga at Haridwar and Rishikesh — as one private journey."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10">
          {circuits.map((c) => {
            const img = photos[c.image];
            return (
              <li key={c.title} className="reveal">
                <article className="group relative h-full overflow-hidden rounded-2xl bg-ink shadow-soft transition-shadow duration-500 hover:shadow-lift">
                  <div className="zoom-media relative aspect-[16/11] sm:aspect-[4/5] lg:aspect-[4/4.4]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 31vw, 92vw" className="object-cover" placeholder="blur" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-ink shadow-glow">{c.days}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      <Link href={c.href} className="after:absolute after:inset-0 after:content-['']">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">{c.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300" aria-hidden="true">
                      See itinerary <ArrowRight size={16} className="btn-arrow" />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 7. Festival yatras rail -------------------------------------------------- */
export function FestivalsSection() {
  return (
    <section aria-labelledby="festivals-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          centerOnMobile
          id="festivals-title"
          eyebrow="Festival yatras"
          title="Be in Braj when it celebrates"
          lede="Dates follow the lunar calendar and move every year — confirm the date for your year, and book early."
          action={seeAll("/festivals", "All festivals")}
        />
        <CardRail label="Festivals" className="reveal mt-8 lg:mt-10">
          {festivals.map((f) => {
            const img = photos[f.image];
            return (
              <li key={f.slug} className="w-[80%] sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
                <article className="group surface card-hover relative flex h-full flex-col overflow-hidden">
                  <div className="zoom-media relative aspect-[16/10]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw" className="object-cover" placeholder="blur" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-ember-deep">
                      <CalendarDays size={13} aria-hidden="true" /> {f.months.replace(/\s*\(.*\)$/, "")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-base font-semibold leading-snug sm:text-[1.05rem]">
                      <Link href={`/festivals/${f.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {f.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone">{f.summary}</p>
                    <p className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 text-xs text-stone">
                      <span className="inline-flex min-w-0 items-center gap-1.5">
                        <DiyaIcon size={14} className="shrink-0 text-orange-500" />
                        <span className="truncate">{f.places.join(" · ")}</span>
                      </span>
                      <span className="link-arrow shrink-0 text-xs" aria-hidden="true">
                        Guide <ArrowRight size={14} className="btn-arrow" />
                      </span>
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </CardRail>
      </div>
    </section>
  );
}

/* 8. Why travel with us ---------------------------------------------------- */
export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile id="why-title" align="center" eyebrow="Why travel with us" title="Thoughtful planning, so you can simply be present" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-3">
          {whyUs.map((w) => (
            <li key={w.title} className="reveal surface card-hover flex gap-4 p-4 sm:p-5">
              <span className="icon-badge size-11 rounded-xl">
                <Icon name={w.icon} size={20} />
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 9. About highlights ------------------------------------------------------ */
export function AboutHighlights() {
  const [a, b, c] = about.images.map((k) => photos[k]);
  return (
    <section aria-labelledby="about-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-3 lg:max-w-none">
          <div className="arch zoom-media relative row-span-2 aspect-[3/5] bg-sand shadow-soft">
            <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" placeholder="blur" />
          </div>
          <div className="zoom-media relative aspect-square overflow-hidden rounded-card bg-sand shadow-soft">
            <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" placeholder="blur" />
          </div>
          <div className="zoom-media relative aspect-square overflow-hidden rounded-card bg-sand shadow-soft">
            <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" placeholder="blur" />
          </div>
        </div>
        <div>
          <div className="text-center sm:text-left">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 id="about-title" className="display-2 mt-2.5">
              {about.title}
            </h2>
          </div>
          {about.paragraphs.map((p) => (
            <p key={p} className="lede mt-4">
              {p}
            </p>
          ))}
          <ul className="mt-6 grid gap-2.5">
            {about.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[0.95rem] font-medium text-ink">
                <span className="icon-badge size-6 rounded-full">
                  <Check size={14} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href="/about" className="link-arrow mt-6 text-sm">
            More about how we plan <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* 11. Travel guide --------------------------------------------------------- */
export function GuidesSection() {
  const list = [guides[0], guides[2], guides[7]];
  return (
    <section aria-labelledby="guides-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="guides-title"
          eyebrow="Travel guide"
          title="Plan with confidence"
          lede="Honest, practical advice on seasons, routes, darshan and travelling with elders."
          action={seeAll("/travel-guide", "All guides")}
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {list.map((g) => (
            <li key={g.slug} className="reveal">
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 12. Testimonials — rendered only when real testimonials exist ------------ */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile id="testimonials-title" align="center" eyebrow="Guest stories" title="In our guests’ words" />
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name + t.quote.slice(0, 20)} className="surface p-5 sm:p-6">
              <figure>
                <Quote size={28} aria-hidden="true" className="text-saffron" />
                <blockquote className="mt-4 leading-relaxed text-ink-soft">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-ink">{t.name}</span>
                  {t.place && <span className="text-stone">, {t.place}</span>}
                  {t.trip && <span className="block text-stone">{t.trip}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 12b. Explore more — curated internal links ------------------------------- */
export function ExploreMore() {
  const groups = [
    { title: "Temples", links: temples.map((t) => ({ label: t.name.replace(/^Shri\s/, ""), href: `/temples/${t.slug}` })) },
    { title: "Tour packages", links: packages.map((p) => ({ label: p.title, href: `/tour-packages/${p.slug}` })) },
    { title: "Travel guides", links: guides.map((g) => ({ label: g.title.replace(/:.*$/, ""), href: `/travel-guide/${g.slug}` })) },
  ];
  return (
    <section aria-labelledby="explore-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile id="explore-title" eyebrow="Explore more" title="Popular across Braj" />
        <div className="mt-8 grid gap-7 lg:mt-10">
          {groups.map((g) => (
            <div key={g.title} className="reveal">
              <h3 className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-stone sm:text-left">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="chip transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:text-ember-deep hover:shadow-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 13. FAQ ------------------------------------------------------------------ */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="flex flex-col items-center sm:items-start">
          <SectionHeading centerOnMobile id="faq-title" eyebrow="FAQ" title="Questions pilgrims often ask" lede="Can’t find your answer? Ask us — we reply personally." />
          <Link href="/faq" className="link-arrow mt-5 text-sm">
            Read all FAQs <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
        <FaqList items={homeFaqs} />
      </div>
    </section>
  );
}

/* 14. Final CTA ------------------------------------------------------------ */
export function FinalCta({ title = "Ready to plan your Braj yatra?", text = "Tell us your dates, your group and the temples you long to see. We’ll suggest a calm, well-timed plan and an honest quote." }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-[1.5rem] bg-linear-to-r from-orange-500 to-amber-500 px-5 pb-16 pt-9 shadow-glow sm:px-10 sm:pb-20 sm:pt-11 lg:rounded-[1.75rem] lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <div className="relative grid items-center gap-7 text-center lg:grid-cols-[1.4fr_auto] lg:gap-12 lg:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/75">Free trip planning · Radhe Radhe</p>
              <h2 id="cta-title" className="display-2 mx-auto mt-3 max-w-2xl text-ink lg:mx-0">
                {title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink/85 lg:mx-0">{text}</p>
            </div>
            <div className="flex flex-col items-center gap-3 lg:items-end">
              <EnquiryButtons onGradient className="justify-center lg:justify-end" />
              <Link href="/contact" className="text-sm font-semibold text-ink underline underline-offset-4 hover:no-underline">
                Prefer a form? Send your trip details
              </Link>
            </div>
          </div>
          <TempleSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-white/25 sm:h-16 lg:h-14" />
        </div>
      </div>
    </section>
  );
}
