import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Star } from "lucide-react";
import { Lotus } from "@/components/svg/Ornaments";
import { formatBlogDate } from "@/lib/cms/blog-fields";
import { blogPath, type BlogSummary } from "@/lib/cms/blogs";

function Cover({ blog, sizes, priority = false }: { blog: BlogSummary; sizes: string; priority?: boolean }) {
  if (!blog.image) {
    return (
      <div className="grid size-full place-items-center bg-linear-to-br from-orange-600 via-orange-700 to-orange-900 text-white/45">
        <Lotus className="w-16" />
      </div>
    );
  }
  return <Image src={blog.image.src} alt={blog.image.alt} fill sizes={sizes} preload={priority} className="object-cover" />;
}

function Meta({ blog, dark = false }: { blog: BlogSummary; dark?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${dark ? "text-white/70" : "text-stone"}`}>
      {blog.author && (
        <>
          <span className={`font-medium ${dark ? "text-white" : "text-ink-soft"}`}>{blog.author}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time>
      {blog.readMinutes && (
        <>
          <span aria-hidden="true">·</span>
          <span>{blog.readMinutes} min read</span>
        </>
      )}
    </p>
  );
}

/** Grid card for the /blogs archive: framed cover, meta, title, excerpt and an author row with an arrow button. */
export function BlogCard({ blog, headingLevel: H = "h3" }: { blog: BlogSummary; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-2 shadow-[0_1px_2px_rgb(28_13_5/0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-braj hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_22px_44px_-22px_rgb(194_65_12/0.45)]">
      <div className="zoom-media relative aspect-16/10 overflow-hidden rounded-xl bg-sand">
        <Cover blog={blog} sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.68rem] font-semibold text-ember-deep shadow-sm backdrop-blur-sm">{blog.category}</span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-3.5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} aria-hidden="true" className="text-orange-600" />
            <time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time>
          </span>
          {blog.readMinutes && (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} aria-hidden="true" className="text-orange-600" /> {blog.readMinutes} min read
            </span>
          )}
        </p>
        <H className="mt-2.5 line-clamp-2 text-[1.02rem] font-semibold leading-snug sm:text-[1.06rem]">
          <Link href={blogPath(blog.slug)} className="blogs-title text-ink after:absolute after:inset-0 after:content-[''] group-hover:text-ember-deep">
            {blog.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">{blog.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {blog.author ? (
            <span className="flex min-w-0 items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-orange-100 text-[0.7rem] font-bold text-orange-700" aria-hidden="true">
                {blog.author.trim().charAt(0).toUpperCase()}
              </span>
              <span className="truncate text-xs font-medium text-ink-soft">{blog.author}</span>
            </span>
          ) : (
            <span />
          )}
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** The pinned (or newest) story, shown as a dark cocoa panel inside the saffron /blogs hero. */
export function FeaturedBlogCard({ blog }: { blog: BlogSummary }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-cocoa shadow-[0_30px_60px_-24px_rgb(60_18_0/0.7)] ring-1 ring-white/10">
      <div className="zoom-media relative aspect-16/10 bg-cocoa-soft">
        <Cover blog={blog} sizes="(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 92vw" priority />
        <div className="absolute inset-0 bg-linear-to-t from-cocoa via-cocoa/10 to-transparent" aria-hidden="true" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[0.3rem] bg-amber-400 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cocoa">
          <Star size={12} aria-hidden="true" className="fill-current" /> {blog.featured ? "Editor’s pick" : "Latest story"}
        </span>
      </div>

      <div className="relative -mt-8 px-5 pb-5 sm:px-7 sm:pb-7">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-300">
          {blog.category}
          {blog.location ? ` · ${blog.location}` : ""}
        </p>
        <h2 className="mt-2.5 text-lg font-semibold leading-snug text-white sm:text-xl">
          <Link href={blogPath(blog.slug)} className="blogs-title after:absolute after:inset-0 after:content-['']">
            {blog.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">{blog.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <Meta blog={blog} dark />
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-500 text-cocoa transition-colors duration-300 group-hover:bg-amber-400" aria-hidden="true">
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
