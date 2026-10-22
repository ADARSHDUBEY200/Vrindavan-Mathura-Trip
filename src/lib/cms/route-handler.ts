import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { decodeBody } from "./body-codec";
import { CMS_PACKAGES_TAG } from "./packages";
import { verifyAdmin } from "./verify-admin";

type Row = Record<string, unknown>;

/** Decodes a `{ __enc: "b64" }` body, and still accepts plain JSON. */
export async function readBody(request: NextRequest): Promise<Row> {
  const raw = await request.json();
  const body = decodeBody<Row>(raw);
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  return body;
}

const json = (data: unknown, status = 200) => NextResponse.json(data, { status });
const errorMessage = (err: unknown) => (err instanceof Error ? err.message : "Unexpected error");

/**
 * Builds POST / PUT / DELETE handlers for one CMS table.
 * `revalidate` receives the affected slug (when known) and refreshes the public pages.
 */
export function createCrudHandlers(table: string, revalidate: (slug?: string) => void) {
  const guard = async () => ((await verifyAdmin()) ? null : json({ error: "Unauthorized" }, 401));

  const safeRevalidate = (slug?: unknown) => {
    try {
      revalidate(typeof slug === "string" && slug ? slug : undefined);
    } catch (err) {
      console.error(`[cms] revalidate ${table} failed`, err);
    }
  };

  async function POST(request: NextRequest) {
    const denied = await guard();
    if (denied) return denied;
    try {
      const body = await readBody(request);
      delete body.id;
      const { data, error } = await createAdminClient().from(table).insert(body).select().single();
      if (error) return json({ error: error.message }, 400);
      safeRevalidate(data?.slug);
      return json({ data });
    } catch (err) {
      return json({ error: errorMessage(err) }, 400);
    }
  }

  async function PUT(request: NextRequest) {
    const denied = await guard();
    if (denied) return denied;
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return json({ error: "Missing id" }, 400);
    try {
      const body = await readBody(request);
      delete body.id;
      delete body.created_at;
      const supabase = createAdminClient();
      const { data: previous } = await supabase.from(table).select("slug").eq("id", id).maybeSingle();
      const { data, error } = await supabase.from(table).update(body).eq("id", id).select().single();
      if (error) return json({ error: error.message }, 400);
      safeRevalidate(data?.slug);
      if (previous?.slug && previous.slug !== data?.slug) safeRevalidate(previous.slug);
      return json({ data });
    } catch (err) {
      return json({ error: errorMessage(err) }, 400);
    }
  }

  async function DELETE(request: NextRequest) {
    const denied = await guard();
    if (denied) return denied;
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return json({ error: "Missing id" }, 400);
    try {
      const supabase = createAdminClient();
      const { data: previous } = await supabase.from(table).select("slug").eq("id", id).maybeSingle();
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) return json({ error: error.message }, 400);
      safeRevalidate(previous?.slug);
      return json({ ok: true });
    } catch (err) {
      return json({ error: errorMessage(err) }, 400);
    }
  }

  return { POST, PUT, DELETE };
}

/** Public routes fed by each CMS table. Route patterns include the (site) group. */
export const revalidators = {
  blogs(slug?: string) {
    revalidatePath("/travel-guide");
    revalidatePath("/(site)/travel-guide/[slug]", "page");
    if (slug) revalidatePath(`/travel-guide/${slug}`);
  },
  packages(slug?: string) {
    revalidateTag(CMS_PACKAGES_TAG, "max");
    revalidatePath("/");
    revalidatePath("/tour-packages");
    revalidatePath("/(site)/tour-packages/[slug]", "page");
    if (slug) revalidatePath(`/tour-packages/${slug}`);
  },
  temples(slug?: string) {
    revalidatePath("/temples");
    revalidatePath("/(site)/temples/[slug]", "page");
    if (slug) revalidatePath(`/temples/${slug}`);
  },
};
