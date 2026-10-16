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
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/content/faqs";
import { festivals } from "@/content/festivals";
import { guides } from "@/content/guides";
import { about, circuits, experiences, testimonials, whyUs } from "@/content/home";
import { photos } from "@/content/images";
import { durationFilters, packages } from "@/content/packages";
import { getTemples } from "@/content/temples";

const viewAll = (href: string, label: string) => (
  <Link href={href} className="btn btn-outline btn-sm">
    {label}
    <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
  </Link>
);

/* 3. Featured tour packages ------------------------------------------------ */
export function FeaturedPackages() {
  const feature = packages.find((p) => p.featured) ?? packages[0];
  const rest = packages.filter((p) => p.slug !== feature.slug).slice(0, 6);
  return (
    <section aria-labelledby="packages-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="packages-title"
          eyebrow="Tour packages"
          title="Private yatras, paced for darshan"
          lede="Every trip is private and flexible — these are starting points we tailor to your dates, your group and the temples closest to your heart."
          action={viewAll("/tour-packages", "All packages")}
        />
        <div className="reveal mt-8 lg:mt-10">
          <PackageCard pkg={feature} variant="feature" />
        </div>
        <FilterRoot className="mt-8 lg:mt-10">
          <FilterChips name="home-duration" legend="Filter packages by duration" options={durationFilters.map((f) => ({ value: f.id, label: f.label }))} allLabel="All trips" />
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug} data-filters={p.filters.join(" ")}>
                <PackageCard pkg={p} />
              </li>
            ))}
          </ul>
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

/* 5. Temples you'll visit -------------------------------------------------- */
export function TemplesSection() {
  const list = getTemples(["banke-bihari", "prem-mandir", "iskcon-krishna-balaram", "radha-raman", "krishna-janmabhoomi", "dwarkadhish", "radha-rani-temple-barsana", "daan-ghati-govardhan"]);
  return (
    <section aria-labelledby="temples-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="temples-title"
          eyebrow="Temples you’ll visit"
          title="Darshan at the great temples of Braj"
          lede="Timings shown are indicative — they change with the seasons and festivals, and we check them for your dates."
          action={viewAll("/temples", "All temples")}
        />
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:mt-10 lg:grid-cols-4">
          {list.map((t) => (
            <li key={t.slug} className="reveal">
              <TempleCard temple={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 6. Extend your yatra ----------------------------------------------------- */
export function Circuits() {
  return (
    <section aria-labelledby="circuits-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="circuits-title"
          eyebrow="Extend your yatra"
          title="Combine Braj with India’s great tirthas"
          lede="Add the Taj Mahal, Shri Ram’s Ayodhya and Kashi, or the Ganga at Haridwar and Rishikesh — all as one private journey."
        />
        <ul className="reveal swipe-row mt-8 lg:mt-10 md:grid md:grid-flow-row md:grid-cols-3 md:gap-5 md:overflow-visible">
          {circuits.map((c) => {
            const img = photos[c.image];
            return (
              <li key={c.title}>
                <article className="group relative h-full overflow-hidden rounded-card bg-ink">
                  <div className="zoom-media relative aspect-[4/5] lg:aspect-[4/4.6]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 31vw, 78vw" className="object-cover" placeholder="blur" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/5" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="tag bg-white/95">{c.days}</span>
                    <h3 className="mt-2.5 text-lg font-bold text-white sm:text-xl">
                      <Link href={c.href} className="after:absolute after:inset-0 after:content-['']">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{c.text}</p>
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

/* 7. Festival yatras ------------------------------------------------------- */
export function FestivalsSection() {
  return (
    <section aria-labelledby="festivals-title" className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="festivals-title"
          eyebrow="Festival yatras"
          title="Be in Braj when it celebrates"
          lede="Festival dates follow the lunar calendar and move every year — confirm the date for your year, and book early."
          action={
            <Link href="/festivals" className="btn btn-outline btn-sm">
              All festivals <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
            </Link>
          }
        />
        <ul className="reveal swipe-row mt-8 lg:mt-10 md:grid md:grid-flow-row md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3">
          {festivals.map((f) => {
            const img = photos[f.image];
            return (
              <li key={f.slug}>
                <article className="group surface card-hover relative flex h-full flex-col overflow-hidden">
                  <div className="zoom-media relative aspect-[16/10]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 78vw" className="object-cover" placeholder="blur" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ember-deep">
                      <CalendarDays size={14} aria-hidden="true" /> {f.months}
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold sm:text-lg">
                      <Link href={`/festivals/${f.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {f.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-stone">{f.summary}</p>
                    <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs text-stone">
                      <DiyaIcon size={14} className="text-orange-500" /> {f.places.join(" · ")}
                    </p>
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
          action={viewAll("/travel-guide", "All guides")}
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

/* 13. FAQ ------------------------------------------------------------------ */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="bg-white py-14 sm:py-16 lg:py-20">
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
        <div className="relative overflow-hidden rounded-card bg-linear-to-r from-orange-500 to-amber-500 px-5 pb-16 pt-10 text-center shadow-glow sm:px-10 sm:pb-20 sm:pt-12 lg:px-16">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">Radhe Radhe</p>
            <h2 id="cta-title" className="display-2 mx-auto mt-3 max-w-2xl text-ink">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink/85 sm:text-base">{text}</p>
            <EnquiryButtons onGradient className="mt-7 justify-center" />
            <Link href="/contact" className="mt-5 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:no-underline">
              Prefer a form? Send us your trip details
            </Link>
          </div>
          <TempleSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-white/25 sm:h-16" />
        </div>
      </div>
    </section>
  );
}
