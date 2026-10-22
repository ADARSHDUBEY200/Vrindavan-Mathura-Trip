"use client";

import type { EditorType } from "@/lib/cms/config";
import type { MetaValue } from "./CMSSeoSection";
import { Field, Section, TextArea, TextInput } from "./ui";

export function CMSSchema({ editorType, value, onChange }: { editorType: EditorType; value: MetaValue; onChange: (value: MetaValue) => void }) {
  return (
    <Section title="Schema" helper={`Structured-data title and description used in this ${editorType.toLowerCase()}'s JSON-LD.`} defaultOpen={false}>
      <Field label="Schema Title">
        <TextInput value={value.title} onChange={(title) => onChange({ ...value, title })} />
      </Field>
      <Field label="Schema Description">
        <TextArea rows={3} value={value.description} onChange={(description) => onChange({ ...value, description })} />
      </Field>
    </Section>
  );
}
