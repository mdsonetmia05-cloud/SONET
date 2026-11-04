# Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Yes, for live data | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Yes, for live data | Supabase anon key (safe in browser) |
| SUPABASE_SERVICE_ROLE_KEY | Server only | Admin/server operations only — never in frontend code |
| AI_PROVIDER | When AI is enabled | gemini \| groq \| mistral |
| GEMINI_API_KEY / GROQ_API_KEY / MISTRAL_API_KEY | Server only | Provider keys, never NEXT_PUBLIC_* |

Never commit `.env.local`. Never put a real key in GitHub, docs or chat.
