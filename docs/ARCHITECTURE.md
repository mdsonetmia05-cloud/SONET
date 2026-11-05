# Architecture

- Frontend: Next.js 16 + React 19 + TypeScript + Tailwind (see package.json)
- Backend: Next.js Route Handlers / Server Actions + Neon Postgres
- Database: PostgreSQL via Neon (serverless), migrations in supabase/migrations (plain Postgres; folder name is historical)
- Auth: Neon Auth (Managed Better Auth) — one account for all divisions; roles, subscriptions
  and enrollments are separate concepts — a user can be Student + Customer
  + Premium Subscriber at once
- Storage: Not Configured — paid downloads need a storage provider; private signed URLs when added
- Payments: manual verification first. Never trust client prices; verify
  server-side. bKash, Nagad and card gateways are Not Configured.
- AI tools: server-side provider calls only. Free/premium daily limits,
  usage logging, rate limiting, error states. Keys never in frontend code.
- Academy: see docs/ACADEMY.md and supabase/migrations/002_academy.sql
