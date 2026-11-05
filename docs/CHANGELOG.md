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
