import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { revalidators } from "@/lib/cms/route-handler";

/**
 * Manual revalidation:
 *   /api/revalidate?secret=…                     every CMS-fed public page
 *   /api/revalidate?secret=…&type=blogs&slug=…   one resource (blogs | packages | temples)
 *   /api/revalidate?secret=…&path=/some/path     one literal path
 */
async function handle(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || params.get("secret") !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = params.get("path");
  const type = params.get("type");
  const slug = params.get("slug") ?? undefined;

  if (path) {
    revalidatePath(path);
  } else if (type === "blogs" || type === "packages" || type === "temples") {
    revalidators[type](slug);
  } else {
    revalidators.blogs();
    revalidators.packages();
    revalidators.temples();
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export const GET = handle;
export const POST = handle;
