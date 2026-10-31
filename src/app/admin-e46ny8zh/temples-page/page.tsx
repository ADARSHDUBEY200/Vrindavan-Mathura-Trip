"use client";

import dynamic from "next/dynamic";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only, like the other editors.
const TemplesPageForm = dynamic(() => import("@/components/Admin/forms/TemplesPageForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function TemplesPageEditor() {
  return <TemplesPageForm />;
}
