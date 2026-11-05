# Changelog — UI Redesign & Full-Route Upgrade (2026-11-04)

## Added
- New design system: #FFFFFF / #F5F6F8 / #17191D / #737780 / #315CBA /
  #E5E7EB / #DCE5F7, Inter + Hind Siliguri, Tailwind + PostCSS configs,
  reusable UI kit (Page, Grid, Card, Empty, NotConfigured).
- All required routes (59 static pages in the production build):
  public, divisions/*, marketplace, skills, blog, contact, pricing, faq,
  login/register/forgot/reset, dashboard/*, admin/*, plus sitemap + robots.
- API routes: /api/ai/run (503 Not Configured + daily rate limit),
  /api/orders/calculate (server price recalculation),
  /api/payments/verify (admin-gated stub, 503 until configured).
- Server helpers: src/lib/auth.ts (requireUser, deny-by-default roles),
  src/lib/pricing.ts, src/lib/catalogue.ts.
- Migration 003: conversations, conversation_messages,
  notification_preferences, indexes, RLS owner policies.
- Docs: AUDIT.md, TESTING.md, ENV.md, CHANGELOG.md.
- Tests: pricing tests (2 passing).

## Verified in this environment (2026-11-04)
- `npm test` — 2 passed, 0 failed.
- `npx tsc --noEmit` — passed, no errors.
- `npm run lint` — no ESLint warnings or errors.
- `npm run build` — passed, 59 pages generated.

## Known limitations (honest)
- Supabase, Google OAuth, Gemini/Groq/Mistral, bKash/Nagad/Card and
  email are Not Configured until credentials are added and tested.
- Dashboard/admin pages show real empty states until the database is
  connected; they are not yet full CRUD interfaces backed by live data.
- npm warns Next 14.2.5 has a known security vulnerability (2025-12-11
  advisory). Upgrade Next to a patched 14.x before production.
- Live Academy admin/teacher UI click-through verification is still
  outstanding (from the earlier Academy expansion).

## Polish — all sections (2026-11-05)
- Design system refined: section rhythm, card hover, focus-visible states,
  responsive clamp typography, CTA band and details/accordion styling.
- Homepage rewritten with consistent eyebrow/lead sections and a
  three-step “how it works” section; testimonials kept honest (no invented quotes).
- Division pages now list their real programmes and features instead of a
  generic paragraph. Marketplace and AI Tools gained real client-side
  search/filter over the catalogue. Pricing shows plan cards with a
  Not Configured note instead of invented prices. FAQ uses an accordion.
- Academy page now explains the Year → Level → Class → Subject → Chapter
  → Topic → Lesson flow. Dashboard and Admin overviews now link to every
  sub-section with honest empty states.
- Founder (/about) page preserved unchanged in content — only the shared
  design system around it was polished.

## Next 16.4.5 upgrade + Neon (2026-11-05)
- Upgraded Next.js 14.2.5 → 16.4.5 and React 18.3.1 → 19.3.1. ESLint 8 → 9 with flat config (eslint.config.mjs); `next lint` script replaced with `eslint .`; .eslintrc.json removed.
- Replaced Supabase with Neon Postgres + Managed Better Auth (Neon Auth): src/lib/db.ts (Neon serverless client), src/lib/auth/server.ts + client.ts (createNeonAuth / createAuthClient), /api/auth/[...path] proxy route, auth pages rebuilt on the Neon Auth client, requireUser via getSession, hasRole via a real user_roles query, profile sync into users/profiles on first sign-in. @supabase/supabase-js removed; no Stack Auth code.
- Neon Auth user ids are UUIDs (verified against Neon's docs), so they fit users.id (uuid) directly; no migration 004 was needed.
- Auth UI is custom SONET components (no @neondatabase/auth-ui / better-auth-ui): those ship Tailwind v4/shadcn scaffolding the app does not use; the app stays on Tailwind 3.4.0.
- No route-protection middleware: the site is mostly public; enforcement stays in requireUser()/hasRole().
- Verified in this environment (2026-11-05): npm test 2 passed; npx tsc --noEmit clean; npm run lint 0 errors (8 pre-existing unused-variable warnings); npm run build passed, 59 routes.
- Not yet verified live: sign-up/sign-in against the real Neon Auth service, and the DATABASE_URL/NEON_AUTH_* values in Vercel — pending redeploy and live check.
