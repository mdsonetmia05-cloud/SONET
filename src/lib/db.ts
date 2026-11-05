import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

// neon() throws without a connection string, so only construct when set.
export const db = url ? neon(url) : null;

export const isDatabaseConfigured = Boolean(db);

/**
 * Sets app.current_user_id for the current session so the RLS owner
 * policies in migration 003 can match the signed-in user.
 *
 * NOTE: the Neon serverless HTTP driver opens a fresh connection per
 * query, so this only takes effect inside an explicit transaction.
 * App code must enforce ownership (requireUser + hasRole) as the
 * primary check; RLS is a second layer.
 */
export async function setCurrentUserId(userId: string): Promise<void> {
  if (!db) return;
  await db`select set_config('app.current_user_id', ${userId}, false)`;
}
