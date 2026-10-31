import { NextResponse, type NextRequest } from "next/server";
import { SITE_PAGE_TABLE } from "@/lib/cms/config";
import { createCrudHandlers, revalidators } from "@/lib/cms/route-handler";
import { verifyAdmin } from "@/lib/cms/verify-admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const { POST, PUT, DELETE } = createCrudHandlers(SITE_PAGE_TABLE, revalidators.pages);

/** The admin's view of one page, unpublished draft included. The draft column is not readable with the anon key. */
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const { data, error } = await createAdminClient().from(SITE_PAGE_TABLE).select("*").eq("slug", slug).maybeSingle();
  // PGRST205: the table has not been created yet.
  if (error) return NextResponse.json({ error: error.message, tableMissing: error.code === "PGRST205" }, { status: 400 });
  return NextResponse.json({ data });
}
