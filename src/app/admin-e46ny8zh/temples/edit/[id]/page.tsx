"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only: the editor reads localStorage (autosave) and mounts SunEditor.
const TempleForm = dynamic(() => import("@/components/Admin/forms/TempleForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function EditTemplePage() {
  const { id } = useParams<{ id: string }>();
  return <TempleForm key={id} mode="edit" id={id} />;
}
