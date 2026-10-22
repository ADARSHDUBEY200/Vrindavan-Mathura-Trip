"use client";

import Link from "next/link";
import { ArrowLeft, CloudCheck, History, X } from "lucide-react";
import type { EditorType } from "@/lib/cms/config";

const NOUN: Record<EditorType, string> = { Blog: "Blog", Package: "Tour Package", Temple: "Temple" };

export function CMSHeader({
  editorType,
  mode,
  backHref,
  lastSaved,
}: {
  editorType: EditorType;
  mode: "create" | "edit";
  backHref: string;
  lastSaved: Date | null;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white">
          <ArrowLeft size={15} /> Back to list
        </Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
          {mode === "create" ? "Create" : "Edit"} {NOUN[editorType]}
        </h1>
        <p className="mt-1 text-sm text-white/50">Fields marked * are required to publish.</p>
      </div>
      {lastSaved && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          <CloudCheck size={14} />
          Autosaved {lastSaved.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
        </span>
      )}
    </div>
  );
}

export function RestoreBanner({ onRestore, onDismiss }: { onRestore: () => void; onDismiss: () => void }) {
  return (
    <div role="status" className="flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      <History size={18} className="shrink-0" />
      <span className="flex-1">You have an unsaved draft from your last session.</span>
      <button type="button" onClick={onRestore} className="rounded-lg bg-amber-500 px-3 py-1.5 font-semibold text-[#1f1300] hover:bg-amber-400">
        Restore
      </button>
      <button type="button" onClick={onDismiss} aria-label="Discard saved draft" className="rounded-lg p-1.5 hover:bg-amber-500/20">
        <X size={16} />
      </button>
    </div>
  );
}
