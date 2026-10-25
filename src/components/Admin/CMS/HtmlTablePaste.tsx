"use client";

import { ClipboardPaste } from "lucide-react";
import { gridToHtmlTable, parseClipboardTable } from "@/lib/cms/clipboard";
import { inputClass } from "./ui";

/**
 * Stores a pasted table as clean HTML (used for the blog's temple timings).
 * Pasting rebuilds the table from cell text, so Word/Sheets styles never reach the site.
 */
export function HtmlTablePaste({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const grid = parseClipboardTable(e.clipboardData);
    if (grid.length && grid.some((r) => r.length > 1)) {
      e.preventDefault();
      onChange(gridToHtmlTable(grid));
    }
  }

  return (
    <div className="space-y-3">
      <span className="flex items-center gap-2 text-[0.8rem] text-slate-300">
        <ClipboardPaste size={16} /> Paste a table from Word or Google Sheets, or edit the HTML directly.
      </span>
      <textarea rows={4} value={value} onPaste={onPaste} onChange={(e) => onChange(e.target.value)} placeholder="<table>…</table>" className={`${inputClass} font-mono text-xs`} />
      {value.trim() && (
        <div className="cms-table-preview overflow-x-auto rounded-lg border border-white/10 p-3 text-slate-200">
          <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Preview</p>
          {/* Admin-only preview of admin-authored HTML. */}
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )}
    </div>
  );
}
