"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import type { EditorType } from "@/lib/cms/config";
import { CATEGORY_LABEL, CATEGORY_OPTIONS } from "@/lib/cms/constants";
import { slugify } from "@/lib/cms/utils";
import { Field, Section, Select, TextInput } from "./ui";

type Patch = { title?: string; category?: string; slug?: string };

export function CMSMetaSection({
  editorType,
  title,
  category,
  slug,
  onChange,
  autoSlug = true,
  children,
}: {
  editorType: EditorType;
  title: string;
  category: string;
  slug: string;
  onChange: (patch: Patch) => void;
  /** Suggest the slug from the title while the slug field is untouched (create mode). */
  autoSlug?: boolean;
  children?: React.ReactNode;
}) {
  const [slugTouched, setSlugTouched] = useState(!autoSlug);
  const label = CATEGORY_LABEL[editorType];

  return (
    <Section title="Basic details" helper={`Title, ${label.toLowerCase()} and URL slug.`}>
      <Field label="Title" required>
        <TextInput
          required
          value={title}
          placeholder="Enter a clear, descriptive title"
          onChange={(value) => onChange(slugTouched ? { title: value } : { title: value, slug: slugify(value) })}
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={label} required>
          <Select required value={category} onChange={(value) => onChange({ category: value })} options={CATEGORY_OPTIONS[editorType]} placeholder={`Select ${label.toLowerCase()}`} />
        </Field>
        <Field
          label="Slug"
          required
          hint={
            <button type="button" onClick={() => onChange({ slug: slugify(title) })} className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200">
              <Wand2 size={12} /> From title
            </button>
          }
        >
          <TextInput
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and single hyphens"
            value={slug}
            placeholder="url-friendly-slug"
            onChange={(value) => {
              setSlugTouched(true);
              onChange({ slug: value.toLowerCase().replace(/\s+/g, "-") });
            }}
          />
        </Field>
      </div>
      {children}
    </Section>
  );
}
