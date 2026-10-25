import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Feather } from "lucide-react";
import { BlogCard, FeaturedBlogCard } from "@/components/cards/BlogCard";
import { CategoryTabs, Pagination, PlanTripBand } from "@/components/blog/BlogParts";
import { FeaturedPackages, FinalCta } from "@/components/home/Sections";
import { JsonLd } from "@/components/seo/JsonLd";
import { Mandala } from "@/components/svg/Ornaments";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { PILGRIMS } from "@/config/site";
import { photos } from "@/content/images";
import { BLOGS_PATH, BLOGS_PER_PAGE, blogCategories, blogPath, getPublishedBlogs, type BlogSummary } from "@/lib/cms/blogs";
import { BLOG_CATEGORIES } from "@/lib/cms/constants";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Vrindavan & Mathura Blog: Temple & Yatra Guides";
const description =
  "Temple guides, darshan timings, pilgrimage tips, festival stories and practical travel advice for Vrindavan, Mathura and the wider Braj — written by local guides.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: BLOGS_PATH },
];

export const metadata = buildMetadata({ title, description, path: BLOGS_PATH, image: photos["keshi-ghat"].src });

export default async function BlogsPage({ searchParams }: PageProps<"/blogs">) {
  const blogs = await getPublishedBlogs();
  const categories = blogCategories(blogs, BLOG_CATEGORIES);
  // The hero carries the pinned (or newest) story; the unfiltered archive picks up after it.
  const pick = blogs.find((b) => b.featured) ?? blogs[0];
  const stats = [
    { value: String(blogs.length), label: blogs.length === 1 ? "Story" : "Stories" },
    { value: String(categories.length), label: categories.length === 1 ? "Topic" : "Topics" },
    { value: PILGRIMS, label: "Pilgrims guided" },
  ];

  return (
    <>
      <section aria-labelledby="page-title" className="blogs-hero relative isolate overflow-hidden pb-14 pt-[6.75rem] text-white sm:pt-32 lg:pb-20">
        <Mandala className="animate-spin-slow pointer-events-none absolute -right-48 -top-48 -z-10 size-[38rem] text-white/[0.07]" />
        <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <div className="hero-in">
              <Breadcrumbs items={crumbs} light />
            </div>
            <p className="hero-in hero-in-1 mt-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-amber-200">
              <span className="h-0.5 w-8 bg-amber-300" aria-hidden="true" />
              The Braj journal · Travel & temple blog
            </p>
            <h1 id="page-title" className="blogs-display hero-in hero-in-2 mt-3.5 max-w-lg">
              Sacred journeys &amp; <span className="text-amber-200">divine stories</span> of Braj
            </h1>
            <p className="hero-in hero-in-3 mt-4 max-w-lg text-[0.92rem] leading-relaxed text-white/90 sm:text-[0.98rem]">
              Temple guides, darshan timings, Krishna leela and honest travel advice from Mathura, Vrindavan, Govardhan and Barsana — written by the local team who walk these lanes every day.
            </p>
            <div className="hero-in hero-in-4 mt-6 flex flex-wrap gap-3">
              {blogs.length > 0 && (
                <a href="#latest" className="btn btn-white btn-sm">
                  Explore the stories <ArrowDown size={16} aria-hidden="true" />
                </a>
              )}
              <EnquiryButtons size="sm" light onGradient message="Radhe Radhe! I was reading your blog and would like help planning my Vrindavan–Mathura trip." />
            </div>
            {blogs.length > 0 && (
              <dl className="hero-in hero-in-4 mt-8 grid max-w-sm grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-5" aria-label="Blog at a glance">
                {stats.map(({ value, label }) => (
                  <div key={label} className="flex flex-col-reverse px-4 first:pl-0 last:pr-0">
                    <dt className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/75">{label}</dt>
                    <dd className="text-xl font-bold tracking-tight sm:text-2xl">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="hero-in hero-in-3">
            {pick ? (
              <FeaturedBlogCard blog={pick} />
            ) : (
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-cocoa shadow-[0_30px_60px_-24px_rgb(60_18_0/0.7)] ring-1 ring-white/10">
                <Image
                  src={photos["yamuna-vrindavan"].src}
                  alt={photos["yamuna-vrindavan"].alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="latest" aria-labelledby="latest-title" className="scroll-mt-28 bg-cream py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <Suspense fallback={<ListingSkeleton />}>
            <BlogListing blogs={blogs} categories={categories} pick={pick} searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <div className="container-x pb-16 lg:pb-20">
        <PlanTripBand message="Radhe Radhe! I'm planning a Vrindavan tour — could you suggest a plan?" />
      </div>

      <FeaturedPackages />

      <FinalCta title="Read enough? Let’s plan your yatra." text="Tell us your dates, your group and the temples you long to see — we’ll suggest a calm, well-timed plan and an honest quote." />

      <JsonLd
        data={[
          webPageSchema({ path: BLOGS_PATH, name: title, description }),
          breadcrumbSchema(crumbs),
          blogs.length ? itemListSchema("Latest blog posts", blogs.slice(0, 30).map((b) => ({ name: b.title, href: blogPath(b.slug) }))) : undefined,
        ]}
      />
    </>
  );
}

const firstParam = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Archive header, category tabs, card grid and pagination — the only part that depends on the query string. */
async function BlogListing({
  blogs,
  categories,
  pick,
  searchParams,
}: {
  blogs: BlogSummary[];
  categories: ReturnType<typeof blogCategories>;
  pick?: BlogSummary;
  searchParams: PageProps<"/blogs">["searchParams"];
}) {
  const params = await searchParams;
  const requested = firstParam(params.category)?.toLowerCase();
  const category = categories.find((c) => c.slug === requested);

  // A topic shows every one of its posts; "All stories" skips the hero's pick.
  const pool = category ? blogs.filter((b) => b.categorySlug === category.slug) : blogs.filter((b) => b.slug !== pick?.slug);
  const totalPages = Math.max(1, Math.ceil(pool.length / BLOGS_PER_PAGE));
  const page = Math.min(totalPages, Math.max(1, Number.parseInt(firstParam(params.page) ?? "1", 10) || 1));
  const items = pool.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);

  if (!blogs.length) return <EmptyState />;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="blogs-kicker">{category ? "Topic" : "Fresh from Braj"}</p>
          <h2 id="latest-title" className="display-2 mt-2.5">
            {category ? category.name : "Latest stories & guides"}
          </h2>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-stone">
            {category
              ? `${category.count} ${category.count === 1 ? "article" : "articles"} in this topic.`
              : "Temple guides, festival notes and practical yatra advice — pick a topic or start with the newest."}
          </p>
        </div>
        {category && (
          <Link href={`${BLOGS_PATH}#latest`} className="link-arrow shrink-0 text-sm">
            View all stories <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
          </Link>
        )}
      </div>

      <div className="mt-7">
        <CategoryTabs categories={categories} active={category?.slug} total={blogs.length} />
      </div>

      {requested && !category && (
        <p className="mt-6 border-l-4 border-orange-600 bg-white px-4 py-3 text-sm text-ink-soft">We couldn’t find that topic, so here are all our stories instead.</p>
      )}

      {items.length > 0 ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {items.map((b) => (
            <li key={b.slug} className="reveal">
              <BlogCard blog={b} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-stone">That’s our only story so far — more temple guides and yatra notes are on the way.</p>
      )}

      <Pagination page={page} totalPages={totalPages} category={category?.slug} />
    </>
  );
}

function ListingSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-4 w-32 animate-pulse rounded bg-sand" />
      <div className="mt-3 h-9 w-80 max-w-full animate-pulse rounded-md bg-sand" />
      <div className="mt-7 flex gap-2 border-y border-line py-2.5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-11 w-28 shrink-0 animate-pulse rounded-md bg-sand" />
        ))}
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-2xl border border-line bg-white p-2">
            <div className="aspect-16/10 animate-pulse rounded-xl bg-sand" />
            <div className="mx-2 mt-5 h-3 w-24 animate-pulse rounded bg-sand" />
            <div className="mx-2 mt-3 h-5 animate-pulse rounded bg-sand" />
            <div className="mx-2 mt-2 h-5 w-2/3 animate-pulse mb-3 rounded bg-sand" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl border-y border-line py-12 text-center sm:py-16">
      <span className="mx-auto grid size-14 place-items-center rounded-xl bg-orange-700 text-white shadow-[0_12px_24px_-12px_rgb(194_65_12/0.9)]">
        <Feather size={24} aria-hidden="true" />
      </span>
      <h2 id="latest-title" className="display-3 mt-5">
        Our first stories are on their way
      </h2>
      <p className="mx-auto mt-3 max-w-md text-stone">
        We’re writing up temple guides and yatra stories from Braj. Meanwhile, our practical travel guides cover seasons, routes and darshan timings.
      </p>
      <Link href="/travel-guide" className="btn btn-primary btn-sm mt-6">
        Read the travel guides <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
      </Link>
    </div>
  );
}
