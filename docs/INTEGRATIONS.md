# Integrations — honest status

- Supabase Auth/Postgres/Storage: configure, see DEPLOYMENT.md
- Google OAuth: Not Configured
- Gemini / Groq / Mistral: Not Configured, server-side only when added
- bKash / Nagad / Card: Not Configured, manual verification only
- Email provider: Not Configured, configure in Supabase
- Sweet Upscaler / Sweet BG: Not Configured in the live app
- PromptEx (/ai-tools/promptex): works with the user's own Gemini key only. The key is tested against Google's Gemini API and stored only in the user's browser (localStorage); it is never sent to a SONET server. Groq / OpenRouter / Together / Mistral / HuggingFace: Not Configured. EPS files are listed but not processed by Gemini vision — a JPG/PNG preview is required.

## This upgrade
- Chat: Supabase Realtime when configured, otherwise secure fallback — Not Configured by default.
- Analytics: real database queries only, no fabricated figures.
