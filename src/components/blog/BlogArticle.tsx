import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Clock3, Mail, MapPin, Phone, Pin, Play, Star } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FacebookIcon, WhatsappIcon, XIcon, YoutubeIcon } from "@/components/svg/TravelIcons";
import {
  ADDRESS,
  FOUNDED,
  FOUNDER,
  OPENING_HOURS,
  PILGRIMS,
  RATING,
  REVIEW_COUNT,
  STARTING_PRICE,
  YEARS,
  formatAddress,
  formatInr,
  mailtoHref,
  phoneHref,
  site,
} from "@/config/site";
import { photos } from "@/content/images";
import type { Faq } from "@/content/types";
import { formatBlogDate, youtubeId, youtubeThumbUrl, youtubeWatchUrl, type BlogSeoContent } from "@/lib/cms/blog-fields";
import { blogPath, type BlogPost, type BlogSummary } from "@/lib/cms/blogs";
import type { Crumb } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { blogListHref } from "./BlogParts";

/* Anchors of the page's own sections — used by the table of contents and reserved from content headings. */
export const SECTION_IDS = {
  quickAnswer: "quick-answer",
  rating: "guide-rating",
  quickFacts: "quick-facts",
  takeaways: "key-takeaways-at-a-glance",
  guideIntro: "a-word-from-your-guide",
  honest: "the-honest-bit",
  related: "related-guides",
  guide: "meet-your-guide",
  faqs: "faq",
  contact: "enquiry",
  recommendations: "recommendation",
  reviews: "pilgrim-reviews",
  videos: "video-testimonials",
  timings: "temple-timings",
  author: "meet-the-author",
} as const;

const hasText = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const filled = <T,>(list: T[] | undefined, test: (item: T) => boolean) => (Array.isArray(list) ? list.filter(test) : []);

/** The CMS lists, trimmed to rows that actually have content. */
export function blogBlocks(seo: BlogSeoContent) {
  return {
    quickFacts: filled(seo.quickFacts, (f) => hasText(f?.label) && hasText(f?.value)),
    takeaways: filled(seo.keyTakeaways, (t) => hasText(t?.text)),
    related: filled(seo.relatedLinks, (l) => hasText(l?.label) && hasText(l?.href)),
    recommendations: filled(seo.recommendations, (r) => hasText(r?.situation) || hasText(r?.recommendation)),
    reviews: filled(seo.reviews, (r) => hasText(r?.text) && hasText(r?.name)),
    videos: filled(seo.videoTestimonials, (v) => Boolean(youtubeId(v?.url))),
    videoId: youtubeId(seo.videoSrc),
  };
}

/* ------------------------------------------------------------------ */
/* Author helpers                                                      */
/* ------------------------------------------------------------------ */

export type AuthorInfo = { name: string; role: string; image?: string; bio?: string; isFounder: boolean };

/** Author box data: CMS fields first, then the founder's own facts from the site config. */
export function authorInfo(blog: BlogPost): AuthorInfo {
  const name = blog.author || FOUNDER.name;
  const isFounder = name.trim().toLowerCase() === FOUNDER.name.toLowerCase();
  const { seo } = blog;
  return {
    name,
    isFounder,
    role: seo.authorRole || (isFounder ? `${FOUNDER.jobTitle}, ${site.name}` : site.name),
    // The about-page founder photo is still a placeholder graphic, so only a CMS-uploaded photo is used.
    image: seo.authorImage || undefined,
    bio:
      seo.guideBio ||
      (isFounder
        ? `Born in ${FOUNDER.bornIn} and guiding pilgrims through Braj since ${FOUNDED}. ${site.name} was built on one belief: a well-planned yatra is a deeply felt one. ${PILGRIMS} pilgrims have trusted us with their most sacred journeys.`
        : undefined),
  };
}

const initial = (name: string) => name.trim().charAt(0).toUpperCase() || "ॐ";

