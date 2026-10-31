"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Trash2 } from "lucide-react";
import { uid } from "@/lib/cms/utils";
import { RichTextEditor } from "./RichTextEditor";
import { AddButton, Field, FieldLabel, IconButton, ListEditor, TextInput } from "./ui";

export type ItineraryActivity = { id: string; time: string; text: string };
export type ItineraryDay = { id: string; day: string; title: string; description: string; tag?: string; activities?: ItineraryActivity[] };

/** One collapsible day. The rich-text editor mounts only while the day is open, so a long trip stays light. */
function DayRow({
  day,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  day: ItineraryDay;
  index: number;
  total: number;
  onChange: (patch: Partial<ItineraryDay>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(!day.title);
  const activities = day.activities ?? [];
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="flex items-center gap-2 p-2.5">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
          <span className="shrink-0 rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-200">Day {index + 1}</span>
          <span className="truncate text-sm text-white">{day.title || "Untitled day"}</span>
          <ChevronDown size={16} className={`ml-auto shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <IconButton label="Move up" onClick={() => onMove(-1)} disabled={index === 0}>
          <ArrowUp size={15} />
        </IconButton>
        <IconButton label="Move down" onClick={() => onMove(1)} disabled={index === total - 1}>
          <ArrowDown size={15} />
        </IconButton>
        <IconButton label="Remove day" tone="danger" onClick={onRemove}>
          <Trash2 size={15} />
        </IconButton>
      </div>

      {open && (
        <div className="space-y-3 border-t border-white/10 p-3">
          <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
            <Field label="Title">
              <TextInput value={day.title} placeholder="Arrival & Banke Bihari darshan" onChange={(title) => onChange({ title })} />
            </Field>
            <Field label="Tag">
              <TextInput value={day.tag} placeholder="Full Day" onChange={(tag) => onChange({ tag })} />
            </Field>
          </div>
          <div className="space-y-1.5">
            <FieldLabel>Description</FieldLabel>
            <RichTextEditor editorType="Package" defaultValue={day.description} onChange={(description) => onChange({ description })} height="200px" />
          </div>
          <div className="space-y-2">
            <FieldLabel>Activities</FieldLabel>
            <ListEditor
              items={activities}
              onChange={(next) => onChange({ activities: next })}
              create={() => ({ id: uid(), time: "", text: "" })}
              addLabel="Add activity"
              itemLabel="Activity"
              reorder
              emptyText="Optional. Short timed steps shown under the description."
              renderItem={(a, update) => (
                <div className="grid gap-3 md:grid-cols-[9rem_1fr]">
                  <Field label="Time">
                    <TextInput value={a.time} placeholder="7:30 AM" onChange={(time) => update({ time })} />
                  </Field>
                  <Field label="Activity">
                    <TextInput value={a.text} placeholder="Darshan at Banke Bihari Temple" onChange={(text) => update({ text })} />
                  </Field>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Day-wise itinerary: add, remove, reorder and edit days and their activities. Days renumber automatically. */
export function ItineraryEditor({ days, onChange }: { days: ItineraryDay[]; onChange: (days: ItineraryDay[]) => void }) {
  const renumber = (list: ItineraryDay[]) => list.map((d, i) => ({ ...d, day: String(i + 1) }));
  const move = (index: number, dir: -1 | 1) => {
    const next = [...days];
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    onChange(renumber(next));
  };
  return (
    <div className="space-y-3">
      {days.length === 0 && <p className="text-sm text-slate-400">No days yet.</p>}
      {days.map((d, i) => (
        <DayRow
          key={d.id}
          day={d}
          index={i}
          total={days.length}
          onChange={(patch) => onChange(days.map((x) => (x.id === d.id ? { ...x, ...patch } : x)))}
          onMove={(dir) => move(i, dir)}
          onRemove={() => onChange(renumber(days.filter((x) => x.id !== d.id)))}
        />
      ))}
      <AddButton onClick={() => onChange([...days, { id: uid(), day: String(days.length + 1), title: "", description: "" }])}>Add day</AddButton>
    </div>
  );
}
