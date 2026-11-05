-- SONET Ecosystem — PostgreSQL / Neon schema (v1)
-- UUID keys, foreign keys, timestamps, updated_at handling.
-- Enable RLS in production and add policies per table (see docs/SECURITY.md).
-- Secrets (AI provider keys, payment credentials) are NEVER stored in
-- client-readable tables. Keep them in env only.

create extension if not exists "pgcrypto";

create or replace function sonet_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Identity & RBAC. Neon has no auth.users table, so SONET owns its
-- users table; the auth provider creates the row here and profiles
-- mirrors it. Passwords are never stored in application tables.
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique, password_hash text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists profiles (
  id uuid primary key references users(id) on delete cascade,
  full_name text not null, email text not null unique,
  phone text, country text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists roles (id uuid primary key default gen_random_uuid(), name text unique not null, description text);
create table if not exists permissions (id uuid primary key default gen_random_uuid(), key text unique not null, description text);
create table if not exists user_roles (user_id uuid references profiles(id) on delete cascade, role_id uuid references roles(id) on delete cascade, primary key (user_id, role_id));
create table if not exists role_permissions (role_id uuid references roles(id) on delete cascade, permission_id uuid references permissions(id) on delete cascade, primary key (role_id, permission_id));

-- Ecosystem
create table if not exists divisions (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, description text, display_order int default 0, is_visible boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists categories (id uuid primary key default gen_random_uuid(), division_id uuid references divisions(id) on delete set null, name text not null, slug text unique not null);
create table if not exists products (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  description text, short_description text, division_id uuid references divisions(id) on delete set null,
  category_id uuid references categories(id) on delete set null,
  product_type text check (product_type in ('ai_tool','saas','software','digital_download','online_course','ebook','template','subscription','service')),
  product_url text, regular_price numeric(12,2) default 0, sale_price numeric(12,2),
  access_type text default 'free', api_requirement text,
  status text default 'draft' check (status in ('draft','published','featured','maintenance','archived')),
  is_featured boolean default false, seo_title text, seo_description text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists ai_tools (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  description text, division_id uuid references divisions(id) on delete set null,
  access_level text default 'free', api_provider text, api_config_reference text,
  daily_free_limit int default 10, daily_premium_limit int default 100,
  status text default 'coming_soon' check (status in ('active','coming_soon','maintenance','disabled')),
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists tool_usage (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, tool_id uuid references ai_tools(id) on delete cascade, used_at date default current_date, count int default 0, unique (user_id, tool_id, used_at));

-- LMS (general courses, separate from the Bangladesh academic structure)
create table if not exists courses (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, description text, instructor_id uuid references profiles(id) on delete set null, division_id uuid references divisions(id) on delete set null, price numeric(12,2) default 0, access_type text default 'free', status text default 'draft', created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists lessons (id uuid primary key default gen_random_uuid(), course_id uuid references courses(id) on delete cascade, title text not null, lesson_type text default 'text', content_url text, display_order int default 0, created_at timestamptz default now());
create table if not exists enrollments (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, course_id uuid references courses(id) on delete cascade, progress_percent int default 0, completed_at timestamptz, unique (user_id, course_id));
create table if not exists certificates (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, course_id uuid references courses(id) on delete cascade, certificate_code text unique not null, issued_at timestamptz default now());

-- Commerce (order status and payment status are separate; prices are
-- never trusted from the client — verify server-side)
create table if not exists orders (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, order_code text unique not null, total numeric(12,2) not null default 0, status text default 'pending' check (status in ('pending','awaiting_payment','paid','processing','completed','cancelled','refunded')), created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists order_items (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id) on delete cascade, product_id uuid references products(id) on delete set null, price numeric(12,2) not null, quantity int default 1);
create table if not exists payments (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id) on delete cascade, method text default 'manual', status text default 'pending' check (status in ('pending','verified','failed','refunded')), transaction_reference text, verified_by uuid references profiles(id) on delete set null, created_at timestamptz default now());
create table if not exists subscription_plans (id uuid primary key default gen_random_uuid(), name text unique not null, billing_period text default 'monthly', price numeric(12,2) default 0);
create table if not exists subscriptions (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, plan_id uuid references subscription_plans(id) on delete set null, status text default 'active', expires_at timestamptz, created_at timestamptz default now());
create table if not exists coupons (id uuid primary key default gen_random_uuid(), code text unique not null, discount_percent int default 0, is_active boolean default true);
create table if not exists entitlements (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, product_id uuid references products(id) on delete cascade, granted_at timestamptz default now(), unique (user_id, product_id));

-- Communication & CMS
create table if not exists notifications (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, title text not null, body text, type text default 'system', is_read boolean default false, created_at timestamptz default now());
create table if not exists support_tickets (id uuid primary key default gen_random_uuid(), user_id uuid references profiles(id) on delete cascade, category text, subject text not null, status text default 'open' check (status in ('open','in_progress','waiting_for_user','resolved','closed')), created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists blog_posts (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text, body text, status text default 'draft', created_at timestamptz default now());
create table if not exists faqs (id uuid primary key default gen_random_uuid(), question text not null, answer text not null, display_order int default 0);
create table if not exists system_settings (key text primary key, value jsonb, updated_at timestamptz default now());
create table if not exists audit_logs (id uuid primary key default gen_random_uuid(), actor_id uuid references profiles(id) on delete set null, action text not null, entity_type text, entity_id uuid, details jsonb, created_at timestamptz default now());

-- Bangladesh academic structure (see 002_academy.sql)
