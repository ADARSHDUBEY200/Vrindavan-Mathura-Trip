"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { CMSActions } from "@/components/Admin/CMS/CMSActions";
import { CMSContentSection } from "@/components/Admin/CMS/CMSContentSection";
import { CMSHeader, RestoreBanner } from "@/components/Admin/CMS/CMSHeader";
import { CMSMediaSection } from "@/components/Admin/CMS/CMSMediaSection";
import { CMSMetaSection } from "@/components/Admin/CMS/CMSMetaSection";
import { CMSSchema } from "@/components/Admin/CMS/CMSSchema";
import { CMSSeoSection, type MetaValue } from "@/components/Admin/CMS/CMSSeoSection";
import { FaqHandler, type Faq } from "@/components/Admin/CMS/FaqHandler";
import { ImageDropzone } from "@/components/Admin/CMS/ImageDropzone";
import { PasteTableEditor } from "@/components/Admin/CMS/PasteTableEditor";
import { RichTextEditor } from "@/components/Admin/CMS/RichTextEditor";
import { EditorShell, RichTextSection } from "@/components/Admin/CMS/RichTextSection";
import { SectionOrderEditor } from "@/components/Admin/CMS/SectionOrderEditor";
import { Field, FieldLabel, ListEditor, Section, Select, TextArea, TextInput, Toggle } from "@/components/Admin/CMS/ui";
import { useEditorController } from "@/components/Admin/CMS/useEditorController";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { ADMIN_ROUTES, TABLES } from "@/lib/cms/config";
import { EMPTY_DETAILS, TEMPLE_BLOCKS, TEMPLE_CATEGORIES, customKey, isSafeHref, resolveOrder, templePath, toTempleDetails, type CustomSection, type GalleryItem, type GlanceRow, type NearbyRow, type RouteRow, type StatRow, type TempleBlock, type TempleDetails, type TipRow, type AartiRow, type DarshanRow, type FestivalRow } from "@/lib/cms/temple-fields";
import { asObject, asString, isBlankHtml, uid, withIds } from "@/lib/cms/utils";
import { createClient } from "@/lib/supabase/client";

type WhyRow = { id: string; reason: string; detail: string };
type WhyBook = { heading: string; intro: string; rows: WhyRow[]; outro: string };

export type TempleFormState = {
  title: string;
  /** Stored in the "location" column; shown as the location select. */
  category: string;
  slug: string;
  meta: MetaValue;
  schema: MetaValue;
  image: string;
  alt: string;
  subcontent: string;
  content: string;
  history: string;
  timing: string;
  bestvisit: string;
  journey: string;
  templeoverview: string;
  quickanswer: string;
  ataglance: GlanceRow[];
  whybook: WhyBook;
  faqs: Faq[];
  details: TempleDetails;
};

const EMPTY: TempleFormState = {
  title: "",
  category: "",
  slug: "",
  meta: { title: "", description: "" },
  schema: { title: "", description: "" },
  image: "",
  alt: "",
  subcontent: "",
  content: "",
  history: "",
  timing: "",
  bestvisit: "",
  journey: "",
  templeoverview: "",
  quickanswer: "",
  ataglance: [],
  whybook: { heading: "", intro: "", rows: [], outro: "" },
  faqs: [],
  details: EMPTY_DETAILS,
};

function fromRow(row: Record<string, unknown>): TempleFormState {
  const why = asObject<Record<string, unknown>>(row.whybook, {});
  return {
    title: asString(row.title),
    category: asString(row.location),
    slug: asString(row.slug),
    meta: asObject(row.meta, { title: "", description: "" }),
    schema: asObject(row.schema, { title: "", description: "" }),
    image: asString(row.image),
    alt: asString(row.alt),
    subcontent: asString(row.subcontent),
    content: asString(row.content),
    history: asString(row.history),
    timing: asString(row.timing),
    bestvisit: asString(row.bestvisit),
    journey: asString(row.journey),
    templeoverview: asString(row.templeoverview),
    quickanswer: asString(row.quickanswer),
    ataglance: withIds<GlanceRow>(row.ataglance),
    whybook: {
      heading: asString(why.heading),
      intro: asString(why.intro),
      rows: withIds<WhyRow>(why.rows),
      outro: asString(why.outro),
    },
    faqs: withIds<Faq>(row.faqs),
    details: toTempleDetails(row.details),
  };
}

