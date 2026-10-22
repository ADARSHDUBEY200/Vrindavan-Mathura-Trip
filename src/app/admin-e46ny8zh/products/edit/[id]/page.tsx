"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only: the editor reads localStorage (autosave) and mounts SunEditor.
const PackageForm = dynamic(() => import("@/components/Admin/forms/PackageForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function EditPackagePage() {
  const { id } = useParams<{ id: string }>();
  return <PackageForm key={id} mode="edit" id={id} />;
}
