# Deployment

1. Create a Neon project (Singapore region). Copy the pooled DATABASE_URL from Connection Details to .env.local.
2. In the Neon SQL Editor run supabase/migrations/001_init.sql, then 002_academy.sql, then 003_chat_notifications_rls.sql, then supabase/seed.sql (boards, programs, levels and subjects). The files are plain Postgres; the `supabase/` folder name is historical.
3. Enable Neon Auth on the project branch (Auth in the Neon console). Copy NEON_AUTH_BASE_URL from Settings → Better Auth, and generate NEON_AUTH_COOKIE_SECRET with `openssl rand -base64 32`.
4. Add the production domain (e.g. https://sonet-ecosystem.vercel.app) to Neon Auth's allowed domains (Auth → Configuration → Domains), or sign-in redirects will fail.
5. Deploy to Vercel: import this repo, set DATABASE_URL, NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET, deploy.
6. Ownership is enforced server-side (requireUser + hasRole); RLS owner policies use app.current_user_id — see docs/SECURITY.md.
