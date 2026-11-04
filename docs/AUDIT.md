# Phase 1 — Repository Audit (2026-11-04)

## Inspected
All 23 files in the previous repo state: README, package.json, configs,
src/app (home, academy, ai-tools, dashboard, admin shells), src/lib,
supabase/migrations 001–002, seed.sql and docs.

## Findings — fixed in this upgrade
1. **Missing routes:** no divisions/*, marketplace, skills, blog, about,
   contact, pricing, faq, /login, /register, /forgot-password,
   /reset-password, dashboard/* or admin/* nested routes. → All required
   routes from the new brief are now present as pages.
2. **Design system incomplete:** Tailwind was a dependency but had no
   tailwind.config.js / postcss.config.js, and globals.css was plain CSS
   in the old #635BFF palette. → New palette added (#FFFFFF, #F5F6F8,
   #17191D, #737780, #315CBA, #E5E7EB, #DCE5F7), Tailwind + PostCSS
   configs added, reusable Card/Button/Badge/Empty components added.
3. **No icon/test/lint setup:** no lucide, no ESLint config, no tests.
   → lucide-react added, .eslintrc.json added, pricing unit tests added
   (`npm test`, node:test). Lucide icons are to be adopted per-component;
   no icon is used decoratively to fake a feature.
4. **No API routes:** no server-side price, payment or AI handling.
   → /api/orders/calculate (server recalculation), /api/payments/verify
   (admin-gated stub, 503 until configured), /api/ai/run (provider
   check, daily rate limit, 503 Not Configured).
5. **Security gap — RLS:** migrations said "enable RLS in production"
   but defined no policies. → Migration 003 enables RLS on user-owned
   tables with owner-read policies. Admin policies still need a
   deployment-specific review (see SECURITY.md) — do not ship without it.
6. **No chat / notification preferences:** → conversations,
   conversation_messages and notification_preferences tables added.
7. **Seed gap:** classes and class-subject mappings were not in seed.sql
   (only boards, programs, levels, subjects). → Documented honestly:
   mappings are admin-configured; the live app previously reported 206
   mappings, but this repo does not invent them as seed rows.
8. **Empty folders:** src/app/(public), src/components, src/modules were
   empty. → (public) removed; components now holds the UI kit.

## Preserved
- Existing divisions, AI tool list, Academy structure, 001/002 schema,
  seed catalogue, manual-payment-only rule, Not Configured honesty rule,
  and the no-full-textbook-copyright rule.

## Still not done / needs credentials (honest)
- Supabase Auth, Google OAuth, Gemini/Groq/Mistral, bKash/Nagad/Card,
  email delivery: Not Configured until credentials + testing.
- Live admin/teacher UI click-through verification (outstanding from
  the Academy expansion) still needs Mark's check in the live app.
- Production build: see docs/TESTING.md for the result in this environment.
