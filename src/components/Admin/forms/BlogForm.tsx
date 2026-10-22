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
import { RichTextEditor } from "@/components/Admin/CMS/RichTextEditor";
import { EditorShell } from "@/components/Admin/CMS/RichTextSection";
import { Field, FieldLabel, ListEditor, Section, TextArea, TextInput } from "@/components/Admin/CMS/ui";
import { useEditorController } from "@/components/Admin/CMS/useEditorController";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { ADMIN_ROUTES } from "@/lib/cms/config";
import { asObject, asString, htmlTextLength, isBlankHtml, stripEmpty, uid, withIds } from "@/lib/cms/utils";

type Recommendation = { id: string; situation: string; recommendation: string; packageName: string; packageLink: string };
type Review = { id: string; name: string; city: string; date: string; rating: string; text: string; packageName: string; packageLink: string };

type BlogSeo = {
  quickAnswer: string;
  videoSrc: string;
  videoDuration: string;
  videoTitle: string;
  videoOverlayTitle: string;
  guideBio: string;
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
  quickAnswer: "",
  videoSrc: "",
  videoDuration: "",
  videoTitle: "",
  videoOverlayTitle: "",
  guideBio: "",
  recommendations: [],
  reviews: [],
  totalRating: "",
  totalReviews: "",
  pilgrimsServed: "50,000+",
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

function fromRow(row: Record<string, unknown>): BlogFormState {
  const seo = asObject<Record<string, unknown>>(row.seoContent, {});
  const timings = asObject(seo.templeTimings, { title: "", note: "", htmlContent: "" });
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
      quickAnswer: asString(seo.quickAnswer),
      videoSrc: asString(seo.videoSrc),
      videoDuration: asString(seo.videoDuration),
      videoTitle: asString(seo.videoTitle),
      videoOverlayTitle: asString(seo.videoOverlayTitle),
      guideBio: asString(seo.guideBio),
      recommendations: withIds<Recommendation>(seo.recommendations),
      reviews: withIds<Review>(seo.reviews).map((r) => ({ ...EMPTY_REVIEW, ...r, rating: asString(r.rating) })),
      totalRating: asString(seo.totalRating),
      totalReviews: asString(seo.totalReviews),
      pilgrimsServed: asString(seo.pilgrimsServed) || "50,000+",
      templeTimings: { title: asString(timings.title), note: asString(timings.note), htmlContent: asString(timings.htmlContent) },
    },
  };
}

const toNumber = (v: string) => (v.trim() === "" ? undefined : Number(v));

