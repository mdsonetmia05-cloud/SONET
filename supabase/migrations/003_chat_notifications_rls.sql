-- Migration 003 — Chat, notification preferences, indexes and RLS.
-- Additive only: does not drop or rewrite existing tables, so existing
-- user data is preserved. Review policies before production use.

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  subject text not null, status text default 'open' check (status in ('open','in_progress','waiting_for_user','resolved','closed')),
  unread_admin int default 0, unread_user int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references profiles(id) on delete set null,
  sender_role text default 'user', body text not null,
  attachment_url text, created_at timestamptz default now()
);
create table if not exists notification_preferences (
  user_id uuid primary key references profiles(id) on delete cascade,
  email_enabled boolean default true, in_app_enabled boolean default true,
  course_announcements boolean default true, payment_updates boolean default true,
  subscription_alerts boolean default true, admin_messages boolean default true
);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_tool_usage_user_day on tool_usage(user_id, used_at);
create index if not exists idx_conversations_user on conversations(user_id);
create index if not exists idx_class_subjects_class on class_subjects(class_id);

-- Row Level Security: enable on user-owned tables and grant owners
-- access to their own rows. Admin policies (service-role / admin role
-- checks) must be added per deployment — see docs/SECURITY.md.
alter table profiles enable row level security;
alter table orders enable row level security;
alter table entitlements enable row level security;
alter table notifications enable row level security;
alter table conversations enable row level security;
drop policy if exists "owners read own profile" on profiles;
create policy "owners read own profile" on profiles for select using (auth.uid() = id);
drop policy if exists "owners read own orders" on orders;
create policy "owners read own orders" on orders for select using (auth.uid() = user_id);
drop policy if exists "owners read own entitlements" on entitlements;
create policy "owners read own entitlements" on entitlements for select using (auth.uid() = user_id);
drop policy if exists "owners read own notifications" on notifications;
create policy "owners read own notifications" on notifications for select using (auth.uid() = user_id);
drop policy if exists "owners read own conversations" on conversations;
create policy "owners read own conversations" on conversations for select using (auth.uid() = user_id);