const html = (v: string) => (isBlankHtml(v) ? "" : v);

/** Rows with at least one filled-in cell. */
const filled = <T extends { id: string }>(rows: T[]) => rows.filter((r) => Object.entries(r).some(([k, v]) => k !== "id" && typeof v === "string" && v.trim()));

function cleanDetails(d: TempleDetails): TempleDetails {
  const sections = d.sections.filter((s) => s.heading.trim() || !isBlankHtml(s.html) || s.image);
  return {
    ...d,
    stats: filled(d.stats),
    darshan: filled(d.darshan),
    aarti: filled(d.aarti),
    visiting: filled(d.visiting),
    significance: html(d.significance),
    festivals: filled(d.festivals),
    tips: filled(d.tips),
    routes: filled(d.routes),
    gallery: d.gallery.filter((g) => g.image),
    nearby: filled(d.nearby),
    related: d.related.filter((r) => r.slug),
    sections,
    order: resolveOrder(d.order, sections.map((s) => s.id)),
    updatedOn: new Date().toISOString().slice(0, 10),
  };
}

function toRow(f: TempleFormState, status: "draft" | "published") {
  return {
    title: f.title.trim(),
    location: f.category,
    slug: f.slug.trim(),
    meta: f.meta,
    schema: f.schema,
    image: f.image,
    alt: f.alt.trim(),
    subcontent: f.subcontent,
    content: html(f.content),
    history: f.history,
    timing: html(f.timing),
    bestvisit: html(f.bestvisit),
    journey: html(f.journey),
    templeoverview: html(f.templeoverview),
    quickanswer: html(f.quickanswer),
    ataglance: f.ataglance.filter((r) => r.label.trim() || r.value.trim()),
    whybook: { ...f.whybook, rows: f.whybook.rows.filter((r) => r.reason.trim() || r.detail.trim()) },
    faqs: f.faqs.filter((q) => q.question.trim() || q.answer.trim()),
    details: cleanDetails(f.details),
    status,
  };
}

/** Field errors the editor can show before anything is sent. The API repeats the same rules. */
function validateDetails(d: TempleDetails) {
  if (d.mapUrl.trim() && !/^https?:\/\/\S+$/i.test(d.mapUrl.trim())) return "The Google Maps link must start with https://";
  if (Boolean(d.latitude.trim()) !== Boolean(d.longitude.trim())) return "Enter both latitude and longitude, or neither";
  if (d.latitude.trim() && (!Number.isFinite(Number(d.latitude)) || Math.abs(Number(d.latitude)) > 90)) return "Latitude must be a number between -90 and 90";
  if (d.longitude.trim() && (!Number.isFinite(Number(d.longitude)) || Math.abs(Number(d.longitude)) > 180)) return "Longitude must be a number between -180 and 180";
  if (d.sortOrder.trim() && !Number.isFinite(Number(d.sortOrder))) return "Sort order must be a number";
  if (d.gallery.some((g) => g.image && !g.alt.trim())) return "Every gallery image needs alt text";
  if (d.sections.some((s) => s.image && !s.alt.trim())) return "Every section image needs alt text";
  if (d.nearby.some((n) => !isSafeHref(n.href.trim()))) return "A nearby link must be a path like /temples/nidhivan or a full web address";
  return null;
}

function validatePublish(f: TempleFormState) {
  if (!f.category) return "Choose a location";
  if (!f.details.category) return "Choose a category";
  if (!f.subcontent.trim()) return "Add a short summary";
  if (!f.image) return "Upload a temple image";
  if (!f.alt.trim()) return "Add alt text for the image";
  return validateDetails(f.details);
}

function validateDraft(f: TempleFormState) {
  if (!f.title.trim()) return "A draft needs a title";
  if (!f.category) return "A draft needs a location";
  if (!f.image) return "A draft needs an image";
  if (!f.alt.trim()) return "A draft needs alt text for the image";
  return validateDetails(f.details);
}