function Avatar({ name, image, size, className = "" }: { name: string; image?: string; size: number; className?: string }) {
  if (image) {
    return (
      <span className={`relative block shrink-0 overflow-hidden rounded-full bg-gray-200 ${className}`} style={{ width: size, height: size }}>
        <Image src={image} alt={name} fill sizes={`${size * 2}px`} className="object-cover" />
      </span>
    );
  }
  return (
    <span className={`blog-avatar ${className}`} style={{ width: size, height: size, fontSize: size * 0.4 }} aria-hidden="true">
      {initial(name)}
    </span>
  );
}

function Stars({ value, size = 14, className = "" }: { value: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} aria-hidden="true" className={i < Math.round(value) ? "fill-[#ff8c00] text-[#ff8c00]" : "fill-gray-200 text-gray-200"} />
      ))}
    </span>
  );
}

/** Centred section heading: eyebrow, title, gradient rule, optional lede. */
function CenteredHeading({ id, eyebrow, title, lede, size = "md" }: { id: string; eyebrow?: string; title: ReactNode; lede?: ReactNode; size?: "md" | "lg" }) {
  return (
    <div className="mb-8 text-center md:mb-10">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ember-deep">{eyebrow}</p>}
      <h2 id={id} className={`font-bold text-gray-900 ${size === "lg" ? "text-2xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-linear-to-r from-amber-500 to-orange-400" aria-hidden="true" />
      {lede && <div className="mx-auto mt-3 max-w-lg text-sm text-gray-500">{lede}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function BlogHero({ blog, crumbs, author, rating }: { blog: BlogPost; crumbs: Crumb[]; author: AuthorInfo; rating?: { value: number; count?: number } }) {
  const wa = whatsappLink(`Radhe Radhe! I read "${blog.title}" and would like help planning my visit.`);
  const label = [blog.category, blog.location, `Updated ${formatBlogDate(blog.updatedOn, true)}`].filter(Boolean).join(" · ");
  const tiles = [
    { value: PILGRIMS, label: "Pilgrims" },
    { value: `${RATING}★`, label: "Rating" },
    { value: YEARS, label: "Years in Braj" },
  ];
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-orange-700 via-orange-600 to-amber-500 px-4 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-16">
      <div className="pointer-events-none absolute left-0 top-0 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200 opacity-30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-72 translate-x-1/3 translate-y-1/3 rounded-full bg-orange-300 opacity-30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-12 w-full sm:h-16 md:h-20">
          <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <nav aria-label="Breadcrumb" className="relative mx-auto max-w-6xl pb-4 pt-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.href} className={`flex items-center gap-1.5 ${last ? "min-w-0" : ""}`}>
                {last ? (
                  <span aria-current="page" className="block max-w-50 truncate font-medium text-white sm:max-w-sm">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="text-white/60">
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div className="space-y-4 text-center text-white md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/90">{label}</p>
          <h1 id="page-title" className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl lg:text-[2rem]">
            {blog.title}
          </h1>
          <div className="mx-auto h-0.5 w-12 bg-white/60 md:mx-0" aria-hidden="true" />
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white md:mx-0">
            By <strong className="font-semibold">{author.name}</strong>, {site.name}
            <span aria-hidden="true"> &nbsp;·&nbsp; </span>
            <time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time>
            <span aria-hidden="true"> &nbsp;·&nbsp; </span>
            {blog.readMinutes} min read
            {author.isFounder && (
              <>
                <span aria-hidden="true"> &nbsp;·&nbsp; </span>
                <Link href="/about" className="underline-offset-2 hover:underline">
                  Know more about author
                </Link>
              </>
            )}
          </p>
          {rating && (
            <p className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
              <Stars value={rating.value} size={15} className="[&_svg]:fill-[#ffd700] [&_svg]:text-[#ffd700]" />
              <span className="text-sm font-bold">{rating.value}/5.0</span>
              {rating.count ? <span className="text-[13px] text-white/80">· {rating.count.toLocaleString("en-IN")} ratings</span> : null}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3 pt-1 md:justify-start">
            <a
              href={wa ?? "#enquiry"}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 shadow transition hover:shadow-lg"
            >
              Plan Your Visit
            </a>
            <a href="#blog-content" className="flex items-center gap-1 text-sm text-white/90 hover:text-white">
              Learn More <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-2 w-full md:mt-0">
          <div className="relative overflow-hidden rounded-2xl bg-orange-900/30 shadow-2xl">
            <div className="relative aspect-16/10 w-full overflow-hidden">
              {blog.image ? (
                <>
                  <Image src={blog.image.src} alt="" aria-hidden="true" fill sizes="256px" className="scale-110 object-cover blur-2xl brightness-50" />
                  <Image src={blog.image.src} alt={blog.image.alt} fill preload sizes="(min-width: 1152px) 552px, (min-width: 768px) 46vw, 92vw" className="object-contain" />
                </>
              ) : (
                <div className="grid size-full place-items-center text-6xl" aria-hidden="true">
                  🪷
                </div>
              )}
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-2 text-center" aria-label="About our team">
            {tiles.map((t) => (
              <li key={t.label} className="rounded-xl bg-white/20 py-2.5 backdrop-blur">
                <span className="block text-sm font-bold text-white sm:text-base">{t.value}</span>
                <span className="block text-xs text-white/85">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebars                                                            */
/* ------------------------------------------------------------------ */

export function CategoriesCard({ categories, active }: { categories: { name: string; slug: string; count: number }[]; active: string }) {
  if (!categories.length) return null;
  return (
    <nav aria-labelledby="cat-title" className="rounded-2xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-5 w-1 rounded-full bg-linear-to-b from-orange-400 to-amber-500" aria-hidden="true" />
        <h2 id="cat-title" className="text-sm font-semibold text-gray-800">
          Blog Categories
        </h2>
      </div>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={blogListHref({ category: c.slug })}
              aria-current={c.slug === active ? "page" : undefined}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-white ${
                c.slug === active ? "bg-orange-50 text-ember-deep ring-1 ring-orange-200" : "bg-white/70 text-gray-700"
              }`}
            >
              <span className="min-w-0 leading-snug">{c.name}</span>
              <ChevronRight size={15} aria-hidden="true" className="shrink-0 text-gray-400" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function EnquiryCard() {
  const img = photos["keshi-ghat"];
  return (
    <section aria-labelledby="journey-title" className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg">
      <div className="relative h-44 w-full">
        <Image src={img.src} alt={img.alt} fill sizes="290px" className="object-cover" placeholder="blur" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" aria-hidden="true" />
        <h2 id="journey-title" className="absolute inset-x-3 bottom-3 text-base font-semibold leading-snug text-white">
          Plan Your Divine Journey
        </h2>
      </div>
      <div className="p-4">
        <p className="text-[13px] leading-relaxed text-gray-600">Private Mathura & Vrindavan trips with your own car, a darshan-timed plan and a local team on WhatsApp — all arranged with care.</p>
        <a
          href="#enquiry"
          className="mt-4 block w-full rounded-full bg-linear-to-r from-amber-600 to-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-amber-300/40"
        >
          Send Enquiry
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Article top: quick answer, navigation, rating                       */
/* ------------------------------------------------------------------ */

export function QuickAnswer({ html }: { html: string }) {
  return (
    <section id={SECTION_IDS.quickAnswer} aria-labelledby="quick-answer-title" className="blog-tldr">
      <h2 id="quick-answer-title" className="blog-tldr-label">
        <Pin size={13} aria-hidden="true" className="fill-current" /> Quick Answer
      </h2>
      <div className="blog-tldr-body" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

export type TocItem = { id: string; label: string; sub?: boolean };

export function QuickNavigation({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-labelledby="toc-title" className="blog-toc">
      <h2 id="toc-title" className="blog-toc-label">
        Quick Navigation <span className="blog-toc-count">[{items.length} sections]</span>
      </h2>
      <ol>
        {items.map((t) => (
          <li key={t.id} className={t.sub ? "toc-h3" : undefined}>
            <a href={`#${t.id}`}>{t.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RatingStrip({ value, count }: { value: number; count?: number }) {
  return (
    <section id={SECTION_IDS.rating} aria-label="Guide rating" className="blog-rating">
      <Stars value={value} size={20} />
      <span className="text-lg font-extrabold text-[#1a0a00]">{value}/5.0</span>
      {count ? <span className="text-[13px] text-gray-500">· {count.toLocaleString("en-IN")} ratings</span> : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Article body: CMS blocks rendered in the same .blog-content styles  */
/* ------------------------------------------------------------------ */

const paragraphs = (text: string) =>
  text
    .split(/\n{2,}|\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/**
 * The CMS blocks before and after the body are separate `.blog-content` siblings of the CMS HTML,
 * so `> :first-child` spacing and the drop cap (first paragraph of the body) apply to the right element.
 */
export function ArticleBody({ blog, html, author }: { blog: BlogPost; html: string; author: AuthorInfo }) {
  const { seo } = blog;
  const b = blogBlocks(seo);
  const hasBefore = b.quickFacts.length > 0 || b.takeaways.length > 0 || hasText(seo.guideIntro);
  const hasAfter = hasText(seo.honestNote) || hasText(seo.guideTip) || b.related.length > 0;
  return (
    <>
      {hasBefore && (
        <div className="blog-content">
          {b.quickFacts.length > 0 && (
        <>
          <h2 id={SECTION_IDS.quickFacts}>{blog.location ? `${blog.location}: Quick Facts` : "Quick Facts"}</h2>
          <div className="blog-table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Detail</th>
                  <th scope="col">Information</th>
                </tr>
              </thead>
              <tbody>
                {b.quickFacts.map((f, i) => (
                  <tr key={f.id ?? i}>
                    <td>{f.label}</td>
                    <td>{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {b.takeaways.length > 0 && (
        <>
          <h2 id={SECTION_IDS.takeaways}>Key Takeaways at a Glance</h2>
          <ul>
            {b.takeaways.map((t, i) => (
              <li key={t.id ?? i}>{t.text}</li>
            ))}
          </ul>
        </>
      )}
      {hasText(seo.guideIntro) && (
        <>
          <h2 id={SECTION_IDS.guideIntro}>A Word From Your Guide</h2>
          {paragraphs(seo.guideIntro).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      )}
        </div>
      )}

      {html.trim() && <div className={`blog-content has-dropcap ${hasBefore ? "mt-6" : ""}`} dangerouslySetInnerHTML={{ __html: html }} />}

      {hasAfter && (
        <div className="blog-content mt-6">
      {hasText(seo.honestNote) && (
        <>
          <h2 id={SECTION_IDS.honest}>The Honest Bit</h2>
          {paragraphs(seo.honestNote).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      )}
      {hasText(seo.guideTip) && (
        <div className="blog-table-scroll">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Tip from {author.name}:</strong> {seo.guideTip}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {b.related.length > 0 && (
        <>
          <h2 id={SECTION_IDS.related}>Related Guides</h2>
          <ul>
            {b.related.map((l, i) => (
              <li key={l.id ?? i}>
                {/^https?:\/\//i.test(l.href) ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Meet your guide (video)                                             */
/* ------------------------------------------------------------------ */

export function GuideVideo({ videoId, seo, author }: { videoId: string; seo: BlogSeoContent; author: AuthorInfo }) {
  const minutes = Number(seo.videoDuration);
  return (
    <section id={SECTION_IDS.guide} aria-labelledby="guide-video-title" className="blog-video rounded-3xl">
      <div className="relative z-10 mx-auto max-w-190 text-center">
        <p className="mb-4 inline-block rounded-full border border-orange-600/30 bg-orange-600/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-400">
          Meet your guide
        </p>
        <h2 id="guide-video-title" className="mb-2 text-xl font-extrabold leading-tight text-white sm:text-[28px]">
          {seo.videoTitle || `${author.name} — Born & Raised in Braj`}
        </h2>
        <p className="mb-8 text-sm text-white/60">
          Guiding pilgrims through Mathura & Vrindavan since {FOUNDED} · {PILGRIMS} pilgrims served
        </p>
        <a href={youtubeWatchUrl(videoId)} target="_blank" rel="noopener noreferrer" className="blog-video-frame group block">
          <Image src={youtubeThumbUrl(videoId)} alt="" fill sizes="(min-width: 1024px) 760px, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" aria-hidden="true" />
          <span className="blog-play" aria-hidden="true">
            <Play size={28} className="ml-1 fill-current" />
          </span>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/50 px-3.5 py-1 text-xs font-medium text-white/90 backdrop-blur">
            {seo.videoOverlayTitle || "Watch on YouTube"}
            {Number.isFinite(minutes) && minutes > 0 ? ` · ${minutes} min` : ""}
          </span>
          <span className="sr-only">Play video: {seo.videoTitle || `Video guide by ${author.name}`} (opens YouTube)</span>
        </a>
        <div className="mt-6 flex items-center gap-3 text-left">
          <Avatar name={author.name} image={author.image} size={40} />
          <div>
            <p className="text-sm font-bold text-white">{author.name}</p>
            <p className="text-xs text-white/60">{author.role}</p>
          </div>
          {author.isFounder && (
            <span className="ml-auto rounded-full border border-orange-600/40 bg-orange-600/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-orange-400">Founder</span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-width sections                                                 */
/* ------------------------------------------------------------------ */

export function PlanningBox({ title, text, message }: { title?: string; text?: string; message: string }) {
  const wa = whatsappLink(message);
  return (
    <section aria-labelledby="planning-title" className="px-4 py-10 sm:px-6 lg:px-20">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-amber-300 bg-amber-50 p-8 text-center md:p-10">
        <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-amber-300/20 blur-2xl" aria-hidden="true" />
        <div className="mb-4 text-3xl" aria-hidden="true">
          🙏
        </div>
        <h2 id="planning-title" className="text-xl font-bold text-gray-900 md:text-2xl">
          {title || "Planning a Vrindavan Tour?"}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 md:text-base">
          {text || `${site.name} plans private Mathura–Vrindavan yatras around darshan timings — your own car and driver, local know-how and WhatsApp support throughout.`}
        </p>
        <p className="mt-2 text-sm font-semibold text-amber-800">Trips from {formatInr(STARTING_PRICE)} · private car & local team</p>
        <div className="mt-6">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-700 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-green-800 hover:shadow-lg">
              <WhatsappIcon size={18} /> WhatsApp {site.contact.phone}
            </a>
          ) : (
            <a href="#enquiry" className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3 text-sm font-semibold text-white">
              Send an enquiry
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section aria-labelledby={SECTION_IDS.faqs} className="bg-white px-4 py-10 sm:px-6 md:py-16 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <CenteredHeading id={SECTION_IDS.faqs} title="Frequently Asked Questions" size="lg" />
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={f.q} className="blog-faq" open={i === 0}>
              <summary className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="font-medium text-gray-800">{f.q}</span>
                <span className="blog-faq-icon shrink-0 text-xl font-bold text-amber-700" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, children, href, external }: { icon: ReactNode; label: string; children: ReactNode; href?: string; external?: boolean }) {
  const body = (
    <>
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">{icon}</span>
      <span>
        <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wide text-ember-deep">{label}</span>
        <span className="block text-sm font-medium leading-snug text-gray-800">{children}</span>
      </span>
    </>
  );
  const cls = "flex items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50/40 p-4 transition hover:bg-orange-50";
  return href ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** "Visit us" in the reference: contact cards beside the enquiry form (and a map once an address is configured). */
export function ContactSection({ message }: { message: string }) {
  const wa = whatsappLink(message);
  const tel = phoneHref();
  const address = formatAddress();
  const town = site.address?.locality ?? ADDRESS.addressLocality;
  return (
    <section aria-labelledby={SECTION_IDS.contact} className="bg-white px-4 py-12 sm:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <CenteredHeading
          id={SECTION_IDS.contact}
          eyebrow="Talk to a local"
          title={`Plan With Us in ${town}`}
          lede="A local Braj team — message us, call, or send your trip details and we’ll reply with a plan and an honest quote."
        />
        <div className="grid items-stretch gap-6 md:grid-cols-5 lg:gap-10">
          <div className="flex flex-col gap-4 md:col-span-2">
            {address && (
              <ContactRow icon={<MapPin size={18} aria-hidden="true" />} label="Address">
                {address}
              </ContactRow>
            )}
            {wa && (
              <ContactRow icon={<WhatsappIcon size={18} />} label="WhatsApp / Book" href={wa} external>
                {site.contact.phone}
              </ContactRow>
            )}
            {tel && (
              <ContactRow icon={<Phone size={18} aria-hidden="true" />} label="Call line" href={tel}>
                {site.contact.phone}
              </ContactRow>
            )}
            <ContactRow icon={<Mail size={18} aria-hidden="true" />} label="Email" href={mailtoHref("Trip enquiry from the blog")}>
              <span className="break-all">{site.contact.email}</span>
            </ContactRow>
            {OPENING_HOURS && (
              <ContactRow icon={<Clock3 size={18} aria-hidden="true" />} label="Office hours">
                Daily · {OPENING_HOURS.opens} – {OPENING_HOURS.closes}
              </ContactRow>
            )}
            <ContactRow icon={<Star size={18} aria-hidden="true" />} label="Pilgrim rating">
              {RATING} ★{REVIEW_COUNT ? ` · ${REVIEW_COUNT} reviews` : ` · ${PILGRIMS} pilgrims served`}
            </ContactRow>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:shadow-xl"
              >
                <WhatsappIcon size={18} /> Chat on WhatsApp
              </a>
            )}
          </div>
          <div className="min-w-0 md:col-span-3">
            <EnquiryForm title="Send us your trip details" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecommendationSection({ items, author, message }: { items: NonNullable<BlogSeoContent["recommendations"]>; author: AuthorInfo; message: string }) {
  const wa = whatsappLink(message);
  return (
    <section aria-labelledby={SECTION_IDS.recommendations} className="border-t border-[#f3e8d8] bg-white px-4 py-14">
      <div className="mx-auto max-w-225">
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ember-deep">Expert advice</p>
          <h2 id={SECTION_IDS.recommendations} className="mb-2 text-xl font-extrabold text-[#1a0a00] sm:text-[26px]">
            Our Recommendation — Based on Your Situation
          </h2>
          <p className="text-[15px] text-gray-500">
            {author.name} has guided {PILGRIMS} pilgrims. Here is what we suggest for each type of visitor.
          </p>
        </div>
        <ul className="mb-9 grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {items.map((r, i) => (
            <li key={r.id ?? i} className="blog-rec-card">
              <span className="w-10 shrink-0 text-[32px] font-black leading-none text-orange-600/20" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                {r.situation && (
                  <p className="mb-1.5 text-sm font-semibold text-[#1a0a00]">
                    {/^if\b/i.test(r.situation) ? r.situation : `If you are ${r.situation.charAt(0).toLowerCase()}${r.situation.slice(1)}`}
                  </p>
                )}
                {r.recommendation && <p className="mb-3 text-sm leading-relaxed text-gray-500">{r.recommendation}</p>}
                {r.packageLink && (
                  <a
                    href={r.packageLink}
                    {...(/^https?:\/\//i.test(r.packageLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-block border-b-[1.5px] border-orange-600/30 text-[13px] font-semibold text-ember-deep transition hover:border-ember-deep"
                  >
                    View {r.packageName || "package"} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-[#f3e8d8] pt-6 text-center">
          <p className="mb-3 text-[15px] text-gray-500">Not sure which package suits you?</p>
          <a
            href={wa ?? "#enquiry"}
            {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🙏 Talk to Us
          </a>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection({ reviews, seo }: { reviews: NonNullable<BlogSeoContent["reviews"]>; seo: BlogSeoContent }) {
  const score = Number(seo.totalRating) > 0 ? Number(seo.totalRating) : RATING;
  const count = Number(seo.totalReviews) > 0 ? Number(seo.totalReviews) : REVIEW_COUNT;
  const stats = [count ? { value: `${count.toLocaleString("en-IN")}+`, label: "Pilgrim reviews" } : null, { value: PILGRIMS, label: "Pilgrims served" }, { value: `${YEARS}`, label: "Years in Braj" }].filter(
    (s): s is { value: string; label: string } => Boolean(s),
  );
  return (
    <section aria-labelledby={SECTION_IDS.reviews} className="relative overflow-hidden bg-linear-to-br from-[#fff8f2] to-[#fff3e8] px-4 py-16 md:py-18">
      <div className="relative mx-auto max-w-240">
        <div className="mb-10 md:mb-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ember-deep">Verified pilgrim experiences</p>
          <h2 id={SECTION_IDS.reviews} className="mb-6 text-[22px] font-extrabold leading-tight text-[#1a0a00] sm:text-[30px]">
            What Our Pilgrims Say
          </h2>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#f3e8d8] bg-white px-7 py-5 shadow-[0_4px_16px_rgba(232,101,10,0.06)] sm:gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[40px] font-black leading-none text-[#e8650a] sm:text-[56px]">{score}</span>
              <Stars value={score} size={20} />
              <span className="text-xs text-gray-500">out of 5</span>
            </div>
            <div className="hidden h-15 w-px shrink-0 bg-[#f3e8d8] sm:block" aria-hidden="true" />
            <dl className="flex flex-wrap gap-5 sm:gap-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-0.5">
                  <dt className="text-xs text-gray-500">{s.label}</dt>
                  <dd className="text-[22px] font-extrabold leading-none text-[#1a0a00]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={`${r.name}-${i}`}>
              <article className="blog-review-card h-full">
                <div className="flex items-start gap-3">
                  <Avatar name={r.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-snug text-[#1a0a00]">{r.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">{[r.city, r.date].filter(Boolean).join(" · ")}</p>
                    {Number(r.rating) > 0 && <Stars value={Number(r.rating)} size={13} className="mt-1" />}
                  </div>
                </div>
                <blockquote className="blog-review-quote">“{r.text}”</blockquote>
                {r.packageName && (
                  <p className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-ember-deep">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-orange-600/10 text-[9px]" aria-hidden="true">
                      ✓
                    </span>
                    {r.packageName}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function VideoTestimonialsSection({ videos, message }: { videos: NonNullable<BlogSeoContent["videoTestimonials"]>; message: string }) {
  const wa = whatsappLink(message);
  const yt = site.social.youtube;
  return (
    <section aria-labelledby={SECTION_IDS.videos} className="bg-linear-to-b from-[#120800] to-[#1a0a00] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-600/40 bg-orange-600/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-300">
          <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" /> सच्चे भक्तों की आवाज़ — REAL VOICES
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-orange-400/80">Pilgrim testimonials</p>
        <h2 id={SECTION_IDS.videos} className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-5xl">
          Watch What Our Pilgrims <span className="text-amber-400">Truly Feel</span>
        </h2>
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x gap-5 overflow-x-auto px-4 pb-2 text-left">
          {videos.map((v, i) => {
            const id = youtubeId(v.url)!;
            return (
              <li key={`${id}-${i}`} className="w-[62%] shrink-0 snap-start sm:w-[34%] lg:w-[calc((100%-5rem)/5)]">
                <a href={youtubeWatchUrl(id)} target="_blank" rel="noopener noreferrer" className="group relative block aspect-9/16 overflow-hidden rounded-2xl border border-orange-900/60 bg-black">
                  <Image src={youtubeThumbUrl(id)} alt="" fill sizes="(min-width: 1024px) 220px, 62vw" className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/30" aria-hidden="true" />
                  <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Video</span>
                  {v.city && <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">{v.city}</span>}
                  <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur transition group-hover:scale-110" aria-hidden="true">
                    <Play size={22} className="ml-0.5 fill-current" />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 text-sm font-bold leading-snug text-white">{v.title || "Pilgrim review"}</span>
                  <span className="sr-only"> (opens YouTube)</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {yt && (
            <a href={yt} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(255,0,0,0.35)] transition hover:-translate-y-0.5">
              <YoutubeIcon size={18} /> Watch more on YouTube
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp-deep px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition hover:-translate-y-0.5">
              <WhatsappIcon size={18} /> Plan My Yatra on WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function TimingsSection({ title, note, html }: { title?: string; note?: string; html: string }) {
  return (
    <section aria-labelledby={SECTION_IDS.timings} className="bg-linear-to-b from-amber-50 to-white px-4 py-10 sm:px-8 md:py-16 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <CenteredHeading
          id={SECTION_IDS.timings}
          eyebrow="Darshan schedule"
          title={title || "Temple Darshan Timings"}
          lede={
            <span className="inline-block rounded-xl border border-amber-200 bg-amber-100 px-4 py-1.5 font-medium text-amber-900">
              {note || "General guideline — timings shift with seasons and festivals."}
            </span>
          }
        />
        <div className="timings-table" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="mt-3 text-center text-xs italic text-gray-500">★ Timings are general guidelines. Always verify on-site, especially on Ekadashi, Janmashtami, Holi and other major festivals.</p>
      </div>
    </section>
  );
}

export function AuthorSection({ author }: { author: AuthorInfo }) {
  const chips = [`${PILGRIMS} Pilgrims Guided`, `Guiding Since ${FOUNDED}`, author.isFounder ? `Born in ${FOUNDER.bornIn}` : null, "Every Season · Every Week"].filter(Boolean) as string[];
  return (
    <section aria-labelledby={SECTION_IDS.author} className="bg-white px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-100 bg-linear-to-br from-[#fffdf8] to-white p-6 shadow-sm sm:p-12">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <Avatar name={author.name} image={author.image} size={80} />
          <div className="text-center sm:text-left">
            <h2 id={SECTION_IDS.author} className="text-2xl font-bold text-gray-900">
              {author.name}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-700">{author.role}</p>
            {author.isFounder && (
              <Link href="/about" className="text-sm text-ember-deep underline underline-offset-2">
                Know more about author
              </Link>
            )}
          </div>
        </div>
        {author.bio && <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-gray-600 md:text-base">{author.bio}</p>}
        <ul className="no-scrollbar mt-6 flex flex-nowrap justify-start gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {chips.map((c) => (
            <li key={c} className="shrink-0 whitespace-nowrap rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-lg font-semibold tracking-wide text-amber-700">Jai Shri Krishna 🙏</p>
      </div>
    </section>
  );
}

function LatestCard({ blog }: { blog: BlogSummary }) {
  return (
    <Link href={blogPath(blog.slug)} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
        <div className="relative h-52 shrink-0 overflow-hidden bg-orange-50">
          {blog.image && <Image src={blog.image.src} alt={blog.image.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />}
          <span className="absolute left-3 top-3 rounded-full bg-amber-700/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">{blog.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-amber-700">{blog.title}</h3>
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">{blog.excerpt}</p>
          <div className="mt-4 flex items-center justify-between">
            <time dateTime={blog.publishedAt} className="text-xs text-gray-500">
              {formatBlogDate(blog.publishedAt)}
            </time>
            <span className="text-sm font-semibold text-amber-700">Read More →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function LatestSection({ blogs, allHref }: { blogs: BlogSummary[]; allHref: string }) {
  return (
    <section aria-labelledby="latest-title" className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-700">Continue reading</p>
          <h2 id="latest-title" className="text-3xl font-bold text-gray-900 md:text-4xl">
            Latest From Our Blog
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-amber-500 to-orange-400" aria-hidden="true" />
        </div>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <li key={b.slug}>
              <LatestCard blog={b} />
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href={allHref} className="inline-flex items-center gap-1.5 rounded-full border border-amber-500 px-8 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-50">
            View All Articles <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ShareSection({ path, title }: { path: string; title: string }) {
  const url = absoluteUrl(path);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: WhatsappIcon, cls: "bg-whatsapp-deep text-white hover:bg-[#19a84f]" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, Icon: XIcon, cls: "bg-gray-900 text-white hover:bg-black" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: FacebookIcon, cls: "bg-[#1877f2] text-white hover:bg-[#0f63d4]" },
  ];
  return (
    <section aria-labelledby="share-title" className="bg-white px-4 pb-16 pt-2">
      <div className="mx-auto max-w-3xl border-t border-gray-200 pt-8">
        <h2 id="share-title" className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Share this article
        </h2>
        <ul className="flex flex-wrap gap-3">
          {links.map(({ label, href, Icon, cls }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${cls}`}>
                <Icon size={16} />
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
