"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";

export const cardClass =
  "rounded-2xl bg-linear-to-br from-[#0b1220]/80 via-[#0e1a2f]/80 to-[#0a1020]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)]";

export const inputClass =
  "w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-sky-500 [&>option]:bg-[#0f172a]";

/** Collapsible editor card with a heading and a short helper line. */
export function Section({
  title,
  helper,
  defaultOpen = true,
  children,
}: {
  title: string;
  helper?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const ref = useRef<HTMLElement>(null);

  // "invalid" does not bubble, but a capturing listener still sees it:
  // open the section when one of its fields fails validation.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onInvalid = () => setOpen(true);
    el.addEventListener("invalid", onInvalid, true);
    return () => el.removeEventListener("invalid", onInvalid, true);
  }, []);

  return (
    <section ref={ref} className={cardClass}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span>
          <span className="block text-lg font-semibold text-white">{title}</span>
          {helper && <span className="mt-0.5 block text-sm text-white/50">{helper}</span>}
        </span>
        <ChevronDown size={20} className={`mt-1 shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Hidden (not unmounted) so required fields still take part in validation. */}
      <div id={id} hidden={!open} className="space-y-5 border-t border-white/10 px-6 py-6">
        {children}
      </div>
    </section>
  );
}

/** Label for a control that is not a native input (e.g. the rich-text editor). */
export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="text-sm font-medium text-white/80">
      {children}
      {required && <span className="ml-0.5 text-rose-400">*</span>}
    </p>
  );
}

export function Field({ label, hint, required, children }: { label: string; hint?: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-white/80">
        <span>
          {label}
          {required && <span className="ml-0.5 text-rose-400">*</span>}
        </span>
        {hint && <span className="text-xs font-normal">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string | number | undefined;
  onChange: (value: string) => void;
};

export function TextInput({ value, onChange, className = "", ...rest }: InputProps) {
  return <input {...rest} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={`${inputClass} ${className}`} />;
}

type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> & {
  value: string | undefined;
  onChange: (value: string) => void;
};

export function TextArea({ value, onChange, rows = 4, className = "", ...rest }: TextAreaProps) {
  return <textarea {...rest} rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={`${inputClass} ${className}`} />;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required={required} className={inputClass}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
      {value && !options.includes(value) && <option value={value}>{value}</option>}
    </select>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-sky-500/40 px-4 py-2 text-sm text-sky-300 transition hover:bg-sky-500/10"
    >
      <Plus size={16} />
      {children}
    </button>
  );
}

export function IconButton({ label, onClick, children, tone = "default", disabled }: { label: string; onClick: () => void; children: React.ReactNode; tone?: "default" | "danger"; disabled?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 transition disabled:opacity-30 ${
        tone === "danger" ? "text-rose-300 hover:bg-rose-500/15" : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Generic repeatable list: renders each row with remove (and optional reorder) controls
 * plus a "+ Add" button. Rows need a stable `id` (crypto.randomUUID()).
 */
export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  create,
  renderItem,
  addLabel,
  reorder = false,
  emptyText = "Nothing added yet.",
  itemLabel = "Item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  addLabel: string;
  reorder?: boolean;
  emptyText?: string;
  itemLabel?: string;
}) {
  const update = (id: string, patch: Partial<T>) => onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id));
  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-white/40">{emptyText}</p>}
      {items.map((item, index) => (
        <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {itemLabel} {index + 1}
            </span>
            <div className="flex gap-1.5">
              {reorder && (
                <>
                  <IconButton label="Move up" onClick={() => move(index, -1)} disabled={index === 0}>
                    <ArrowUp size={15} />
                  </IconButton>
                  <IconButton label="Move down" onClick={() => move(index, 1)} disabled={index === items.length - 1}>
                    <ArrowDown size={15} />
                  </IconButton>
                </>
              )}
              <IconButton label={`Remove ${itemLabel.toLowerCase()}`} tone="danger" onClick={() => remove(item.id)}>
                <Trash2 size={15} />
              </IconButton>
            </div>
          </div>
          <div className="space-y-3">{renderItem(item, (patch) => update(item.id, patch), index)}</div>
        </div>
      ))}
      <AddButton onClick={() => onChange([...items, create()])}>{addLabel}</AddButton>
    </div>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
      <span className="text-sm text-white/80">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-sky-500 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500" />
    </label>
  );
}

/**
 * Runs native validation. Invalid fields open their (collapsed) sections first,
 * so the browser can then focus the field and show its message.
 */
export async function validateForm(form: HTMLFormElement | null): Promise<boolean> {
  if (!form) return false;
  if (form.checkValidity()) return true;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  form.reportValidity();
  return false;
}