/** True until supabase-temples.sql has added the column the editor saves into. */
function useDetailsColumn() {
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    let cancelled = false;
    createClient()
      .from(TABLES.Temple)
      .select("details")
      .limit(1)
      .then(({ error }) => {
        if (!cancelled && error?.code === "42703") setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return missing;
}

function useTempleOptions(ownSlug: string) {
  const [options, setOptions] = useState<{ slug: string; title: string }[]>([]);
  useEffect(() => {
    let cancelled = false;
    createClient()
      .from(TABLES.Temple)
      .select("slug,title")
      .order("title")
      .then(({ data }) => {
        if (!cancelled) setOptions((data ?? []) as { slug: string; title: string }[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return options.filter((o) => o.slug !== ownSlug);
}

export default function TempleForm({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const c = useEditorController({
    formRef,
    editorType: "Temple",
    mode,
    id,
    empty: EMPTY,
    listHref: ADMIN_ROUTES.Temple,
    fromRow,
    toRow,
    validatePublish,
    validateDraft,
  });
  const { form, patch, ready, editorKey } = c;
  const d = form.details;
  const setD = (p: Partial<TempleDetails>) => c.setForm((f) => ({ ...f, details: { ...f.details, ...p } }));
  const setWhy = (p: Partial<WhyBook>) => c.setForm((f) => ({ ...f, whybook: { ...f.whybook, ...p } }));
  const setAddress = (p: Partial<TempleDetails["address"]>) => setD({ address: { ...d.address, ...p } });
  const rich = { editorType: "Temple" as const, ready, editorKey };

  const detailsMissing = useDetailsColumn();
  const templeOptions = useTempleOptions(form.slug);

  const layoutItems = useMemo(() => {
    const sectionLabel = (key: string) => d.sections.find((s) => customKey(s.id) === key)?.heading.trim() || "New section";
    return resolveOrder(d.order, d.sections.map((s) => s.id)).map((key) => ({
      key,
      label: key.startsWith("custom:") ? `Custom: ${sectionLabel(key)}` : TEMPLE_BLOCKS[key as TempleBlock],
    }));
  }, [d.order, d.sections]);

  if (!ready && !c.loadError) return <CMSLoading label="Loading temple…" />;

  return (
    <EditorShell loadError={c.loadError} ready={ready}>
      <CMSHeader editorType="Temple" mode={mode} backHref={ADMIN_ROUTES.Temple} lastSaved={c.lastSaved} />
      {c.showRestoreBanner && <RestoreBanner onRestore={c.restoreDraft} onDismiss={c.discardDraft} />}

      {detailsMissing && (
        <div role="alert" className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" />
          <p>
            The Temple table has no <code>details</code> column yet, so temples cannot be saved. Run <code>supabase-temples.sql</code> once in the Supabase SQL editor.
          </p>
        </div>
      )}

      <form ref={formRef} onSubmit={c.onSubmit} noValidate className="space-y-4">
        <CMSMetaSection editorType="Temple" title={form.title} category={form.category} slug={form.slug} onChange={patch} autoSlug={mode === "create"}>
          <Field label="Category" required>
            <Select required value={d.category} onChange={(category) => setD({ category })} options={TEMPLE_CATEGORIES} placeholder="Select category" />
          </Field>
          <Field label="Sort order" hint="Lower comes first">
            <TextInput inputMode="numeric" value={d.sortOrder} placeholder="10" onChange={(sortOrder) => setD({ sortOrder })} />
          </Field>
          <div className="md:col-span-2 xl:self-end">
            <Toggle label="Featured: show first on the archive" checked={d.featured} onChange={(featured) => setD({ featured })} />
          </div>
          <div className="md:col-span-2 xl:col-span-4">
            <Field label="Card timing line" hint="Shown in the hero badge">
              <TextInput value={d.timingNote} placeholder="Morning & evening darshan; closed in the afternoon" onChange={(timingNote) => setD({ timingNote })} />
            </Field>
          </div>
        </CMSMetaSection>

        <Section title="Page layout" helper="Move sections up or down, or hide one on this temple. Empty sections are left out by themselves." defaultOpen={false}>
          <SectionOrderEditor items={layoutItems} hidden={d.hidden} onChange={({ order, hidden }) => setD({ order, hidden })} />
        </Section>

        <CMSMediaSection editorType="Temple" image={form.image} alt={form.alt} onImageChange={(image) => patch({ image })} onAltChange={(alt) => patch({ alt })} title="Featured image" helper="Hero and card image (.webp, 2 MB max) and its alt text." />

        <Section title="Image gallery" helper="Photos for the Explore the Temple section. Reorder them with the arrows." defaultOpen={false}>
          <ListEditor<GalleryItem>
            items={d.gallery}
            onChange={(gallery) => setD({ gallery })}
            create={() => ({ id: uid(), image: "", alt: "", caption: "" })}
            addLabel="Add photo"
            itemLabel="Photo"
            reorder
            emptyText="No gallery photos yet."
            renderItem={(g, update) => (
              <div className="grid gap-3 md:grid-cols-[14rem_1fr]">
                <ImageDropzone editorType="Temple" compact value={g.image} onChange={(image) => update({ image })} label="Add .webp" />
                <div className="space-y-3">
                  <Field label="Alt text" required>
                    <TextInput value={g.alt} placeholder="Describe the photo" onChange={(alt) => update({ alt })} />
                  </Field>
                  <Field label="Caption">
                    <TextInput value={g.caption} onChange={(caption) => update({ caption })} />
                  </Field>
                </div>
              </div>
            )}
          />
        </Section>

        <Section title="Hero stats" helper="Optional figures under the hero image. Only add numbers you can stand behind." defaultOpen={false}>
          <PasteTableEditor<StatRow>
            columns={[
              { key: "value", label: "Value", placeholder: "1975" },
              { key: "label", label: "Label", placeholder: "Consecrated" },
            ]}
            rows={d.stats}
            onChange={(stats) => setD({ stats })}
          />
        </Section>

        <RichTextSection {...rich} title="Quick Answer" helper="A short, direct answer shown at the top of the page." value={form.quickanswer} onChange={(quickanswer) => patch({ quickanswer })} height="180px" />

        <Section title="At a Glance" helper="Label / value facts (deity, timings, entry fee…). Paste from Word or Sheets.">
          <PasteTableEditor<GlanceRow>
            columns={[
              { key: "label", label: "Label", placeholder: "Main deity" },
              { key: "value", label: "Value", placeholder: "Shri Banke Bihari" },
            ]}
            rows={form.ataglance}
            onChange={(ataglance) => patch({ ataglance })}
          />
        </Section>

        <Section title="Opening and closing timings" helper="One row per session. Leave Season blank if the hours are the same all year." defaultOpen={false}>
          <PasteTableEditor<DarshanRow>
            columns={[
              { key: "season", label: "Season", placeholder: "Summer" },
              { key: "session", label: "Session", placeholder: "Morning" },
              { key: "time", label: "Time", placeholder: "7:45 am – 12:00 noon" },
              { key: "note", label: "Note", placeholder: "Optional" },
            ]}
            rows={d.darshan}
            onChange={(darshan) => setD({ darshan })}
          />
        </Section>

        <Section title="Aarti timings" helper="One row per aarti. Leave Season blank if it does not change." defaultOpen={false}>
          <PasteTableEditor<AartiRow>
            columns={[
              { key: "season", label: "Season", placeholder: "Summer" },
              { key: "name", label: "Aarti", placeholder: "Mangala aarti" },
              { key: "time", label: "Time", placeholder: "4:30 am" },
            ]}
            rows={d.aarti}
            onChange={(aarti) => setD({ aarti })}
          />
        </Section>

        <RichTextSection {...rich} title="Timing notes" helper="Seasonal changes and anything visitors should confirm." value={form.timing} onChange={(timing) => patch({ timing })} defaultOpen={false} />

        <Section title="Visiting information" helper="Entry, dress code, photography, phones and bags, accessibility." defaultOpen={false}>
          <PasteTableEditor<GlanceRow>
            columns={[
              { key: "label", label: "Label", placeholder: "Dress code" },
              { key: "value", label: "Value", placeholder: "Modest clothing; shoes off outside" },
            ]}
            rows={d.visiting}
            onChange={(visiting) => setD({ visiting })}
          />
        </Section>

        <RichTextSection {...rich} title="Best Time to Visit" helper="Season, day and time-of-day advice." value={form.bestvisit} onChange={(bestvisit) => patch({ bestvisit })} defaultOpen={false} />
        <RichTextSection {...rich} title="Temple Overview" helper="Architecture, significance and what to see." value={form.templeoverview} onChange={(templeoverview) => patch({ templeoverview })} defaultOpen={false} />

        <Section title="History" helper="Plain text. A blank line starts a new paragraph." defaultOpen={false}>
          <Field label="History">
            <TextArea rows={6} value={form.history} onChange={(history) => patch({ history })} />
          </Field>
        </Section>

        <RichTextSection {...rich} title="Religious Significance" helper="Beliefs, deities and traditions." value={d.significance} onChange={(significance) => setD({ significance })} defaultOpen={false} />

        <Section title="Festivals" helper="Shown as a table." defaultOpen={false}>
          <PasteTableEditor<FestivalRow>
            columns={[
              { key: "name", label: "Festival", placeholder: "Janmashtami" },
              { key: "when", label: "When", placeholder: "August or September" },
              { key: "highlight", label: "Highlights", placeholder: "Midnight abhishek" },
            ]}
            rows={d.festivals}
            onChange={(festivals) => setD({ festivals })}
          />
        </Section>

        <Section title="Address & location" helper="Shown with the map, and published in the temple's structured data." defaultOpen={false}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Street">
              <TextInput value={d.address.street} onChange={(street) => setAddress({ street })} />
            </Field>
            <Field label="Area / locality">
              <TextInput value={d.address.locality} placeholder="Raman Reti" onChange={(locality) => setAddress({ locality })} />
            </Field>
            <Field label="Town / city">
              <TextInput value={d.address.city} placeholder="Vrindavan" onChange={(city) => setAddress({ city })} />
            </Field>
            <Field label="State">
              <TextInput value={d.address.state} onChange={(state) => setAddress({ state })} />
            </Field>
            <Field label="PIN code">
              <TextInput inputMode="numeric" value={d.address.postalCode} onChange={(postalCode) => setAddress({ postalCode })} />
            </Field>
            <Field label="Google Maps link" hint="Used by the Open in Google Maps button">
              <TextInput type="url" value={d.mapUrl} placeholder="https://maps.app.goo.gl/…" onChange={(mapUrl) => setD({ mapUrl })} />
            </Field>
            <Field label="Map search text" hint="What the embedded map searches for">
              <TextInput value={d.mapQuery} placeholder="Prem Mandir Vrindavan" onChange={(mapQuery) => setD({ mapQuery })} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude" hint="Optional">
                <TextInput inputMode="decimal" value={d.latitude} placeholder="27.5650" onChange={(latitude) => setD({ latitude })} />
              </Field>
              <Field label="Longitude" hint="Optional">
                <TextInput inputMode="decimal" value={d.longitude} placeholder="77.6593" onChange={(longitude) => setD({ longitude })} />
              </Field>
            </div>
          </div>
        </Section>

        <RichTextSection {...rich} title="How to Reach" helper="Narrative directions, shown above the routes table." value={form.journey} onChange={(journey) => patch({ journey })} defaultOpen={false}>
          <PasteTableEditor<RouteRow>
            columns={[
              { key: "from", label: "From", placeholder: "Mathura" },
              { key: "distance", label: "Distance", placeholder: "Roughly 11 to 15 km" },
              { key: "how", label: "How", placeholder: "30 to 45 minutes by road" },
            ]}
            rows={d.routes}
            onChange={(routes) => setD({ routes })}
            addLabel="Add route"
          />
        </RichTextSection>

        <Section title="Local tips" helper="One tip per row." defaultOpen={false}>
          <ListEditor<TipRow>
            items={d.tips}
            onChange={(tips) => setD({ tips })}
            create={() => ({ id: uid(), text: "" })}
            addLabel="Add tip"
            itemLabel="Tip"
            reorder
            emptyText="No tips yet."
            renderItem={(tip, update) => <TextArea rows={2} value={tip.text} aria-label="Tip" onChange={(text) => update({ text })} />}
          />
          <Field label="Good to know" hint="Highlighted under the tips">
            <TextArea rows={2} value={d.goodToKnow} onChange={(goodToKnow) => setD({ goodToKnow })} />
          </Field>
        </Section>

        <Section title="Nearby attractions" helper="Places to combine with this temple. A link is optional." defaultOpen={false}>
          <ListEditor<NearbyRow>
            items={d.nearby}
            onChange={(nearby) => setD({ nearby })}
            create={() => ({ id: uid(), name: "", distance: "", text: "", href: "" })}
            addLabel="Add attraction"
            itemLabel="Attraction"
            reorder
            emptyText="No nearby attractions yet."
            renderItem={(n, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Name">
                  <TextInput value={n.name} onChange={(name) => update({ name })} />
                </Field>
                <Field label="Distance">
                  <TextInput value={n.distance} placeholder="5 minutes on foot" onChange={(distance) => update({ distance })} />
                </Field>
                <Field label="Description">
                  <TextInput value={n.text} onChange={(text) => update({ text })} />
                </Field>
                <Field label="Link">
                  <TextInput value={n.href} placeholder="/temples/nidhivan" onChange={(href) => update({ href })} />
                </Field>
              </div>
            )}
          />
        </Section>

        <Section title="Related temples" helper="Shown as cards. Only published temples appear on the page." defaultOpen={false}>
          {templeOptions.length === 0 ? (
            <p className="text-sm text-slate-400">No other temples yet.</p>
          ) : (
            <div className="grid max-h-64 gap-1 overflow-y-auto rounded-lg border border-white/10 p-2 sm:grid-cols-2">
              {templeOptions.map((o) => {
                const checked = d.related.some((r) => r.slug === o.slug);
                return (
                  <label key={o.slug} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-200 hover:bg-white/5">
                    <input
                      type="checkbox"
                      checked={checked}
                      className="size-4 accent-sky-500"
                      onChange={(e) => setD({ related: e.target.checked ? [...d.related, { id: uid(), slug: o.slug }] : d.related.filter((r) => r.slug !== o.slug) })}
                    />
                    <span className="truncate">{o.title || o.slug}</span>
                  </label>
                );
              })}
            </div>
          )}
        </Section>

        <Section title="Extra content sections" helper="Add as many as you need. Each one appears in Page layout, where it can be moved or hidden." defaultOpen={false}>
          <ListEditor<CustomSection>
            items={d.sections}
            onChange={(sections) => setD({ sections })}
            create={() => ({ id: uid(), heading: "", html: "", image: "", alt: "" })}
            addLabel="Add section"
            itemLabel="Section"
            reorder
            emptyText="No extra sections yet."
            renderItem={(s, update) => (
              <>
                <Field label="Heading">
                  <TextInput value={s.heading} placeholder="Food and prasadam" onChange={(heading) => update({ heading })} />
                </Field>
                <FieldLabel>Content</FieldLabel>
                {ready && <RichTextEditor key={`${editorKey}-${s.id}`} editorType="Temple" defaultValue={s.html} onChange={(value) => update({ html: value })} height="200px" />}
                <div className="grid gap-3 md:grid-cols-[14rem_1fr]">
                  <ImageDropzone editorType="Temple" compact value={s.image} onChange={(image) => update({ image })} label="Add .webp" />
                  <Field label="Image alt text">
                    <TextInput value={s.alt} onChange={(alt) => update({ alt })} />
                  </Field>
                </div>
              </>
            )}
          />
        </Section>

        <Section title="Why Book With Us" helper="Heading, intro, reason/detail rows and a closing line." defaultOpen={false}>
          <Field label="Heading">
            <TextInput value={form.whybook.heading} onChange={(heading) => setWhy({ heading })} />
          </Field>
          <Field label="Intro">
            <TextArea rows={3} value={form.whybook.intro} onChange={(intro) => setWhy({ intro })} />
          </Field>
          <ListEditor
            items={form.whybook.rows}
            onChange={(rows) => setWhy({ rows })}
            create={() => ({ id: uid(), reason: "", detail: "" })}
            addLabel="Add reason"
            itemLabel="Reason"
            reorder
            renderItem={(r, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Reason">
                  <TextInput value={r.reason} onChange={(reason) => update({ reason })} />
                </Field>
                <Field label="Detail">
                  <TextInput value={r.detail} onChange={(detail) => update({ detail })} />
                </Field>
              </div>
            )}
          />
          <Field label="Outro">
            <TextArea rows={2} value={form.whybook.outro} onChange={(outro) => setWhy({ outro })} />
          </Field>
        </Section>

        <FaqHandler editorType="Temple" faqs={form.faqs} onChange={(faqs) => patch({ faqs })} />

        <CMSContentSection
          editorType="Temple"
          subcontent={form.subcontent}
          content={form.content}
          onSubcontentChange={(subcontent) => patch({ subcontent })}
          onContentChange={(content) => patch({ content })}
          ready={ready}
          editorKey={editorKey}
        />

        <div className="grid items-start gap-4 xl:grid-cols-2">
          <CMSSeoSection editorType="Temple" value={form.meta} onChange={(meta) => patch({ meta })} />
          <CMSSchema editorType="Temple" value={form.schema} onChange={(schema) => patch({ schema })} />
        </div>

        <CMSActions mode={mode} editingLabel={`Temple · ${form.title}${form.slug ? ` (${templePath(form.slug)})` : ""}`} saving={c.saving} onDraft={c.onDraft} />
      </form>
    </EditorShell>
  );
}
