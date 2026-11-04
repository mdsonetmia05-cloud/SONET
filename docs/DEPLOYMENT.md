# Deployment

1. Create a Supabase project. Copy URL + anon key to .env.local.
2. Run supabase/migrations/001_init.sql then 002_academy.sql in SQL Editor.
3. Run supabase/seed.sql for boards, programs, levels and subjects.
4. Enable Email auth in Supabase Auth; enable Google OAuth only when ready.
5. Deploy to Vercel: import this repo, set the same env vars, deploy.
6. Set RLS policies before going live — see docs/SECURITY.md.
