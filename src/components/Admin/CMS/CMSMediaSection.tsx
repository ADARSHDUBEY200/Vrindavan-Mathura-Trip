"use client";

import type { EditorType } from "@/lib/cms/config";
import { ImageDropzone } from "./ImageDropzone";
import { Field, Section, TextInput } from "./ui";

export function CMSMediaSection({
  editorType,
  image,
  alt,
  onImageChange,
  onAltChange,
  title = "Media",
  helper = "Cover image (.webp, 2 MB max) and its alt text.",
}: {
  editorType: EditorType;
  image: string;
  alt: string;
  onImageChange: (url: string) => void;
  onAltChange: (alt: string) => void;
  title?: string;
  helper?: string;
}) {
  return (
    <Section title={title} helper={helper}>
      <ImageDropzone editorType={editorType} value={image} onChange={onImageChange} />
      <Field label="Alt text" required>
        <TextInput required value={alt} placeholder="Describe the image for screen readers and search" onChange={onAltChange} />
      </Field>
    </Section>
  );
}
