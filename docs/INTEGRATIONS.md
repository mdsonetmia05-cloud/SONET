# Integrations — honest status

- Neon Postgres (database): configured via DATABASE_URL; 53 tables live in project sonet-ecosystem (Singapore, Postgres 18).
- Neon Auth (Managed Better Auth, login): configured via NEON_AUTH_BASE_URL + NEON_AUTH_COOKIE_SECRET. Email + password sign-in/sign-up; users live in the `neon_auth` schema with UUID ids, mirrored into the app's `users`/`profiles` tables on first sign-in. Google OAuth: Not Configured (removed from the Neon Auth branch; needs OAuth credentials to enable).
- Google OAuth: Not Configured
- Gemini / Groq / Mistral: Not Configured, server-side only when added
- bKash / Nagad / Card: Not Configured, manual verification only
- Email provider: Not Configured for app mail — auth emails (password reset, verification) are sent by Neon's shared SMTP for auth only.
- Sweet Upscaler / Sweet BG: Not Configured in the live app
- PromptEx (/ai-tools/promptex): works with the user's own Gemini key only. The key is tested against Google's Gemini API and stored only in the user's browser (localStorage); it is never sent to a SONET server. Groq / OpenRouter / Together / Mistral / HuggingFace: Not Configured. EPS files are listed but not processed by Gemini vision — a JPG/PNG preview is required.
- Weather (/ai-tools/weather): live data from Open-Meteo (free, no API key, no sign-up). Current conditions + 7-day forecast; city search via Open-Meteo geocoding. Dhaka is the default city. All requests run from the visitor's browser; nothing is sent to a SONET server.

## Honest limits
- Neon free tier: 100 CU-hours of compute and 1 GB of storage per project per month; compute scales to zero after ~5 minutes idle (the first request after idle wakes it). No card.
- The `supabase/` folder name is historical: the SQL files in it are plain Postgres, Neon-compatible, and no Supabase code remains in the app.
- No route-protection middleware: the site is mostly public pages, so ownership is enforced server-side (requireUser + hasRole) in API routes, not by a middleware redirect.
- Chat: no realtime provider configured — conversations are stored in the database; live updates are Not Configured.
- Analytics: real database queries only, no fabricated figures.

## This upgrade
- Chat: stored in the database; realtime delivery Not Configured.
- Analytics: real database queries only, no fabricated figures.
