"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImageUp, Loader2, X } from "lucide-react";
import type { EditorType } from "@/lib/cms/config";
import { MAX_IMAGE_BYTES } from "@/lib/cms/constants";
import { uploadImage } from "@/lib/cms/save";

/** Dashed drop zone: accepts one .webp up to 2 MB, uploads it, and reports the public URL. */
export function ImageDropzone({
  editorType,
  value,
  onChange,
  label = "Drop a .webp image here, or click to browse",
  compact = false,
}: {
  editorType: EditorType;
  value: string;
  onChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (file.type !== "image/webp") {
      toast.error("Only .webp images are allowed");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be 2 MB or smaller");
      return;
    }
    setUploading(true);
    const { url, error } = await uploadImage(editorType, file);
    setUploading(false);
    if (error || !url) {
      toast.error(`Upload failed: ${error ?? "unknown error"}`);
      return;
    }
    onChange(url);
    toast.success("Image uploaded");
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      className={`relative overflow-hidden rounded-xl border-2 border-dashed transition ${dragging ? "border-sky-400 bg-sky-500/10" : "border-white/15 bg-white/[0.03]"} ${compact ? "aspect-[4/3]" : "min-h-56"}`}
    >
      {value ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- preview of an arbitrary uploaded URL */}
          <img src={value} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute right-2 top-2 flex gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white hover:bg-black/80">
              Replace
            </button>
            <button type="button" onClick={() => onChange("")} aria-label="Remove image" className="rounded-lg bg-black/60 p-1.5 text-white hover:bg-rose-600">
              <X size={14} />
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-white/55 hover:text-white"
        >
          {uploading ? <Loader2 size={26} className="animate-spin" /> : <ImageUp size={26} />}
          <span>{uploading ? "Uploading…" : label}</span>
          {!compact && <span className="text-xs text-white/35">WebP only · max 2 MB</span>}
        </button>
      )}
      {uploading && value && (
        <div className="absolute inset-0 grid place-items-center bg-black/60">
          <Loader2 size={26} className="animate-spin" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/webp"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
