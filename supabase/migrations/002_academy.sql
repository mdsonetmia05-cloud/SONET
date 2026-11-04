-- SONET Academy — Bangladesh academic LMS tables.
-- Curriculum versions are immutable history: never UPDATE a published
-- version in place to change a year; create a new version instead, so
-- old results, lessons and progress are preserved.

create table if not exists education_levels (id uuid primary key default gen_random_uuid(), name text unique not null, name_bn text, display_order int default 0);
create table if not exists academic_years (id uuid primary key default gen_random_uuid(), year_label text unique not null, is_current boolean default false);
create table if not exists education_boards (id uuid primary key default gen_random_uuid(), name text unique not null, name_bn text, board_type text default 'general');
create table if not exists education_programs (id uuid primary key default gen_random_uuid(), name text unique not null, name_bn text);
create table if not exists classes (id uuid primary key default gen_random_uuid(), level_id uuid references education_levels(id) on delete cascade, name text not null, name_bn text, display_order int default 0, unique (level_id, name));
create table if not exists academic_groups (id uuid primary key default gen_random_uuid(), name text unique not null, name_bn text);
create table if not exists subjects (id uuid primary key default gen_random_uuid(), name text not null, name_bn text, unique (name));
create table if not exists class_subjects (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete cascade,
  group_id uuid references academic_groups(id) on delete set null,
  board_id uuid references education_boards(id) on delete set null,
  medium text default 'bangla' check (medium in ('bangla','english')),
  is_compulsory boolean default true,
  unique (class_id, subject_id, group_id, board_id, medium)
);
create table if not exists curricula (
  id uuid primary key default gen_random_uuid(), name text not null,
  academic_year_id uuid references academic_years(id) on delete cascade,
  level_id uuid references education_levels(id) on delete cascade,
  board_id uuid references education_boards(id) on delete set null,
  class_id uuid references classes(id) on delete cascade,
  medium text default 'bangla', group_id uuid references academic_groups(id) on delete set null,
  syllabus_version text not null, effective_date date, status text default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz default now(), unique (academic_year_id, board_id, class_id, medium, group_id, syllabus_version)
);
create table if not exists curriculum_subjects (curriculum_id uuid references curricula(id) on delete cascade, subject_id uuid references subjects(id) on delete cascade, primary key (curriculum_id, subject_id));
create table if not exists chapters (id uuid primary key default gen_random_uuid(), subject_id uuid references subjects(id) on delete cascade, class_id uuid references classes(id) on delete cascade, title text not null, title_bn text, display_order int default 0));
create table if not exists topics (id uuid primary key default gen_random_uuid(), chapter_id uuid references chapters(id) on delete cascade, title text not null, title_bn text, display_order int default 0));
create table if not exists academic_lessons (id uuid primary key default gen_random_uuid(), topic_id uuid references topics(id) on delete cascade, title text not null, title_bn text, content_type text default 'notes', content text, created_at timestamptz default now());
create table if not exists teachers (id uuid primary key default gen_random_uuid(), profile_id uuid references profiles(id) on delete cascade unique, bio text));
create table if not exists teacher_assignments (id uuid primary key default gen_random_uuid(), teacher_id uuid references teachers(id) on delete cascade, class_id uuid references classes(id) on delete cascade, subject_id uuid references subjects(id) on delete cascade, unique (teacher_id, class_id, subject_id));
create table if not exists student_academic_profiles (id uuid primary key default gen_random_uuid(), profile_id uuid references profiles(id) on delete cascade unique, level_id uuid references education_levels(id) on delete set null, class_id uuid references classes(id) on delete set null, board_id uuid references education_boards(id) on delete set null, program_id uuid references education_programs(id) on delete set null, medium text default 'bangla', group_id uuid references academic_groups(id) on delete set null, academic_year_id uuid references academic_years(id) on delete set null));
create table if not exists student_enrollments (id uuid primary key default gen_random_uuid(), profile_id uuid references profiles(id) on delete cascade, subject_id uuid references subjects(id) on delete cascade, class_id uuid references classes(id) on delete cascade, progress_percent int default 0, unique (profile_id, subject_id, class_id)));
create table if not exists question_banks (id uuid primary key default gen_random_uuid(), subject_id uuid references subjects(id) on delete cascade, chapter_id uuid references chapters(id) on delete set null, question_type text default 'mcq' check (question_type in ('mcq','cq','short','model')), question_text text not null, options jsonb, correct_answer text, marks int default 1));
create table if not exists examinations (id uuid primary key default gen_random_uuid(), title text not null, exam_type text check (exam_type in ('class_test','weekly','monthly','half_yearly','annual','selection','test_exam','ssc_prep','hsc_prep','model_test','admission')), class_id uuid references classes(id) on delete cascade, subject_id uuid references subjects(id) on delete cascade, academic_year_id uuid references academic_years(id) on delete set null, duration_minutes int default 60, total_marks int default 100, status text default 'draft', created_at timestamptz default now());
create table if not exists exam_attempts (id uuid primary key default gen_random_uuid(), exam_id uuid references examinations(id) on delete cascade, profile_id uuid references profiles(id) on delete cascade, score numeric(8,2), is_published boolean default false, started_at timestamptz default now(), submitted_at timestamptz));
create table if not exists academic_assignments (id uuid primary key default gen_random_uuid(), class_id uuid references classes(id) on delete cascade, subject_id uuid references subjects(id) on delete cascade, title text not null, due_date date, created_at timestamptz default now());
create table if not exists academic_announcements (id uuid primary key default gen_random_uuid(), title text not null, body text, class_id uuid references classes(id) on delete set null, created_at timestamptz default now());
