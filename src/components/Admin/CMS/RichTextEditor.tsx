"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import type SunEditorCore from "suneditor/src/lib/core";
import type { UploadBeforeHandler } from "suneditor-react/dist/types/upload";
import { MAX_IMAGE_BYTES } from "@/lib/cms/constants";
import type { EditorType } from "@/lib/cms/config";
import { uploadImage } from "@/lib/cms/save";
import "suneditor/dist/css/suneditor.min.css";
import "./cms-editor.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse rounded-xl bg-white/5" />,
});

const BUTTONS = [
  ["undo", "redo"],
  ["formatBlock"],
  ["bold", "italic", "underline"],
  ["list", "align"],
  ["link", "image", "table"],
  ["codeView"],
];

type Props = {
  /** Initial HTML. SunEditor is uncontrolled: remount (change `key`) to load new content. */
  defaultValue?: string;
  onChange: (html: string) => void;
  editorType: EditorType;
  height?: string;
  placeholder?: string;
};

export function RichTextEditor({ defaultValue, onChange, editorType, height = "320px", placeholder }: Props) {
  const instance = useRef<SunEditorCore | null>(null);
  const edited = useRef(false);

  // SunEditor keeps the first onChange it is given, so `report` always calls the current one.
  // Otherwise an itinerary day's description would write back the form as it was on mount.
  const latestOnChange = useRef(onChange);
  useEffect(() => {
    latestOnChange.current = onChange;
  });

  function report(html: string) {
    edited.current = false;
    latestOnChange.current(html);
  }

  // SunEditor reports a change about 400 ms late, and only reports code view when it closes.
  // Leaving the editor sends the edit now, so clicking Save right after typing keeps every word.
  function flushEdit(e: React.FocusEvent<HTMLDivElement>) {
    if (!edited.current || !instance.current) return;
    const code = e.target instanceof HTMLTextAreaElement ? e.target.value : null;
    report(code === null ? instance.current.getContents(true) : instance.current.core.cleanHTML(code));
  }

  // Images inserted into the content go to the same bucket as the cover image,
  // instead of being embedded as base64.
  function onImageUploadBefore(files: File[], _info: object, uploadHandler: UploadBeforeHandler) {
    const file = files[0];
    if (!file) return false;
    if (file.type !== "image/webp" || file.size > MAX_IMAGE_BYTES) {
      toast.error("Only .webp images up to 2 MB are allowed");
      return false;
    }
    uploadImage(editorType, file).then(({ url, error }) => {
      if (error || !url) {
        toast.error(error ?? "Image upload failed");
        uploadHandler(error ?? "Image upload failed");
        return;
      }
      uploadHandler({ result: [{ url, name: file.name, size: file.size }] });
    });
    return undefined;
  }

  return (
    <div
      className="cms-editor overflow-hidden rounded-xl border border-indigo-500/40"
      onInput={(e) => {
        if ((e.target as Element).closest(".se-wrapper")) edited.current = true;
      }}
      onBlur={flushEdit}
    >
      <SunEditor
        getSunEditorInstance={(editor) => {
          instance.current = editor;
        }}
        defaultValue={defaultValue}
        onChange={report}
        placeholder={placeholder}
        height={height}
        onImageUploadBefore={onImageUploadBefore}
        setOptions={{
          buttonList: BUTTONS,
          defaultTag: "p",
          minHeight: "160px",
          resizingBar: true,
          imageAccept: ".webp",
        }}
      />
    </div>
  );
}
