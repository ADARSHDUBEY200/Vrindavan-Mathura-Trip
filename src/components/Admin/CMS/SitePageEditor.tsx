"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, RotateCcw, Save, Send, TriangleAlert } from "lucide-react";
import { SectionFields } from "@/components/Admin/CMS/ContentFields";
import { SectionOrderEditor } from "@/components/Admin/CMS/SectionOrderEditor";
import { Section, Toggle } from "@/components/Admin/CMS/ui";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { DeleteConfirmModal } from "@/components/Admin/DeleteConfirmModal";
import { adminApi } from "@/lib/admin-api";
import { SITE_PAGE_TABLE, type EditorType } from "@/lib/cms/config";

export type PageGroup<K> = { title: string; helper: string; keys: K[]; toggle?: string };

type Row<T> = { id: string; content: Partial<T> | null; draft: Partial<T> | null; status: string };

async function loadRow<T>(slug: string) {
  const res = await fetch(`/api/admin/pages?slug=${slug}`, { credentials: "same-origin" });
  return (await res.json().catch(() => ({}))) as { data?: Row<T> | null; error?: string; tableMissing?: boolean };
}

/**
 * Editor for one SitePage row: every heading, text and list of a page, with a draft beside the live copy.
 * `sections` adds a card that reorders and hides the page's sections, stored as `order` and `hidden`.
 */
export function SitePageEditor<T extends { hidden: string[] }>({
  slug,
  rowTitle,
  heading,
  description,
  defaults,
  groups,
  labels = {},
  sections,
  bucket,
}: {
  slug: string;
  rowTitle: string;
  heading: string;
  description: string;
  defaults: T;
  groups: PageGroup<keyof T>[];
  labels?: Partial<Record<keyof T, string>>;
  /** Section key → label. The page must have an `order` list. */
  sections?: Record<string, string>;
  bucket?: EditorType;
}) {
  /** Saved content over the defaults, top-level section by section, so a section added to the page later still appears. */
  const withDefaults = (saved?: Partial<T> | null): T => ({ ...defaults, ...saved });

  const [form, setForm] = useState<T>(defaults);
  const [id, setId] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [published, setPublished] = useState(false);
  const [ready, setReady] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState<false | "publish" | "draft">(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadRow<T>(slug).then(({ data, error, tableMissing: missing }) => {
      if (cancelled) return;
      if (missing) setTableMissing(true);
      else if (error) setLoadError(error);
      if (data) {
        setId(data.id);
        setPublished(data.status === "published");
        setHasDraft(Boolean(data.draft));
        setForm(withDefaults(data.draft ?? data.content));
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
    // `defaults` is a module-level constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const toggleSection = (key: string, on: boolean) => setForm((f) => ({ ...f, hidden: on ? f.hidden.filter((k) => k !== key) : [...f.hidden, key] }));

  const order = (form as { order?: string[] }).order ?? [];
  const orderItems = sections
    ? [...order.filter((k) => k in sections), ...Object.keys(sections).filter((k) => !order.includes(k))].map((key) => ({ key, label: sections[key] }))
    : [];

  async function save(mode: "publish" | "draft") {
    if (saving || tableMissing) return;
    setSaving(mode);
    // A draft sits beside the live copy: the public page keeps showing `content` until Publish.
    const row = {
      slug,
      title: rowTitle,
      updated_at: new Date().toISOString(),
      ...(mode === "publish" ? { content: form, draft: null, status: "published" } : { draft: form }),
    };
    const { data, error } = id ? await adminApi.pages.update(id, row) : await adminApi.pages.insert(row);
    setSaving(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (data?.id) setId(String(data.id));
    if (mode === "publish") setPublished(true);
    setHasDraft(mode === "draft");
    toast.success(mode === "publish" ? "Published" : "Draft saved");
  }

  async function reset() {
    if (!id) return setConfirmReset(false);
    const { error } = await adminApi.pages.delete(id);
    setConfirmReset(false);
    if (error) {
      toast.error(error);
      return;
    }
    setId(null);
    setPublished(false);
    setHasDraft(false);
    setForm(defaults);
    toast.success("Reset to the default content");
  }

  if (!ready) return <CMSLoading label="Loading page…" />;

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{heading}</h1>
          <p className="mt-0.5 text-sm text-slate-400">{description}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${published ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
          {published ? (hasDraft ? "Published · unpublished draft" : "Published") : "Showing default content"}
        </span>
      </div>

      {tableMissing && (
        <div role="alert" className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" />
          <p>
            The <code>{SITE_PAGE_TABLE}</code> table does not exist yet, so changes here cannot be saved. Run <code>supabase-site-page.sql</code> once in the Supabase SQL editor. The public page shows the default content until then.
          </p>
        </div>
      )}
      {loadError && (
        <div role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Could not load saved content: {loadError}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save("publish");
        }}
        className="space-y-4"
      >
        {sections && (
          <Section title="Page sections" helper="Reorder the page, or hide a section without losing its content.">
            <SectionOrderEditor items={orderItems} hidden={form.hidden} onChange={({ order: next, hidden }) => setForm((f) => ({ ...f, order: next, hidden }))} />
          </Section>
        )}

        {groups.map((g) => (
          <Section key={g.title} title={g.title} helper={g.helper} defaultOpen={false}>
            {g.toggle && <Toggle label="Show this section on the page" checked={!form.hidden.includes(g.toggle)} onChange={(on) => toggleSection(g.toggle!, on)} />}
            {g.keys.map((key) => (
              <SectionFields key={String(key)} name={labels[key] ?? g.title} value={form[key]} template={defaults[key]} bucket={bucket} onChange={(value) => setForm((f) => ({ ...f, [key]: value }))} />
            ))}
          </Section>
        ))}

        <div className="sticky bottom-3 z-30 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0b1220]/95 px-4 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            disabled={!id || Boolean(saving)}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-300 transition hover:bg-rose-500/10 disabled:opacity-40"
          >
            <RotateCcw size={15} /> Reset to default
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => save("draft")}
              disabled={Boolean(saving) || tableMissing}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold transition hover:bg-emerald-500 disabled:opacity-60"
            >
              {saving === "draft" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Draft
            </button>
            <button type="submit" disabled={Boolean(saving) || tableMissing} className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold transition hover:bg-sky-500 disabled:opacity-60">
              {saving === "publish" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Publish
            </button>
          </div>
        </div>
      </form>

      <DeleteConfirmModal open={confirmReset} itemName={`the saved ${rowTitle} content`} deleting={false} onCancel={() => setConfirmReset(false)} onConfirm={reset} />
    </div>
  );
}
