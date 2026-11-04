# Architecture

- Frontend: Next.js 14 + React 18 + TypeScript + Tailwind (see package.json)
- Backend: Next.js Route Handlers / Server Actions + Supabase
- Database: PostgreSQL via Supabase, migrations in supabase/migrations
- Auth: Supabase Auth (one account for all divisions; roles, subscriptions
  and enrollments are separate concepts — a user can be Student + Customer
  + Premium Subscriber at once)
- Storage: Supabase Storage, private buckets for paid downloads
- Payments: manual verification first. Never trust client prices; verify
  server-side. bKash, Nagad and card gateways are Not Configured.
- AI tools: server-side provider calls only. Free/premium daily limits,
  usage logging, rate limiting, error states. Keys never in frontend code.
- Academy: see docs/ACADEMY.md and supabase/migrations/002_academy.sql
