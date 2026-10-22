"use client";

import type { EditorType } from "@/lib/cms/config";
import { uid } from "@/lib/cms/utils";
import { Field, ListEditor, Section, TextArea, TextInput } from "./ui";

export type Faq = { id: string; question: string; answer: string };

export function FaqHandler({ editorType, faqs, onChange }: { editorType: EditorType; faqs: Faq[]; onChange: (faqs: Faq[]) => void }) {
  return (
    <Section title="FAQs" helper={`Questions and answers shown on the ${editorType.toLowerCase()} page and in FAQ schema.`} defaultOpen={false}>
      <ListEditor
        items={faqs}
        onChange={onChange}
        create={() => ({ id: uid(), question: "", answer: "" })}
        addLabel="Add FAQ"
        itemLabel="FAQ"
        reorder
        emptyText="No FAQs yet."
        renderItem={(faq, update) => (
          <>
            <Field label="Question">
              <TextInput value={faq.question} onChange={(question) => update({ question })} />
            </Field>
            <Field label="Answer">
              <TextArea rows={3} value={faq.answer} onChange={(answer) => update({ answer })} />
            </Field>
          </>
        )}
      />
    </Section>
  );
}
