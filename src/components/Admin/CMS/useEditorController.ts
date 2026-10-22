"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type RefObject } from "react";
import toast from "react-hot-toast";
import { useAutoSave } from "@/hooks/useAutoSave";
import type { EditorType } from "@/lib/cms/config";
import { fetchRow, saveRecord } from "@/lib/cms/save";
import { slugify } from "@/lib/cms/utils";
import { validateForm } from "./ui";

type Status = "draft" | "published";
type BaseForm = { title: string; slug: string };

type Options<F extends BaseForm> = {
  editorType: EditorType;
  mode: "create" | "edit";
  id?: string;
  empty: F;
  listHref: string;
  fromRow: (row: Record<string, unknown>) => F;
  toRow: (form: F, status: Status) => Record<string, unknown> & { slug: string };
  /** Extra checks after native validation. Return an error message or null. */
  validatePublish: (form: F) => string | null;
  /** Minimum fields for a draft. Return an error message or null. */
  validateDraft: (form: F) => string | null;
  /** The editor's <form>, used for native validation on publish. */
  formRef: RefObject<HTMLFormElement | null>;
};

/**
 * Shared state and actions for the Blog / Package / Temple editors:
 * loads the row in edit mode, autosaves, restores drafts, and runs the
 * publish / save-draft flows (validation → slug uniqueness → API → toast).
 */
export function useEditorController<F extends BaseForm>(options: Options<F>) {
  const { editorType, mode, id, empty, listHref, fromRow, toRow, validatePublish, validateDraft, formRef } = options;
  const router = useRouter();

  const [form, setForm] = useState<F>(empty);
  const [ready, setReady] = useState(mode === "create");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [saving, setSaving] = useState<false | "publish" | "draft">(false);

  useEffect(() => {
    if (mode !== "edit" || !id) return;
    let cancelled = false;
    fetchRow(editorType, id).then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data) {
        setLoadError(error ?? "Not found");
        return;
      }
      setForm(fromRow(data));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
    // fromRow is a stable module-level mapper.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorType, mode, id]);

  const storageKey = `cms_autosave_${editorType.toLowerCase()}_${mode === "create" ? "create" : `edit_${id}`}`;
  const autosave = useAutoSave(storageKey, form, { ready });

  const patch = useCallback((p: Partial<F>) => setForm((f) => ({ ...f, ...p })), []);

  const restoreDraft = () => {
    const draft = autosave.getSavedDraft();
    if (draft) {
      setForm({ ...empty, ...draft });
      setEditorKey((k) => k + 1); // remount uncontrolled rich-text editors
      toast.success("Draft restored");
    }
    autosave.dismissRestoreBanner(false);
  };

  async function save(status: Status) {
    if (saving) return;
    const isPublish = status === "published";

    if (isPublish) {
      if (!(await validateForm(formRef.current))) {
        toast.error("Please fill in the required fields");
        return;
      }
      const err = validatePublish(form);
      if (err) {
        toast.error(err);
        return;
      }
    } else {
      const err = validateDraft(form);
      if (err) {
        toast.error(err);
        return;
      }
    }

    const slug = form.slug.trim() || slugify(form.title);
    if (!slug) {
      toast.error("Add a title or slug first");
      return;
    }

    setSaving(isPublish ? "publish" : "draft");
    const error = await saveRecord(editorType, { ...toRow({ ...form, slug }, status), slug }, mode === "edit" ? id : undefined);
    setSaving(false);

    if (error) {
      toast.error(error);
      return;
    }
    autosave.flush();
    toast.success(isPublish ? (mode === "create" ? "Published" : "Updated") : "Draft saved");
    router.push(listHref);
    router.refresh();
  }

  return {
    form,
    setForm,
    patch,
    ready,
    loadError,
    editorKey,
    saving,
    lastSaved: autosave.lastSaved,
    showRestoreBanner: autosave.showRestoreBanner,
    restoreDraft,
    discardDraft: () => autosave.dismissRestoreBanner(true),
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      save("published");
    },
    onDraft: () => save("draft"),
  };
}
