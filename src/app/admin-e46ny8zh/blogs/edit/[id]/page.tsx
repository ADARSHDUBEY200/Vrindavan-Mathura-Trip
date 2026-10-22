"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only: the editor reads localStorage (autosave) and mounts SunEditor.
const BlogForm = dynamic(() => import("@/components/Admin/forms/BlogForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  return <BlogForm key={id} mode="edit" id={id} />;
}
