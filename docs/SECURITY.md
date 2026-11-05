# Security

- Never expose server-only keys (DATABASE_URL, NEON_AUTH_COOKIE_SECRET) in frontend code.
- Never trust client-submitted prices; verify payments server-side.
- Enforce RBAC server-side, not by hiding buttons.
- Ordinary users cannot change their own admin roles.
- Validate ownership before returning private data (orders, downloads,
  student records, exam results).
- Paid downloads via signed/private storage URLs only.
- Audit log for admin login, role changes, product changes, payment
  verification and user status changes.
- Use HTTPS in production.
- Neon Auth (Managed Better Auth) is the only auth system. Users live in
  the `neon_auth` schema with UUID ids; the app mirrors them into
  `users`/`profiles` on first sign-in. Never call betterAuth() in the app
  or add a second auth library.
- RLS owner policies compare against app.current_user_id, set per request
  by the server. The Neon serverless HTTP driver opens a fresh connection
  per query, so the setting only applies inside an explicit transaction —
  app-level checks (requireUser + hasRole) are the primary enforcement.
- No route-protection middleware: the site is mostly public. Protected
  API routes must call requireUser() before returning private data.
