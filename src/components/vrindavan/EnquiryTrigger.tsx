"use client";

import type { ReactNode } from "react";
import { useEnquiryPopup } from "@/components/forms/EnquiryPopup";

/** Opens the site-wide enquiry popup. */
export function EnquiryTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const open = useEnquiryPopup();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
