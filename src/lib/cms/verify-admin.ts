import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Returns the signed-in user's id only when they are the configured admin. */
export async function verifyAdmin(): Promise<string | null> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || user.email.toLowerCase() !== adminEmail) return null;
  return user.id;
}
