import { notFound } from "next/navigation";
import {
  ArticleBody,
  AuthorSection,
  BlogHero,
  CategoriesCard,
  ContactSection,
  EnquiryCard,
  FaqSection,
  GuideVideo,
  LatestSection,
  PlanningBox,
  QuickAnswer,
  QuickNavigation,
  RatingStrip,
  RecommendationSection,
  ReviewsSection,
  SECTION_IDS,
  ShareSection,
  TimingsSection,
  VideoTestimonialsSection,
  authorInfo,
  blogBlocks,
  type TocItem,
} from "@/components/blog/BlogArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_AUTHOR } from "@/config/site";
import { prepareArticleHtml, prepareTableHtml } from "@/lib/cms/article-html";
import { htmlToText } from "@/lib/cms/blog-fields";
import { BLOGS_PATH, blogCategories, blogPath, getPublishedBlog, getPublishedBlogs, relatedBlogs } from "@/lib/cms/blogs";
import { BLOG_CATEGORIES } from "@/lib/cms/constants";
import { isBlankHtml } from "@/lib/cms/utils";
import { buildMetadata } from "@/lib/seo";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

/**
 * Blogs published after a build have no prerendered page. Rendering them on request (instead of streaming
 * behind Suspense) keeps full SEO tags in the HTML and a real 404 status for unpublished or deleted slugs.
 */
export const instant = false;

