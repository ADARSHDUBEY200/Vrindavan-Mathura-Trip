"use client";

import type { EditorType } from "@/lib/cms/config";
import { htmlTextLength } from "@/lib/cms/utils";
import { RichTextEditor } from "./RichTextEditor";
import { Field, Section, TextArea } from "./ui";

export function CMSContentSection({
  editorType,
  subcontent,
  content,
  onSubcontentChange,
  onContentChange,
  ready,
  editorKey,
  minLength,
}: {
  editorType: EditorType;
  subcontent: string;
  content: string;
  onSubcontentChange: (value: string) => void;
  onContentChange: (html: string) => void;
  /** False until edit data has loaded; SunEditor reads defaultValue only once. */
  ready: boolean;
  /** Change to remount the editor with new content (e.g. after restoring a draft). */
  editorKey: number;
  minLength?: number;
}) {
  const length = htmlTextLength(content);
  return (
    <Section title="Content" helper="Short intro shown above the article, and the main body.">
      <Field label="Sub Content">
        <TextArea rows={3} value={subcontent} placeholder="A short summary or intro paragraph" onChange={onSubcontentChange} />
      </Field>
      <div className="flex items-baseline justify-between gap-3 text-sm font-medium text-white/80">
        <span>
          Content{minLength ? <span className="ml-0.5 text-rose-400">*</span> : null}
        </span>
        {minLength ? (
          <span className={`text-xs font-normal ${length < minLength ? "text-amber-400" : "text-emerald-400"}`}>
            {length} / {minLength}+ characters
          </span>
        ) : null}
      </div>
      {ready ? (
        <RichTextEditor key={editorKey} editorType={editorType} defaultValue={content} onChange={onContentChange} height="480px" placeholder="Write the main content…" />
      ) : (
        <div className="h-48 animate-pulse rounded-xl bg-white/5" />
      )}
    </Section>
  );
}
