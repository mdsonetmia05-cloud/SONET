import { createNeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

// createNeonAuth throws when the cookie secret is missing or shorter
// than 32 characters, so only construct when both variables are set.
// An unconfigured build then renders honest "Not Configured" states
// instead of crashing every page at import time.
export const auth =
  baseUrl && cookieSecret && cookieSecret.length >= 32
    ? createNeonAuth({ baseUrl, cookies: { secret: cookieSecret } })
    : null;

export const isAuthConfigured = Boolean(auth);
