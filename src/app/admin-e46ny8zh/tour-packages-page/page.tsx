"use client";

import dynamic from "next/dynamic";
import { CMSLoading } from "@/components/Admin/CMSLoading";

// Client-only, like the other editors.
const TourPackagesPageForm = dynamic(() => import("@/components/Admin/forms/TourPackagesPageForm"), {
  ssr: false,
  loading: () => <CMSLoading label="Loading editor…" />,
});

export default function TourPackagesPageEditor() {
  return <TourPackagesPageForm />;
}
