import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { decodeBody } from "./body-codec";
import { BLOGS_PATH, CMS_BLOGS_TAG } from "./blogs";
import { CMS_PACKAGES_TAG } from "./packages";
import { CMS_PAGES_TAG } from "./site-pages";
import { TEMPLES_PATH } from "./temple-fields";
import { CMS_TEMPLES_TAG } from "./temples";
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
 * `validate` rejects a body before it reaches the table: it returns an error message or null.
 */
export function createCrudHandlers(table: string, revalidate: (slug?: string) => void, validate?: (row: Row) => string | null) {
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
      const invalid = validate?.(body);
      if (invalid) return json({ error: invalid }, 400);
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
      const invalid = validate?.(body);
      if (invalid) return json({ error: invalid }, 400);
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
    revalidateTag(CMS_BLOGS_TAG, "max");
    revalidatePath(BLOGS_PATH);
    revalidatePath(`/(site)${BLOGS_PATH}/[slug]`, "page");
    revalidatePath("/sitemap.xml");
    if (slug) revalidatePath(`${BLOGS_PATH}/${slug}`);
  },
  packages(slug?: string) {
    revalidateTag(CMS_PACKAGES_TAG, "max");
    revalidatePath("/");
    revalidatePath("/tour-packages");
    revalidatePath("/(site)/tour-packages/[duration]", "page");
    revalidatePath("/(site)/tour-packages/[duration]/[slug]", "page");
    revalidatePath("/sitemap.xml");
    if (slug) revalidatePath(`/tour-packages/${slug}`);
  },
  /** Editable page copy. Package pages share its blocks, so they refresh too. */
  pages() {
    revalidateTag(CMS_PAGES_TAG, { expire: 0 });
    revalidatePath(TEMPLES_PATH);
    revalidatePath("/tour-packages");
    revalidatePath("/(site)/tour-packages/[duration]", "page");
    revalidatePath("/(site)/tour-packages/[duration]/[slug]", "page");
  },
  /** `expire: 0`: a temple moved to Draft or deleted must not be served stale to even one more visitor. */
  temples(slug?: string) {
    revalidateTag(CMS_TEMPLES_TAG, { expire: 0 });
    revalidatePath(TEMPLES_PATH);
    revalidatePath(`/(site)${TEMPLES_PATH}/[slug]`, "page");
    revalidatePath("/sitemap.xml");
    if (slug) revalidatePath(`${TEMPLES_PATH}/${slug}`);
  },
};
