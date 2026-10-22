import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_BASE } from "@/lib/cms/config";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname === ADMIN_BASE || pathname.startsWith(`${ADMIN_BASE}/`);

  // Public traffic never waits on a Supabase round trip.
  if (!isAdmin) return NextResponse.next();

  return updateSession(request);
}

// Matchers must be static literals; keep these in sync with ADMIN_BASE.
export const config = {
  matcher: ["/admin-e46ny8zh", "/admin-e46ny8zh/:path*"],
};
