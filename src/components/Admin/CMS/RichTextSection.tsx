"use client";

import type { EditorType } from "@/lib/cms/config";
import { RichTextEditor } from "./RichTextEditor";
import { Section } from "./ui";

/** A collapsible card holding one rich-text field. Mounts the editor only once data is ready. */
export function RichTextSection({
  title,
  helper,
  editorType,
  value,
  onChange,
  ready,
  editorKey,
  height = "260px",
  defaultOpen = true,
  children,
}: {
  title: string;
  helper?: string;
  editorType: EditorType;
  value: string;
  onChange: (html: string) => void;
  ready: boolean;
  editorKey: number;
  height?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Section title={title} helper={helper} defaultOpen={defaultOpen}>
      {children}
      {ready ? (
        <RichTextEditor key={editorKey} editorType={editorType} defaultValue={value} onChange={onChange} height={height} />
      ) : (
        <div className="h-40 animate-pulse rounded-xl bg-white/5" />
      )}
    </Section>
  );
}

/** Shared editor frame: header, restore banner, form, and the error state for a missing row. */
export function EditorShell({
  loadError,
  ready,
  children,
}: {
  loadError: string | null;
  ready: boolean;
  children: React.ReactNode;
}) {
  if (loadError) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
        Could not load this item: {loadError}
      </div>
    );
  }
  return <div className={`mx-auto max-w-5xl space-y-6 ${ready ? "" : "opacity-80"}`}>{children}</div>;
}
