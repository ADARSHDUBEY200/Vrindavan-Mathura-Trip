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
import { PasteTableEditor } from "@/components/Admin/CMS/PasteTableEditor";
import { EditorShell, RichTextSection } from "@/components/Admin/CMS/RichTextSection";
import { Field, ListEditor, Section, TextArea, TextInput } from "@/components/Admin/CMS/ui";
import { useEditorController } from "@/components/Admin/CMS/useEditorController";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { ADMIN_ROUTES } from "@/lib/cms/config";
import { asObject, asString, isBlankHtml, uid, withIds } from "@/lib/cms/utils";

type Glance = { id: string; label: string; value: string };
type WhyRow = { id: string; reason: string; detail: string };
type WhyBook = { heading: string; intro: string; rows: WhyRow[]; outro: string };

export type TempleFormState = {
  title: string;
  /** Stored in the "location" column; shown as the category select. */
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
  ataglance: Glance[];
  whybook: WhyBook;
  faqs: Faq[];
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
    ataglance: withIds<Glance>(row.ataglance),
    whybook: {
      heading: asString(why.heading),
      intro: asString(why.intro),
      rows: withIds<WhyRow>(why.rows),
      outro: asString(why.outro),
    },
    faqs: withIds<Faq>(row.faqs),
  };
}

const html = (v: string) => (isBlankHtml(v) ? "" : v);

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
    status,
  };
}

function validatePublish(f: TempleFormState) {
  if (!f.category) return "Choose a location";
  if (!f.image) return "Upload a temple image";
  if (!f.alt.trim()) return "Add alt text for the image";
  return null;
}

function validateDraft(f: TempleFormState) {
  if (!f.title.trim()) return "A draft needs a title";
  if (!f.category) return "A draft needs a location";
  if (!f.image) return "A draft needs an image";
  if (!f.alt.trim()) return "A draft needs alt text for the image";
  return null;
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
  const setWhy = (p: Partial<WhyBook>) => c.setForm((f) => ({ ...f, whybook: { ...f.whybook, ...p } }));
  const rich = { editorType: "Temple" as const, ready, editorKey };

  if (!ready && !c.loadError) return <CMSLoading label="Loading temple…" />;

  return (
    <EditorShell loadError={c.loadError} ready={ready}>
      <CMSHeader editorType="Temple" mode={mode} backHref={ADMIN_ROUTES.Temple} lastSaved={c.lastSaved} />
      {c.showRestoreBanner && <RestoreBanner onRestore={c.restoreDraft} onDismiss={c.discardDraft} />}

      <form ref={formRef} onSubmit={c.onSubmit} noValidate className="space-y-6">
        <CMSMetaSection editorType="Temple" title={form.title} category={form.category} slug={form.slug} onChange={patch} autoSlug={mode === "create"} />

        <Section title="History" helper="Plain-text history of the temple.">
          <Field label="History">
            <TextArea rows={6} value={form.history} onChange={(history) => patch({ history })} />
          </Field>
        </Section>

        <CMSSeoSection editorType="Temple" value={form.meta} onChange={(meta) => patch({ meta })} />
        <CMSSchema editorType="Temple" value={form.schema} onChange={(schema) => patch({ schema })} />

        <RichTextSection {...rich} title="Quick Answer" helper="A short, direct answer shown at the top of the page." value={form.quickanswer} onChange={(quickanswer) => patch({ quickanswer })} height="180px" />

        <Section title="At a Glance" helper="Label / value facts (deity, timings, entry fee…). Paste from Word or Sheets.">
          <PasteTableEditor<Glance>
            columns={[
              { key: "label", label: "Label", placeholder: "Main deity" },
              { key: "value", label: "Value", placeholder: "Shri Banke Bihari" },
            ]}
            rows={form.ataglance}
            onChange={(ataglance) => patch({ ataglance })}
          />
        </Section>

        <RichTextSection {...rich} title="Darshan Timing" helper="Opening hours, aarti times and seasonal changes." value={form.timing} onChange={(timing) => patch({ timing })} defaultOpen={false} />
        <RichTextSection {...rich} title="Best Time to Visit" helper="Season, day and time-of-day advice." value={form.bestvisit} onChange={(bestvisit) => patch({ bestvisit })} defaultOpen={false} />
        <RichTextSection {...rich} title="Journey" helper="How to reach the temple." value={form.journey} onChange={(journey) => patch({ journey })} defaultOpen={false} />
        <RichTextSection {...rich} title="Temple Overview" helper="Architecture, significance and what to see." value={form.templeoverview} onChange={(templeoverview) => patch({ templeoverview })} defaultOpen={false} />

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

        <CMSMediaSection editorType="Temple" image={form.image} alt={form.alt} onImageChange={(image) => patch({ image })} onAltChange={(alt) => patch({ alt })} />

        <CMSContentSection
          editorType="Temple"
          subcontent={form.subcontent}
          content={form.content}
          onSubcontentChange={(subcontent) => patch({ subcontent })}
          onContentChange={(content) => patch({ content })}
          ready={ready}
          editorKey={editorKey}
        />

        <CMSActions mode={mode} editingLabel={`Temple · ${form.title}`} saving={c.saving} onDraft={c.onDraft} />
      </form>
    </EditorShell>
  );
}
