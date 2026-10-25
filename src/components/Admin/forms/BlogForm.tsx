"use client";

import { useRef } from "react";
import { CMSActions } from "@/components/Admin/CMS/CMSActions";
import { CMSContentSection } from "@/components/Admin/CMS/CMSContentSection";
import { CMSHeader, RestoreBanner } from "@/components/Admin/CMS/CMSHeader";
import { CMSMediaSection } from "@/components/Admin/CMS/CMSMediaSection";
import { CMSMetaSection } from "@/components/Admin/CMS/CMSMetaSection";
import { CMSSchema } from "@/components/Admin/CMS/CMSSchema";
import { CMSSeoSection, type MetaValue } from "@/components/Admin/CMS/CMSSeoSection";
import { FaqHandler, type Faq } from "@/components/Admin/CMS/FaqHandler";
import { HtmlTablePaste } from "@/components/Admin/CMS/HtmlTablePaste";
import { ImageDropzone } from "@/components/Admin/CMS/ImageDropzone";
import { RichTextEditor } from "@/components/Admin/CMS/RichTextEditor";
import { EditorShell } from "@/components/Admin/CMS/RichTextSection";
import { Field, FieldLabel, ListEditor, Section, TextArea, TextInput, Toggle } from "@/components/Admin/CMS/ui";
import { useEditorController } from "@/components/Admin/CMS/useEditorController";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { readingMinutes, youtubeId } from "@/lib/cms/blog-fields";
import { ADMIN_ROUTES } from "@/lib/cms/config";
import { asObject, asString, htmlTextLength, isBlankHtml, stripEmpty, uid, withIds } from "@/lib/cms/utils";

type Recommendation = { id: string; situation: string; recommendation: string; packageName: string; packageLink: string };
type Review = { id: string; name: string; city: string; date: string; rating: string; text: string; packageName: string; packageLink: string };
type QuickFact = { id: string; label: string; value: string };
type Takeaway = { id: string; text: string };
type RelatedLink = { id: string; label: string; href: string };
type VideoTestimonial = { id: string; title: string; url: string; city: string };

/** Everything stored in the row's `seoContent` jsonb (see lib/cms/blog-fields.ts for the public shape). */
type BlogSeo = {
  // Article details
  location: string;
  updatedOn: string;
  readMinutes: string;
  featured: boolean;
  authorRole: string;
  authorImage: string;
  guideBio: string;
  // Summary blocks
  quickAnswer: string;
  quickFacts: QuickFact[];
  keyTakeaways: Takeaway[];
  guideIntro: string;
  // Callouts, links & CTA
  honestNote: string;
  guideTip: string;
  relatedLinks: RelatedLink[];
  ctaTitle: string;
  ctaText: string;
  // Video
  videoSrc: string;
  videoDuration: string;
  videoTitle: string;
  videoOverlayTitle: string;
  videoTestimonials: VideoTestimonial[];
  // Social proof & planning
  recommendations: Recommendation[];
  reviews: Review[];
  totalRating: string;
  totalReviews: string;
  pilgrimsServed: string;
  templeTimings: { title: string; note: string; htmlContent: string };
};

export type BlogFormState = {
  title: string;
  category: string;
  slug: string;
  author: string;
  meta: MetaValue;
  schema: MetaValue;
  image: string;
  alt: string;
  subcontent: string;
  content: string;
  faqs: Faq[];
  seo: BlogSeo;
};

const EMPTY_SEO: BlogSeo = {
  location: "",
  updatedOn: "",
  readMinutes: "",
  featured: false,
  authorRole: "",
  authorImage: "",
  guideBio: "",
  quickAnswer: "",
  quickFacts: [],
  keyTakeaways: [],
  guideIntro: "",
  honestNote: "",
  guideTip: "",
  relatedLinks: [],
  ctaTitle: "",
  ctaText: "",
  videoSrc: "",
  videoDuration: "",
  videoTitle: "",
  videoOverlayTitle: "",
  videoTestimonials: [],
  recommendations: [],
  reviews: [],
  totalRating: "",
  totalReviews: "",
  pilgrimsServed: "",
  templeTimings: { title: "", note: "", htmlContent: "" },
};

