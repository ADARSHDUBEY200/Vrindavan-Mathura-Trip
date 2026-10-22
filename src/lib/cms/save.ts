import { adminApi } from "@/lib/admin-api";
import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKETS, TABLES, type EditorType } from "./config";

const API: Record<EditorType, (typeof adminApi)["blogs"]> = {
  Blog: adminApi.blogs,
  Package: adminApi.packages,
  Temple: adminApi.temples,
};

/** Returns an error message when another row already uses this slug. */
export async function checkSlugAvailable(editorType: EditorType, slug: string, excludeId?: string): Promise<string | null> {
  try {
    let query = createClient().from(TABLES[editorType]).select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.limit(1);
    if (error) return `Could not check slug: ${error.message}`;
    return data && data.length ? `The slug "${slug}" is already used. Choose another one.` : null;
  } catch (err) {
    return err instanceof Error ? err.message : "Could not check slug";
  }
}

/** Slug check, then insert (create) or update (edit) through the admin API. */
export async function saveRecord(
  editorType: EditorType,
  row: Record<string, unknown> & { slug: string },
  id?: string,
): Promise<string | null> {
  const slugError = await checkSlugAvailable(editorType, row.slug, id);
  if (slugError) return slugError;
  const api = API[editorType];
  const { error } = id ? await api.update(id, row) : await api.insert(row);
  return error ?? null;
}

/** Uploads an image to the editor type's bucket and returns its public URL. */
export async function uploadImage(editorType: EditorType, file: File): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient();
    const bucket = STORAGE_BUCKETS[editorType];
    const name = file.name.replace(/[^\w.-]+/g, "-");
    const path = `${Date.now()}-${name}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
    if (error) return { error: error.message };
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function fetchRow(editorType: EditorType, id: string) {
  const { data, error } = await createClient().from(TABLES[editorType]).select("*").eq("id", id).maybeSingle();
  return { data: data as Record<string, unknown> | null, error: error?.message };
}
