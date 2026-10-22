"use client";

import { ClipboardPaste, Trash2 } from "lucide-react";
import { parseClipboardTable } from "@/lib/cms/clipboard";
import { uid } from "@/lib/cms/utils";
import { AddButton, IconButton, inputClass } from "./ui";

export type PasteColumn<T> = {
  key: Exclude<keyof T, "id"> & string;
  label: string;
  placeholder?: string;
};

type Row = Record<string, string>;

/**
 * Array-of-rows editor that accepts a table pasted from Word / Google Sheets / Excel.
 * Cells map to columns by position; a header row matching the column labels is skipped.
 * Rows can also be added, edited and removed by hand.
 */
export function PasteTableEditor<T extends { id: string }>({
  columns,
  rows,
  onChange,
  addLabel = "Add row",
}: {
  columns: PasteColumn<T>[];
  rows: T[];
  onChange: (rows: T[]) => void;
  addLabel?: string;
}) {
  const typedRows = rows as unknown as Row[];
  const emit = (next: Row[]) => onChange(next as unknown as T[]);

  const blankRow = (): Row => {
    const row: Row = { id: uid() };
    columns.forEach((c) => (row[c.key] = ""));
    return row;
  };

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    let grid = parseClipboardTable(e.clipboardData);
    if (!grid.length) return;

    const looksLikeHeader = grid[0].every((cell, i) => !cell || cell.toLowerCase() === columns[i]?.label.toLowerCase());
    if (looksLikeHeader) grid = grid.slice(1);

    const pasted = grid.map((cells) => {
      const row = blankRow();
      columns.forEach((c, i) => (row[c.key] = cells[i] ?? ""));
      return row;
    });

    // Replace a list that only holds blank rows; otherwise append.
    const hasContent = typedRows.some((r) => columns.some((c) => r[c.key]?.trim()));
    emit(hasContent ? [...typedRows, ...pasted] : pasted);
  }

  const update = (id: string, key: string, value: string) => emit(typedRows.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm text-white/60">
          <ClipboardPaste size={16} /> Paste rows from Word or Google Sheets (columns: {columns.map((c) => c.label).join(" | ")})
        </span>
        <textarea
          rows={2}
          onPaste={onPaste}
          value=""
          onChange={() => undefined}
          placeholder="Click here and press Ctrl+V…"
          className={`${inputClass} resize-none border-dashed`}
        />
      </label>

      {typedRows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-white/5 text-left text-white/60">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-3 py-2 font-medium">
                    {c.label}
                  </th>
                ))}
                <th className="w-12 px-3 py-2">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {typedRows.map((row) => (
                <tr key={row.id} className="border-t border-white/10">
                  {columns.map((c) => (
                    <td key={c.key} className="p-2">
                      <input
                        aria-label={c.label}
                        value={row[c.key] ?? ""}
                        placeholder={c.placeholder}
                        onChange={(e) => update(row.id, c.key, e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-sky-500"
                      />
                    </td>
                  ))}
                  <td className="p-2">
                    <IconButton label="Remove row" tone="danger" onClick={() => emit(typedRows.filter((r) => r.id !== row.id))}>
                      <Trash2 size={15} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <AddButton onClick={() => emit([...typedRows, blankRow()])}>{addLabel}</AddButton>
        {typedRows.length > 0 && (
          <button type="button" onClick={() => emit([])} className="rounded-xl px-4 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white">
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