const EMPTY: BlogFormState = {
  title: "",
  category: "",
  slug: "",
  author: "",
  meta: { title: "", description: "" },
  schema: { title: "", description: "" },
  image: "",
  alt: "",
  subcontent: "",
  content: "",
  faqs: [],
  seo: EMPTY_SEO,
};

const EMPTY_REVIEW = { name: "", city: "", date: "", rating: "5", text: "", packageName: "", packageLink: "" };

const MIN_CONTENT = 300;

/** Fills keys missing from older rows or restored drafts. */
const normalizeSeo = (seo: Partial<BlogSeo> | undefined): BlogSeo => ({
  ...EMPTY_SEO,
  ...seo,
  templeTimings: { ...EMPTY_SEO.templeTimings, ...seo?.templeTimings },
});

function fromRow(row: Record<string, unknown>): BlogFormState {
  const seo = asObject<Record<string, unknown>>(row.seoContent, {});
  const timings = asObject(seo.templeTimings, { title: "", note: "", htmlContent: "" });
  const cta = asObject(seo.cta, { title: "", text: "" });
  return {
    title: asString(row.title),
    category: asString(row.category),
    slug: asString(row.slug),
    author: asString(row.author),
    meta: asObject(row.meta, { title: "", description: "" }),
    schema: asObject(row.schema, { title: "", description: "" }),
    image: asString(row.image),
    alt: asString(row.alt),
    subcontent: asString(row.subcontent),
    content: asString(row.content),
    faqs: withIds<Faq>(row.faqs),
    seo: {
      location: asString(seo.location),
      updatedOn: asString(seo.updatedOn).slice(0, 10),
      readMinutes: asString(seo.readMinutes),
      featured: seo.featured === true,
      authorRole: asString(seo.authorRole),
      authorImage: asString(seo.authorImage),
      guideBio: asString(seo.guideBio),
      quickAnswer: asString(seo.quickAnswer),
      quickFacts: withIds<QuickFact>(seo.quickFacts).map((f) => ({ ...f, label: asString(f.label), value: asString(f.value) })),
      keyTakeaways: withIds<Takeaway>(seo.keyTakeaways).map((t) => ({ ...t, text: asString(t.text) })),
      guideIntro: asString(seo.guideIntro),
      honestNote: asString(seo.honestNote),
      guideTip: asString(seo.guideTip),
      relatedLinks: withIds<RelatedLink>(seo.relatedLinks).map((l) => ({ ...l, label: asString(l.label), href: asString(l.href) })),
      ctaTitle: asString(cta.title),
      ctaText: asString(cta.text),
      videoSrc: asString(seo.videoSrc),
      videoDuration: asString(seo.videoDuration),
      videoTitle: asString(seo.videoTitle),
      videoOverlayTitle: asString(seo.videoOverlayTitle),
      videoTestimonials: withIds<VideoTestimonial>(seo.videoTestimonials).map((v) => ({ ...v, title: asString(v.title), url: asString(v.url), city: asString(v.city) })),
      recommendations: withIds<Recommendation>(seo.recommendations),
      reviews: withIds<Review>(seo.reviews).map((r) => ({ ...EMPTY_REVIEW, ...r, rating: asString(r.rating) })),
      totalRating: asString(seo.totalRating),
      totalReviews: asString(seo.totalReviews),
      pilgrimsServed: asString(seo.pilgrimsServed),
      templeTimings: { title: asString(timings.title), note: asString(timings.note), htmlContent: asString(timings.htmlContent) },
    },
  };
}

const toNumber = (v: string) => (v.trim() === "" ? undefined : Number(v));

