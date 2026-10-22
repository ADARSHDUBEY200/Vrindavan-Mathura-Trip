import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminToaster } from "@/components/Admin/AdminToaster";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { DashboardLayout } from "@/components/Admin/DashboardLayout";
import { ADMIN_LOGIN } from "@/lib/cms/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// With Cache Components, reading the session (cookies) must happen inside a
// Suspense boundary, so the auth check lives in AdminGate below.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<CMSLoading fullScreen label="Checking session…" />}>
      <AdminGate>{children}</AdminGate>
    </Suspense>
  );
}

async function AdminGate({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) redirect(ADMIN_LOGIN);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) redirect(ADMIN_LOGIN);

  return (
    <DashboardLayout>
      {children}
      <AdminToaster />
    </DashboardLayout>
  );
}
