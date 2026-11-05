# Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| DATABASE_URL | Yes, for live data | Neon Postgres pooled connection string (from the Neon dashboard) |
| NEON_AUTH_BASE_URL | Yes, for login | Managed Better Auth (Neon Auth) branch Auth URL |
| NEON_AUTH_COOKIE_SECRET | Yes, for login | Session cookie secret, 32+ chars (`openssl rand -base64 32`); never share or commit |
| AI_PROVIDER | When AI is enabled | gemini \| groq \| mistral |
| GEMINI_API_KEY / GROQ_API_KEY / MISTRAL_API_KEY | Server only | Provider keys, never NEXT_PUBLIC_* |

Never commit `.env.local`. Never put a real key in GitHub, docs or chat.
