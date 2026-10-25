import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-less anon client for public pages. Safe inside `'use cache'` (no request data),
 * and RLS limits it to published rows. Returns `null` when Supabase is not configured.
 */
export function createPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