function toRow(f: BlogFormState, status: "draft" | "published") {
  const seo = normalizeSeo(f.seo);
  const seoContent = stripEmpty({
    location: seo.location.trim(),
    updatedOn: seo.updatedOn,
    readMinutes: toNumber(seo.readMinutes),
    readMinutesAuto: readingMinutes(f.content),
    featured: seo.featured || undefined,
    authorRole: seo.authorRole.trim(),
    authorImage: seo.authorImage,
    guideBio: seo.guideBio,
    quickAnswer: isBlankHtml(seo.quickAnswer) ? "" : seo.quickAnswer,
    quickFacts: seo.quickFacts.filter((q) => q.label.trim() && q.value.trim()),
    keyTakeaways: seo.keyTakeaways.filter((t) => t.text.trim()),
    guideIntro: seo.guideIntro,
    honestNote: seo.honestNote,
    guideTip: seo.guideTip,
    relatedLinks: seo.relatedLinks.filter((l) => l.label.trim() && l.href.trim()),
    cta: { title: seo.ctaTitle.trim(), text: seo.ctaText.trim() },
    videoSrc: seo.videoSrc,
    videoDuration: seo.videoDuration,
    videoTitle: seo.videoTitle,
    videoOverlayTitle: seo.videoOverlayTitle,
    videoTestimonials: seo.videoTestimonials.filter((v) => v.url.trim()),
    recommendations: seo.recommendations,
    // Reviews are stored without ids, with a numeric rating.
    reviews: seo.reviews.map((r) => ({
      name: r.name,
      city: r.city,
      date: r.date,
      rating: toNumber(r.rating),
      text: r.text,
      packageName: r.packageName,
      packageLink: r.packageLink,
    })),
    totalRating: toNumber(seo.totalRating),
    totalReviews: toNumber(seo.totalReviews),
    pilgrimsServed: seo.pilgrimsServed,
    templeTimings: seo.templeTimings,
  });
  return {
    title: f.title.trim(),
    category: f.category,
    slug: f.slug.trim(),
    author: f.author.trim(),
    meta: f.meta,
    schema: f.schema,
    image: f.image,
    alt: f.alt.trim(),
    subcontent: f.subcontent,
    content: f.content,
    faqs: f.faqs.filter((q) => q.question.trim() || q.answer.trim()),
    seoContent: seoContent ?? {},
    status,
  };
}

const isLink = (href: string) => /^(\/|https?:\/\/)/i.test(href.trim());

function validatePublish(f: BlogFormState) {
  if (!f.category) return "Choose a category";
  if (!f.image) return "Upload a cover image";
  if (htmlTextLength(f.content) < MIN_CONTENT) return `Content must be at least ${MIN_CONTENT} characters`;
  const seo = normalizeSeo(f.seo);
  if (seo.videoSrc.trim() && !youtubeId(seo.videoSrc)) return "The guide video must be a YouTube link";
  if (seo.videoTestimonials.some((v) => v.url.trim() && !youtubeId(v.url))) return "Every video review must be a YouTube link";
  if (seo.relatedLinks.some((l) => l.href.trim() && !isLink(l.href))) return "Related links must start with / or https://";
  return null;
}

function validateDraft(f: BlogFormState) {
  if (!f.title.trim()) return "A draft needs a title";
  if (!f.author.trim()) return "A draft needs an author";
  if (!f.category) return "A draft needs a category";
  if (!f.image) return "A draft needs a cover image";
  return null;
}

const SubHeading = ({ children }: { children: React.ReactNode }) => <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-slate-400">{children}</h3>;
const Hint = ({ children }: { children: React.ReactNode }) => <span className="text-slate-400">{children}</span>;

