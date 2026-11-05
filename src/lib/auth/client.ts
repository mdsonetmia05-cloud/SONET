"use client";

import { createAuthClient } from "@neon/auth/next";

// Talks to the same-origin proxy at /api/auth/[...path]; takes no
// arguments and needs no env vars on the client.
export const authClient = createAuthClient();
