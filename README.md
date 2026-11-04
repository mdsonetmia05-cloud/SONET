# SONET Ecosystem

**ONE ACCOUNT. ONE PLATFORM. ENDLESS POSSIBILITIES.**

A unified digital business, AI, SaaS, education and technology platform.

> **Important — honest status:** This repository contains the production
> architecture, database schema, seed catalogue and working Next.js
> foundation for SONET. The live hosted app built earlier in Muse
> (`sonet-ecosystem` artifact) is a separate hosted implementation with
> the same architecture. This repo is **not** a byte-for-byte export of
> that hosted app's internal code, because that code is not downloadable
> from the artifact runtime. Treat this repo as the open, deployable
> Next.js + Supabase codebase to continue SONET from.

## Divisions

- **SONET AI** — Sweet Prompts Pro, Sweet Stock AI, SweetTools, PromptEx,
  AI Microstock Metadata Generator Pro and more
- **SONET ACADEMY** — Bangladesh academic LMS: Pre-primary to Class 12,
  admission, IELTS, BCS and job preparation, aligned to NCTB
- **SONET MICROSTOCK** — stock contributor training and resources
- **SONET STUDIO** — prompt packs, eBooks, templates, digital assets
- **SONET SKILLS** — SkillVerse, AI skills, freelancing, career paths
- **SONET LAB** — experimental SaaS, AI research and prototypes

## Quick start

```bash
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Then apply `supabase/migrations/*.sql` in Supabase SQL Editor and
`supabase/seed.sql` for the initial catalogue.

## Integration status — never simulated

| Integration | Status |
|---|---|
| Supabase Auth / Postgres / Storage | Configure via `.env.local` — see `docs/DEPLOYMENT.md` |
| Google OAuth | Not Configured (enable in Supabase Auth when ready) |
| Gemini / Groq / Mistral AI APIs | Not Configured — provider keys stay server-side only |
| bKash / Nagad / Card payments | Not Configured — manual payment verification only |
| Email delivery | Not Configured — configure a provider in Supabase |

No copyrighted NCTB textbook content is reproduced in full. Use original
explanations, teacher-created materials, licensed resources and links to
official textbooks at https://nctb.gov.bd/ and https://nctb.portal.gov.bd/

## Structure

See `docs/ARCHITECTURE.md`. Key folders: `src/app`, `src/components`,
`src/lib`, `src/modules`, `supabase/migrations`, `docs`.
