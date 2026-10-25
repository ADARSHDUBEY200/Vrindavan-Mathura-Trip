"use client";

import { AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  itemName?: string;
  deleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, itemName, deleting = false, onCancel, onConfirm }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <div className="cms-admin w-full max-w-md rounded-xl border border-white/10 bg-[#0f172a] p-6 text-white shadow-2xl">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-500/15 text-rose-300">
            <AlertTriangle size={20} />
          </span>
          <div>
            <h2 id="delete-title" className="text-lg font-semibold">
              Delete this item?
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              {itemName ? <>&ldquo;{itemName}&rdquo; will be permanently deleted.</> : "This item will be permanently deleted."} This cannot be undone.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} disabled={deleting} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold hover:bg-rose-500 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