/** Placeholder used when no blog is published yet: Cache Components needs at least one param at build time. */
const PLACEHOLDER = "__no-published-blogs__";

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.length ? blogs.map((b) => ({ slug: b.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const blog = slug === PLACEHOLDER ? null : await getPublishedBlog(slug);
  if (!blog) return { title: "Article not found", robots: { index: false } };
  return {
    ...buildMetadata({
      title: blog.metaTitle,
      description: blog.metaDescription,
      path: blogPath(blog.slug),
      image: blog.image ? { src: blog.image.src } : undefined,
      imageAlt: blog.image?.alt,
      type: "article",
      largeImagePreview: true,
    }),
    authors: [{ name: blog.author || BLOG_AUTHOR }],
    category: blog.category,
  };
}

export default async function BlogPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();
  const [blog, all] = await Promise.all([getPublishedBlog(slug), getPublishedBlogs()]);
  if (!blog) notFound();

  const { seo } = blog;
  const path = blogPath(blog.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: BLOGS_PATH },
    { name: blog.title, href: path },
  ];
  const author = authorInfo(blog);
  const blocks = blogBlocks(seo);
  const article = prepareArticleHtml(blog.content, Object.values(SECTION_IDS));
  const quickAnswer = isBlankHtml(seo.quickAnswer) ? "" : prepareArticleHtml(seo.quickAnswer!).html;
  const timingsHtml = isBlankHtml(seo.templeTimings?.htmlContent) ? "" : prepareTableHtml(seo.templeTimings!.htmlContent!);
  const ratingValue = Number(seo.totalRating);
  const rating = ratingValue > 0 && ratingValue <= 5 ? { value: ratingValue, count: Number(seo.totalReviews) > 0 ? Number(seo.totalReviews) : undefined } : undefined;
  const categories = blogCategories(all, BLOG_CATEGORIES);
  const more = relatedBlogs(all, blog);
  const message = `Radhe Radhe! I read "${blog.title}" and would like help planning my Vrindavan–Mathura trip.`;

  // Quick navigation, in page order — only sections that render.
  const toc = (
    [
      quickAnswer && { id: SECTION_IDS.quickAnswer, label: "Quick Answer" },
      rating && { id: SECTION_IDS.rating, label: "Guide Rating" },
      blocks.quickFacts.length > 0 && { id: SECTION_IDS.quickFacts, label: "Quick Facts" },
      blocks.takeaways.length > 0 && { id: SECTION_IDS.takeaways, label: "Key Takeaways at a Glance" },
      seo.guideIntro && { id: SECTION_IDS.guideIntro, label: "A Word From Your Guide" },
      ...article.headings.map((h) => ({ id: h.id, label: h.text, sub: h.level === 3 })),
      seo.honestNote && { id: SECTION_IDS.honest, label: "The Honest Bit" },
      blocks.related.length > 0 && { id: SECTION_IDS.related, label: "Related Guides" },
      blocks.videoId && { id: SECTION_IDS.guide, label: "Meet Your Guide" },
      blog.faqs.length > 0 && { id: SECTION_IDS.faqs, label: "Frequently Asked Questions" },
      { id: SECTION_IDS.contact, label: "Plan With Us" },
      blocks.recommendations.length > 0 && { id: SECTION_IDS.recommendations, label: "Our Recommendation" },
      blocks.reviews.length > 0 && { id: SECTION_IDS.reviews, label: "Pilgrim Reviews" },
      blocks.videos.length > 0 && { id: SECTION_IDS.videos, label: "Video Testimonials" },
      timingsHtml && { id: SECTION_IDS.timings, label: seo.templeTimings?.title || "Temple Darshan Timings" },
      { id: SECTION_IDS.author, label: "Meet the Author" },
    ] as (TocItem | false | "" | null | undefined)[]
  ).filter((t): t is TocItem => Boolean(t));
  // Keep the list scannable: drop H3s when the article has many headings.
  const tocItems = toc.length > 28 ? toc.filter((t) => !t.sub) : toc;

  return (
    <div className="blog-page bg-white">
      <BlogHero blog={blog} crumbs={crumbs} author={author} rating={rating} />

      <div id="blog-content" className="mx-auto grid w-full max-w-400 scroll-mt-24 grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)_270px] lg:gap-7 xl:gap-9 xl:px-8 2xl:grid-cols-[250px_minmax(0,1fr)_290px]">
        <aside className="hidden lg:block" aria-label="Blog categories">
          <div className="sticky top-28 mt-10">
            <CategoriesCard categories={categories} active={blog.categorySlug} />
          </div>
        </aside>

        <article className="min-w-0 space-y-6 pt-4 lg:pt-10">
          {quickAnswer && <QuickAnswer html={quickAnswer} />}
          <QuickNavigation items={tocItems} />
          {rating && <RatingStrip value={rating.value} count={rating.count} />}
          <div className="pt-4 sm:px-4 lg:px-0">
            <ArticleBody blog={blog} html={article.html} author={author} />
          </div>
          {blocks.videoId && <GuideVideo videoId={blocks.videoId} seo={seo} author={author} />}
        </article>

        <aside className="hidden lg:block" aria-label="Plan your trip">
          <div className="sticky top-28 mt-10">
            <EnquiryCard />
          </div>
        </aside>
      </div>

      <PlanningBox title={seo.cta?.title} text={seo.cta?.text} message={message} />
      {blog.faqs.length > 0 && <FaqSection faqs={blog.faqs} />}
      <ContactSection message={message} />
      {blocks.recommendations.length > 0 && <RecommendationSection items={blocks.recommendations} author={author} message={message} />}
      {blocks.reviews.length > 0 && <ReviewsSection reviews={blocks.reviews} seo={seo} />}
      {blocks.videos.length > 0 && <VideoTestimonialsSection videos={blocks.videos} message={message} />}
      {timingsHtml && <TimingsSection title={seo.templeTimings?.title} note={seo.templeTimings?.note} html={timingsHtml} />}
      <AuthorSection author={author} />
      {more.length > 0 && <LatestSection blogs={more} allHref={BLOGS_PATH} />}
      <ShareSection path={path} title={blog.title} />

      <JsonLd
        data={[
          blogPostingSchema({
            path,
            headline: blog.schemaTitle,
            description: blog.schemaDescription,
            image: blog.image?.src,
            imageAlt: blog.image?.alt,
            author: author.name,
            authorRole: seo.authorRole,
            category: blog.category,
            publishedAt: blog.publishedAt,
            updatedOn: blog.updatedOn,
            wordCount: htmlToText(blog.content).split(" ").filter(Boolean).length || undefined,
            keywords: [blog.category, blog.location].filter((k): k is string => Boolean(k)),
          }),
          breadcrumbSchema(crumbs),
          faqSchema(blog.faqs),
        ]}
      />
    </div>
  );
}
