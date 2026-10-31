"use client";

import type { ReactNode } from "react";
import { useEnquiryPopup } from "@/components/forms/EnquiryPopup";

/** Opens the site-wide enquiry popup. Sits above a card's stretched "View Details" link. */
export function EnquireButton({ className = "", children }: { className?: string; children: ReactNode }) {
  const open = useEnquiryPopup();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