export default function BlogForm({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const c = useEditorController({
    formRef,
    editorType: "Blog",
    mode,
    id,
    empty: EMPTY,
    listHref: ADMIN_ROUTES.Blog,
    fromRow,
    toRow,
    validatePublish,
    validateDraft,
  });
  const { form, patch, ready, editorKey } = c;
  const seo = normalizeSeo(form.seo);
  const setSeo = (p: Partial<BlogSeo>) => c.setForm((f) => ({ ...f, seo: { ...normalizeSeo(f.seo), ...p } }));

  if (!ready && !c.loadError) return <CMSLoading label="Loading blog…" />;

  return (
    <EditorShell loadError={c.loadError} ready={ready}>
      <CMSHeader editorType="Blog" mode={mode} backHref={ADMIN_ROUTES.Blog} lastSaved={c.lastSaved} />
      {c.showRestoreBanner && <RestoreBanner onRestore={c.restoreDraft} onDismiss={c.discardDraft} />}

      <form ref={formRef} onSubmit={c.onSubmit} noValidate className="space-y-4">
        <CMSMetaSection editorType="Blog" title={form.title} category={form.category} slug={form.slug} onChange={patch} autoSlug={mode === "create"}>
          <Field label="Author" required hint={<Hint>Shown on the byline</Hint>}>
            <TextInput required value={form.author} placeholder="e.g. Radha Sharma" onChange={(author) => patch({ author })} />
          </Field>
        </CMSMetaSection>

        <div className="grid items-start gap-4 xl:grid-cols-2">
          <CMSSeoSection editorType="Blog" value={form.meta} onChange={(meta) => patch({ meta })} />
          <CMSSchema editorType="Blog" value={form.schema} onChange={(schema) => patch({ schema })} />
        </div>

        <Section title="Article Details" helper="Location, review date, reading time, listing pin and the author box." defaultOpen={false}>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Location" hint={<Hint>Shown beside the category</Hint>}>
              <TextInput value={seo.location} placeholder="e.g. Mathura" onChange={(location) => setSeo({ location })} />
            </Field>
            <Field label="Last reviewed on" hint={<Hint>“Updated …” badge</Hint>}>
              <TextInput type="date" value={seo.updatedOn} onChange={(updatedOn) => setSeo({ updatedOn })} />
            </Field>
            <Field label="Reading time (minutes)" hint={<Hint>Blank = auto</Hint>}>
              <TextInput type="number" min={1} step={1} value={seo.readMinutes} placeholder="Auto" onChange={(readMinutes) => setSeo({ readMinutes })} />
            </Field>
          </div>
          <Toggle label="Feature this post at the top of /blogs" checked={seo.featured} onChange={(featured) => setSeo({ featured })} />

          <SubHeading>Author box</SubHeading>
          <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:items-start">
            <div>
              <FieldLabel>Author photo</FieldLabel>
              <div className="mt-1.5">
                <ImageDropzone editorType="Blog" value={seo.authorImage} onChange={(authorImage) => setSeo({ authorImage })} label="Drop a square .webp photo" compact />
              </div>
            </div>
            <div className="space-y-4">
              <Field label="Author role">
                <TextInput value={seo.authorRole} placeholder="Founder & Local Guide" onChange={(authorRole) => setSeo({ authorRole })} />
              </Field>
              <Field label="Author bio" hint={<Hint>“Meet your guide” section</Hint>}>
                <TextArea rows={4} value={seo.guideBio} onChange={(guideBio) => setSeo({ guideBio })} />
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Summary Blocks" helper="Quick answer, quick facts, key takeaways and a personal note — shown above the article body." defaultOpen={false}>
          <FieldLabel>Quick Answer</FieldLabel>
          <RichTextEditor key={`qa-${editorKey}`} editorType="Blog" defaultValue={seo.quickAnswer} onChange={(quickAnswer) => setSeo({ quickAnswer })} height="180px" />

          <SubHeading>Quick facts</SubHeading>
          <ListEditor
            items={seo.quickFacts}
            onChange={(quickFacts) => setSeo({ quickFacts })}
            create={() => ({ id: uid(), label: "", value: "" })}
            addLabel="Add fact"
            itemLabel="Fact"
            reorder
            emptyText="No quick facts yet (e.g. Built · 1570)."
            renderItem={(f, update) => (
              <div className="grid gap-3 md:grid-cols-[14rem_1fr]">
                <Field label="Label">
                  <TextInput value={f.label} placeholder="Built by" onChange={(label) => update({ label })} />
                </Field>
                <Field label="Value">
                  <TextInput value={f.value} placeholder="Raja Bhagwan Das of Amber" onChange={(value) => update({ value })} />
                </Field>
              </div>
            )}
          />

          <SubHeading>Key takeaways</SubHeading>
          <ListEditor
            items={seo.keyTakeaways}
            onChange={(keyTakeaways) => setSeo({ keyTakeaways })}
            create={() => ({ id: uid(), text: "" })}
            addLabel="Add takeaway"
            itemLabel="Takeaway"
            reorder
            emptyText="No takeaways yet."
            renderItem={(t, update) => <TextInput value={t.text} placeholder="One short, useful sentence" onChange={(text) => update({ text })} />}
          />

          <Field label="A word from your guide" hint={<Hint>Personal intro before the body</Hint>}>
            <TextArea rows={4} value={seo.guideIntro} onChange={(guideIntro) => setSeo({ guideIntro })} />
          </Field>
        </Section>

        <CMSMediaSection editorType="Blog" image={form.image} alt={form.alt} onImageChange={(image) => patch({ image })} onAltChange={(alt) => patch({ alt })} />

        <CMSContentSection
          editorType="Blog"
          subcontent={form.subcontent}
          content={form.content}
          onSubcontentChange={(subcontent) => patch({ subcontent })}
          onContentChange={(content) => patch({ content })}
          ready={ready}
          editorKey={editorKey}
          minLength={MIN_CONTENT}
        />

        <Section title="Callouts, Links & CTA" helper="“The honest bit”, the guide’s tip, related guides and the planning box after the body." defaultOpen={false}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="The honest bit" hint={<Hint>Caveats, what to skip</Hint>}>
              <TextArea rows={4} value={seo.honestNote} onChange={(honestNote) => setSeo({ honestNote })} />
            </Field>
            <Field label="Tip from the guide" hint={<Hint>Closing tip</Hint>}>
              <TextArea rows={4} value={seo.guideTip} onChange={(guideTip) => setSeo({ guideTip })} />
            </Field>
          </div>

          <SubHeading>Related guides</SubHeading>
          <ListEditor
            items={seo.relatedLinks}
            onChange={(relatedLinks) => setSeo({ relatedLinks })}
            create={() => ({ id: uid(), label: "", href: "" })}
            addLabel="Add link"
            itemLabel="Link"
            reorder
            emptyText="No related links yet. “Continue reading” cards are added automatically."
            renderItem={(l, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Label">
                  <TextInput value={l.label} placeholder="Places to visit in Mathura" onChange={(label) => update({ label })} />
                </Field>
                <Field label="Link" hint={<Hint>/blogs/… or https://…</Hint>}>
                  <TextInput value={l.href} placeholder="/blogs/places-to-visit-in-mathura" onChange={(href) => update({ href })} />
                </Field>
              </div>
            )}
          />

          <SubHeading>Planning box</SubHeading>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Heading" hint={<Hint>Blank = default</Hint>}>
              <TextInput value={seo.ctaTitle} placeholder="Plan your Old Mathura heritage walk" onChange={(ctaTitle) => setSeo({ ctaTitle })} />
            </Field>
            <Field label="Text" hint={<Hint>Blank = default</Hint>}>
              <TextArea rows={2} value={seo.ctaText} onChange={(ctaText) => setSeo({ ctaText })} />
            </Field>
          </div>
        </Section>

        <Section title="Video" helper="The guide’s YouTube video and short pilgrim video reviews." defaultOpen={false}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="YouTube video URL" hint={<Hint>Watch, share or embed link</Hint>}>
              <TextInput type="url" value={seo.videoSrc} placeholder="https://www.youtube.com/watch?v=…" onChange={(videoSrc) => setSeo({ videoSrc })} />
            </Field>
            <Field label="Video duration (minutes)">
              <TextInput type="number" min={0} step="any" value={seo.videoDuration} onChange={(videoDuration) => setSeo({ videoDuration })} />
            </Field>
            <Field label="Video title">
              <TextInput value={seo.videoTitle} onChange={(videoTitle) => setSeo({ videoTitle })} />
            </Field>
            <Field label="Video caption">
              <TextInput value={seo.videoOverlayTitle} onChange={(videoOverlayTitle) => setSeo({ videoOverlayTitle })} />
            </Field>
          </div>

          <SubHeading>Pilgrim video reviews</SubHeading>
          <ListEditor
            items={seo.videoTestimonials}
            onChange={(videoTestimonials) => setSeo({ videoTestimonials })}
            create={() => ({ id: uid(), title: "", url: "", city: "" })}
            addLabel="Add video review"
            itemLabel="Video"
            reorder
            emptyText="No video reviews yet."
            renderItem={(v, update) => (
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="YouTube URL">
                  <TextInput type="url" value={v.url} placeholder="https://youtube.com/shorts/…" onChange={(url) => update({ url })} />
                </Field>
                <Field label="Title">
                  <TextInput value={v.title} onChange={(title) => update({ title })} />
                </Field>
                <Field label="City">
                  <TextInput value={v.city} onChange={(city) => update({ city })} />
                </Field>
              </div>
            )}
          />
        </Section>

        <Section title="Recommendations, Reviews & Timings" helper="Package recommendations, written reviews and the temple timings table." defaultOpen={false}>
          <SubHeading>Recommendations</SubHeading>
          <ListEditor
            items={seo.recommendations}
            onChange={(recommendations) => setSeo({ recommendations })}
            create={() => ({ id: uid(), situation: "", recommendation: "", packageName: "", packageLink: "" })}
            addLabel="Add recommendation"
            itemLabel="Recommendation"
            reorder
            renderItem={(r, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Situation">
                  <TextInput value={r.situation} placeholder="Travelling with elderly parents" onChange={(situation) => update({ situation })} />
                </Field>
                <Field label="Recommendation">
                  <TextInput value={r.recommendation} onChange={(recommendation) => update({ recommendation })} />
                </Field>
                <Field label="Package name">
                  <TextInput value={r.packageName} onChange={(packageName) => update({ packageName })} />
                </Field>
                <Field label="Package link">
                  <TextInput value={r.packageLink} placeholder="/tour-packages/…" onChange={(packageLink) => update({ packageLink })} />
                </Field>
              </div>
            )}
          />

          <SubHeading>Reviews</SubHeading>
          <ListEditor
            items={seo.reviews}
            onChange={(reviews) => setSeo({ reviews })}
            create={() => ({ id: uid(), ...EMPTY_REVIEW })}
            addLabel="Add review"
            itemLabel="Review"
            reorder
            renderItem={(r, update) => (
              <>
                <div className="grid gap-3 md:grid-cols-4">
                  <Field label="Name">
                    <TextInput value={r.name} onChange={(name) => update({ name })} />
                  </Field>
                  <Field label="City">
                    <TextInput value={r.city} onChange={(city) => update({ city })} />
                  </Field>
                  <Field label="Date">
                    <TextInput value={r.date} placeholder="March 2026" onChange={(date) => update({ date })} />
                  </Field>
                  <Field label="Rating">
                    <TextInput type="number" min={1} max={5} step={0.5} value={r.rating} onChange={(rating) => update({ rating })} />
                  </Field>
                </div>
                <Field label="Review text">
                  <TextArea rows={3} value={r.text} onChange={(text) => update({ text })} />
                </Field>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Package name (optional)">
                    <TextInput value={r.packageName} onChange={(packageName) => update({ packageName })} />
                  </Field>
                  <Field label="Package link (optional)">
                    <TextInput value={r.packageLink} onChange={(packageLink) => update({ packageLink })} />
                  </Field>
                </div>
              </>
            )}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Total rating" hint={<Hint>Blank = site rating</Hint>}>
              <TextInput type="number" min={0} max={5} step={0.1} value={seo.totalRating} placeholder="4.9" onChange={(totalRating) => setSeo({ totalRating })} />
            </Field>
            <Field label="Total reviews">
              <TextInput type="number" min={0} value={seo.totalReviews} placeholder="1200" onChange={(totalReviews) => setSeo({ totalReviews })} />
            </Field>
          </div>
          <p className="text-xs text-slate-400">The “pilgrims served” figure on blog pages comes from the site settings (src/config/site.ts), so every page shows the same number.</p>

          <SubHeading>Temple timings</SubHeading>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Table title">
              <TextInput value={seo.templeTimings.title} placeholder="Temple darshan timings" onChange={(title) => setSeo({ templeTimings: { ...seo.templeTimings, title } })} />
            </Field>
            <Field label="Note">
              <TextInput value={seo.templeTimings.note} onChange={(note) => setSeo({ templeTimings: { ...seo.templeTimings, note } })} />
            </Field>
          </div>
          <HtmlTablePaste value={seo.templeTimings.htmlContent} onChange={(htmlContent) => setSeo({ templeTimings: { ...seo.templeTimings, htmlContent } })} />
        </Section>

        <FaqHandler editorType="Blog" faqs={form.faqs} onChange={(faqs) => patch({ faqs })} />

        <CMSActions mode={mode} editingLabel={`Blog · ${form.title}`} saving={c.saving} onDraft={c.onDraft} />
      </form>
    </EditorShell>
  );
}
