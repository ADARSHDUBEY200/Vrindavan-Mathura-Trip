"use client";

import type { EditorType } from "@/lib/cms/config";
import { Field, Section, TextArea, TextInput } from "./ui";

export type MetaValue = { title: string; description: string };

function Counter({ length, target }: { length: number; target: number }) {
  return <span className={length > target ? "text-amber-400" : "text-white/40"}>{length} / {target}</span>;
}

export function CMSSeoSection({ editorType, value, onChange }: { editorType: EditorType; value: MetaValue; onChange: (value: MetaValue) => void }) {
  return (
    <Section title="SEO" helper={`Search result title and description for this ${editorType.toLowerCase()}.`}>
      <Field label="Meta Title" required hint={<Counter length={value.title.length} target={60} />}>
        <TextInput required value={value.title} placeholder="Aim for about 60 characters" onChange={(title) => onChange({ ...value, title })} />
      </Field>
      <Field label="Meta Description" required hint={<Counter length={value.description.length} target={160} />}>
        <TextArea required rows={3} value={value.description} placeholder="Aim for about 160 characters" onChange={(description) => onChange({ ...value, description })} />
      </Field>
    </Section>
  );
}
