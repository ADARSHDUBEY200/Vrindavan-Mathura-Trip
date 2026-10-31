"use client";

import { createContext, useContext } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { EditorType } from "@/lib/cms/config";
import { ImageDropzone } from "./ImageDropzone";
import { AddButton, Field, FieldLabel, IconButton, TextArea, TextInput, Toggle } from "./ui";

/*
 * Editor generated from the shape of a JSON document, so every heading, description and list in a page's
 * content is editable without a hand-written form per section:
 * string → input or textarea, boolean → toggle, array → add / remove / reorder, object → nested fields,
 * { src, alt, width, height } → image upload. Structural keys are kept but not shown.
 * `template` is the same value from the defaults: it gives a list that was emptied the shape of its next row.
 */

type Value = unknown;
type Obj = Record<string, Value>;

/** The storage bucket images on this page upload to. */
const BucketContext = createContext<EditorType>("Package");

const HIDDEN_KEYS = new Set(["id", "kind", "tone", "icon", "ref", "width", "height", "n", "templeSlug", "days", "href"]);
const LONG_TEXT = 90;

const isObject = (v: Value): v is Obj => Boolean(v) && typeof v === "object" && !Array.isArray(v);
const isImage = (v: Value): v is Obj => isObject(v) && typeof v.src === "string" && "alt" in v;

/** "keyTakeaways" → "Key takeaways". */
const humanize = (key: string) => {
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
};

/** A new list item: same shape as its neighbour, text emptied, structural values kept. */
function blankLike(sample: Value): Value {
  if (typeof sample === "string") return "";
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isObject(sample)) return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, HIDDEN_KEYS.has(k) ? v : blankLike(v)]));
  return sample;
}

function ArrayField({ label, items, onChange, template }: { label: string; items: Value[]; onChange: (items: Value[]) => void; template?: Value }) {
  const sample = items[0] ?? (Array.isArray(template) ? template[0] : undefined);
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <div className="min-w-0 flex-1 space-y-3">
            <ContentField name={`${label} ${i + 1}`} value={item} template={sample} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} bare />
          </div>
          <div className="flex shrink-0 gap-1">
            <IconButton label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
              <ArrowUp size={14} />
            </IconButton>
            <IconButton label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
              <ArrowDown size={14} />
            </IconButton>
            <IconButton label="Remove" tone="danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Trash2 size={14} />
            </IconButton>
          </div>
        </div>
      ))}
      {/* With no row and no template, the list is one of plain text. */}
      <AddButton onClick={() => onChange([...items, sample === undefined ? "" : blankLike(sample)])}>Add</AddButton>
    </div>
  );
}

function ContentField({ name, value, onChange, bare = false, template }: { name: string; value: Value; onChange: (value: Value) => void; bare?: boolean; template?: Value }) {
  const bucket = useContext(BucketContext);
  if (typeof value === "string") {
    const control =
      value.length > LONG_TEXT ? (
        <TextArea rows={Math.min(8, Math.ceil(value.length / 90) + 1)} value={value} onChange={onChange} aria-label={bare ? name : undefined} />
      ) : (
        <TextInput value={value} onChange={onChange} aria-label={bare ? name : undefined} />
      );
    return bare ? control : <Field label={name}>{control}</Field>;
  }
  if (typeof value === "boolean") return <Toggle label={name} checked={value} onChange={onChange} />;
  if (Array.isArray(value)) return <ArrayField label={name} items={value} onChange={onChange} template={template} />;
  if (isImage(value)) {
    return (
      <div className="space-y-2">
        <FieldLabel>{name}</FieldLabel>
        <div className="max-w-sm">
          <ImageDropzone editorType={bucket} compact value={value.src as string} onChange={(src) => onChange({ ...value, src })} label="Add .webp" />
        </div>
        <TextInput value={value.alt as string} placeholder="Alt text" aria-label={`${name} alt text`} onChange={(alt) => onChange({ ...value, alt })} />
      </div>
    );
  }
  if (isObject(value)) {
    if (bare) return <ObjectFields value={value} onChange={onChange} template={template} />;
    return (
      <fieldset className="space-y-3 rounded-lg border border-white/10 p-3">
        <legend className="px-1 text-[0.8rem] font-medium text-slate-200">{name}</legend>
        <ObjectFields value={value} onChange={onChange} template={template} />
      </fieldset>
    );
  }
  return null;
}

export function ObjectFields({ value, onChange, template }: { value: Obj; onChange: (value: Obj) => void; template?: Value }) {
  const shape = isObject(template) ? template : undefined;
  return (
    <>
      {Object.entries(value)
        .filter(([k]) => !HIDDEN_KEYS.has(k))
        .map(([k, v]) => (
          <ContentField key={k} name={humanize(k)} value={v} template={shape?.[k]} onChange={(next) => onChange({ ...value, [k]: next })} />
        ))}
    </>
  );
}

/** Top-level value of a section: an object's fields, or a single list. */
export function SectionFields({ name, value, onChange, template, bucket = "Package" }: { name: string; value: Value; onChange: (value: Value) => void; template?: Value; bucket?: EditorType }) {
  return (
    <BucketContext.Provider value={bucket}>
      {isObject(value) && !isImage(value) ? <ObjectFields value={value} onChange={onChange} template={template} /> : <ContentField name={name} value={value} onChange={onChange} template={template} />}
    </BucketContext.Provider>
  );
}
