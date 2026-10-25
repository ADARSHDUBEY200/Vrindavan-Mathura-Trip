"use client";

import { Loader2, Save, Send } from "lucide-react";

export function CMSActions({
  mode,
  editingLabel,
  saving,
  onDraft,
}: {
  mode: "create" | "edit";
  editingLabel: string;
  saving: false | "publish" | "draft";
  onDraft: () => void;
}) {
  return (
    <div className="sticky bottom-3 z-30 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0b1220]/95 px-4 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <span className="min-w-0 truncate text-sm text-slate-400">
        Editing <span className="text-white">{editingLabel || "Untitled"}</span>
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onDraft}
          disabled={Boolean(saving)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold transition hover:bg-emerald-500 disabled:opacity-60"
        >
          {saving === "draft" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Draft
        </button>
        <button
          type="submit"
          disabled={Boolean(saving)}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold transition hover:bg-sky-500 disabled:opacity-60"
        >
          {saving === "publish" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {mode === "create" ? "Publish" : "Update"}
        </button>
      </div>
    </div>
  );
}
