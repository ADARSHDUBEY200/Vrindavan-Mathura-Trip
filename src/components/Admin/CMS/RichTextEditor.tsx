"use client";

import dynamic from "next/dynamic";
import toast from "react-hot-toast";
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
    <div className="cms-editor overflow-hidden rounded-xl border border-indigo-500/40">
      <SunEditor
        defaultValue={defaultValue}
        onChange={onChange}
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
