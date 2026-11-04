import { supabase, isSupabaseConfigured } from "./supabase";

// Server-side authorization helper. Frontend hiding is never security:
// every protected API route must call this (or an equivalent session +
// role check) before returning private data or performing an action.
export async function requireUser() {
  if (!isSupabaseConfigured || !supabase) return { user: null, error: "Supabase: Not Configured" };
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { user: null, error: "Not signed in" };
  return { user: data.user, error: null };
}
export async function hasRole(_userId: string, _role: string): Promise<boolean> {
  // Implemented against user_roles + roles tables once Supabase is
  // configured. Returns false (deny by default) when not configured.
  return false;
}
