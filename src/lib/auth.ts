import { auth, isAuthConfigured } from "./auth/server";
import { db, isDatabaseConfigured } from "./db";

export type AuthUser = { id: string; email: string; name?: string | null };

// Server-side authorization helper. Frontend hiding is never security:
// every protected API route must call this (or an equivalent session +
// role check) before returning private data or performing an action.
export async function requireUser(): Promise<{ user: AuthUser | null; error: string | null }> {
  if (!isAuthConfigured || !auth) return { user: null, error: "Neon Auth: Not Configured" };
  try {
    const result = (await auth.getSession()) as unknown;
    const user = extractUser(result);
    if (!user) return { user: null, error: "Not signed in" };
    // Sync the app profile; a sync failure must never break login.
    void getOrCreateProfile(user).catch((err) => console.error("[sonet] profile sync failed", err));
    return { user, error: null };
  } catch (err) {
    return { user: null, error: err instanceof Error ? err.message : "Not signed in" };
  }
}

// getSession may return { data: { user } } (client shape) or { user }
// (server shape) depending on the SDK version; accept both.
function extractUser(result: unknown): AuthUser | null {
  if (!result || typeof result !== "object") return null;
  const rec = result as Record<string, unknown>;
  const candidate = (rec.data as Record<string, unknown> | undefined)?.user ?? rec.user;
  if (!candidate || typeof candidate !== "object") return null;
  const u = candidate as Record<string, unknown>;
  if (typeof u.id !== "string" || typeof u.email !== "string") return null;
  return { id: u.id, email: u.email, name: typeof u.name === "string" ? u.name : null };
}

export async function hasRole(userId: string, role: string): Promise<boolean> {
  // Deny by default when the database is not configured or on any error.
  if (!isDatabaseConfigured || !db) return false;
  try {
    const rows = await db`select 1 from user_roles ur join roles r on r.id = ur.role_id where ur.user_id = ${userId} and r.name = ${role} limit 1`;
    return rows.length > 0;
  } catch {
    return false;
  }
}

// Neon Auth (Managed Better Auth) user ids are UUIDs — see
// docs/INTEGRATIONS.md — so they fit users.id (uuid) directly and no
// separate auth_user_id column is needed.
export async function getOrCreateProfile(user: AuthUser): Promise<void> {
  if (!isDatabaseConfigured || !db) return;
  await db`insert into users (id, email) values (${user.id}, ${user.email}) on conflict (id) do nothing`;
  await db`insert into profiles (id, full_name, email) values (${user.id}, ${user.name ?? user.email}, ${user.email}) on conflict (id) do nothing`;
}