function toRow(f: BlogFormState, status: "draft" | "published") {
  const { seo } = f;
  const seoContent = stripEmpty({
    quickAnswer: isBlankHtml(seo.quickAnswer) ? "" : seo.quickAnswer,
    videoSrc: seo.videoSrc,
    videoDuration: seo.videoDuration,
    videoTitle: seo.videoTitle,
    videoOverlayTitle: seo.videoOverlayTitle,
    guideBio: seo.guideBio,
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
    pilgrimsServed: seo.pilgrimsServed || "50,000+",
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

function validatePublish(f: BlogFormState) {
  if (!f.category) return "Choose a category";
  if (!f.image) return "Upload a cover image";
  if (htmlTextLength(f.content) < MIN_CONTENT) return `Content must be at least ${MIN_CONTENT} characters`;
  return null;
}

function validateDraft(f: BlogFormState) {
  if (!f.title.trim()) return "A draft needs a title";
  if (!f.author.trim()) return "A draft needs an author";
  if (!f.category) return "A draft needs a category";
  if (!f.image) return "A draft needs a cover image";
  return null;
}

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
  const setSeo = (p: Partial<BlogSeo>) => c.setForm((f) => ({ ...f, seo: { ...f.seo, ...p } }));

  if (!ready && !c.loadError) return <CMSLoading label="Loading blog…" />;

  return (
    <EditorShell loadError={c.loadError} ready={ready}>
      <CMSHeader editorType="Blog" mode={mode} backHref={ADMIN_ROUTES.Blog} lastSaved={c.lastSaved} />
      {c.showRestoreBanner && <RestoreBanner onRestore={c.restoreDraft} onDismiss={c.discardDraft} />}

      <form ref={formRef} onSubmit={c.onSubmit} noValidate className="space-y-6">
        <CMSMetaSection editorType="Blog" title={form.title} category={form.category} slug={form.slug} onChange={patch} autoSlug={mode === "create"} />

        <Section title="Author" helper="Shown on the article byline.">
          <Field label="Author" required>
            <TextInput required value={form.author} placeholder="e.g. Radha Sharma" onChange={(author) => patch({ author })} />
          </Field>
        </Section>

        <CMSSeoSection editorType="Blog" value={form.meta} onChange={(meta) => patch({ meta })} />
        <CMSSchema editorType="Blog" value={form.schema} onChange={(schema) => patch({ schema })} />
        <FaqHandler editorType="Blog" faqs={form.faqs} onChange={(faqs) => patch({ faqs })} />

        <Section title="Blog SEO Content" helper="Quick answer, video, guide, recommendations, reviews and temple timings." defaultOpen={false}>
          <FieldLabel>Quick Answer</FieldLabel>
          <RichTextEditor key={`qa-${editorKey}`} editorType="Blog" defaultValue={form.seo.quickAnswer} onChange={(quickAnswer) => setSeo({ quickAnswer })} height="180px" />

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="YouTube embed URL">
              <TextInput type="url" value={form.seo.videoSrc} placeholder="https://www.youtube.com/embed/…" onChange={(videoSrc) => setSeo({ videoSrc })} />
            </Field>
            <Field label="Video duration (minutes)">
              <TextInput type="number" min={0} step="any" value={form.seo.videoDuration} onChange={(videoDuration) => setSeo({ videoDuration })} />
            </Field>
            <Field label="Video title">
              <TextInput value={form.seo.videoTitle} onChange={(videoTitle) => setSeo({ videoTitle })} />
            </Field>
            <Field label="Video overlay title">
              <TextInput value={form.seo.videoOverlayTitle} onChange={(videoOverlayTitle) => setSeo({ videoOverlayTitle })} />
            </Field>
          </div>
          <Field label="Guide bio">
            <TextArea rows={3} value={form.seo.guideBio} onChange={(guideBio) => setSeo({ guideBio })} />
          </Field>

          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-white/50">Recommendations</h3>
          <ListEditor
            items={form.seo.recommendations}
            onChange={(recommendations) => setSeo({ recommendations })}
            create={() => ({ id: uid(), situation: "", recommendation: "", packageName: "", packageLink: "" })}
            addLabel="Add recommendation"
            itemLabel="Recommendation"
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

          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-white/50">Reviews</h3>
          <ListEditor
            items={form.seo.reviews}
            onChange={(reviews) => setSeo({ reviews })}
            create={() => ({ id: uid(), ...EMPTY_REVIEW })}
            addLabel="Add review"
            itemLabel="Review"
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
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Total rating">
              <TextInput type="number" min={0} max={5} step={0.1} value={form.seo.totalRating} placeholder="4.9" onChange={(totalRating) => setSeo({ totalRating })} />
            </Field>
            <Field label="Total reviews">
              <TextInput type="number" min={0} value={form.seo.totalReviews} placeholder="1200" onChange={(totalReviews) => setSeo({ totalReviews })} />
            </Field>
            <Field label="Pilgrims served">
              <TextInput value={form.seo.pilgrimsServed} onChange={(pilgrimsServed) => setSeo({ pilgrimsServed })} />
            </Field>
          </div>

          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-white/50">Temple timings</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Table title">
              <TextInput value={form.seo.templeTimings.title} onChange={(title) => setSeo({ templeTimings: { ...form.seo.templeTimings, title } })} />
            </Field>
            <Field label="Note">
              <TextInput value={form.seo.templeTimings.note} onChange={(note) => setSeo({ templeTimings: { ...form.seo.templeTimings, note } })} />
            </Field>
          </div>
          <HtmlTablePaste value={form.seo.templeTimings.htmlContent} onChange={(htmlContent) => setSeo({ templeTimings: { ...form.seo.templeTimings, htmlContent } })} />
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

        <CMSActions mode={mode} editingLabel={`Blog · ${form.title}`} saving={c.saving} onDraft={c.onDraft} />
      </form>
    </EditorShell>
  );
}
