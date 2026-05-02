import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseServerClient() {
  if (!url || !anonKey) {
    return null;
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export function getSupabaseAdminClient() {
  if (!url || !serviceRoleKey) {
    return null;
  }
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}
