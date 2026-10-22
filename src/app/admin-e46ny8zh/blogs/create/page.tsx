"use client";

import dynamic from "next/dynamic";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only: the editor reads localStorage (autosave) and mounts SunEditor.
const BlogForm = dynamic(() => import("@/components/Admin/forms/BlogForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function CreateBlogPage() {
  return <BlogForm mode="create" />;
}
