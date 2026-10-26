create extension if not exists pgcrypto;

create type public.user_role as enum ('student', 'teacher', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role public.user_role not null default 'student',
  university text,
  faculty text,
  program text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_check check (char_length(trim(email)) > 0),
  constraint profiles_name_check check (char_length(trim(full_name)) > 0)
);

create table public.teacher_students (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  unique (teacher_id, student_id),
  constraint teacher_students_no_self_assignment check (teacher_id <> student_id)
);

create table public.diagnostic_tests (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  subject text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  time_limit_minutes integer not null default 30 check (time_limit_minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.test_questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.diagnostic_tests(id) on delete cascade,
  prompt text not null,
  question_type text not null default 'multiple_choice' check (question_type in ('multiple_choice')),
  topic text not null,
  points integer not null default 1 check (points > 0),
  options jsonb not null,
  correct_option text not null,
  explanation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint test_questions_options_check check (jsonb_typeof(options) = 'array')
);

create table public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  test_id uuid not null references public.diagnostic_tests(id) on delete cascade,
  attempt_number integer not null default 1 check (attempt_number > 0),
  status text not null default 'in_progress' check (status in ('in_progress', 'submitted', 'reviewed')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score numeric(5,2) default 0,
  max_score numeric(5,2) default 0,
  percentage numeric(5,2) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, test_id, attempt_number)
);

create table public.test_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.test_attempts(id) on delete cascade,
  question_id uuid not null references public.test_questions(id) on delete cascade,
  selected_option text,
  is_correct boolean not null default false,
  points_earned numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

create table public.learning_plans (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null,
  diagnostic_test_id uuid references public.diagnostic_tests(id) on delete set null,
  title text not null,
  summary text,
  overall_goal text,
  status text not null default 'draft' check (status in ('draft', 'active', 'reviewed', 'approved')),
  teacher_notes text,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.plan_tasks (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.learning_plans(id) on delete cascade,
  title text not null,
  description text,
  recommended_resource text,
  due_date date,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'approved')),
  completion_notes text,
  teacher_feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  url text,
  file_path text,
  file_name text,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references public.profiles(id) on delete set null,
  feedback text,
  grade numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_entry_identity check (coalesce(url, file_path) is not null)
);

create table public.growth_snapshots (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  snapshot_date date not null,
  score_percentage numeric(5,2) not null default 0,
  completion_rate numeric(5,2) not null default 0,
  learning_index numeric(5,2),
  notes text,
  source text not null default 'diagnostic',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, snapshot_date)
);

create index idx_profiles_role on public.profiles(role);
create index idx_teacher_students_teacher on public.teacher_students(teacher_id);
create index idx_teacher_students_student on public.teacher_students(student_id);
create index idx_diagnostic_tests_created_by on public.diagnostic_tests(created_by);
create index idx_diagnostic_tests_status on public.diagnostic_tests(status);
create index idx_test_questions_test_id on public.test_questions(test_id);
create index idx_test_attempts_user on public.test_attempts(user_id);
create index idx_test_attempts_test on public.test_attempts(test_id);
create index idx_test_answers_attempt on public.test_answers(attempt_id);
create index idx_learning_plans_student on public.learning_plans(student_id);
create index idx_learning_plans_teacher on public.learning_plans(teacher_id);
create index idx_plan_tasks_plan on public.plan_tasks(plan_id);
create index idx_portfolio_items_student on public.portfolio_items(student_id);
create index idx_growth_snapshots_student on public.growth_snapshots(student_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger trg_tests_updated_at
before update on public.diagnostic_tests
for each row execute function public.set_updated_at();

create trigger trg_questions_updated_at
before update on public.test_questions
for each row execute function public.set_updated_at();

create trigger trg_attempts_updated_at
before update on public.test_attempts
for each row execute function public.set_updated_at();

create trigger trg_learning_plans_updated_at
before update on public.learning_plans
for each row execute function public.set_updated_at();

create trigger trg_plan_tasks_updated_at
before update on public.plan_tasks
for each row execute function public.set_updated_at();

create trigger trg_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

create trigger trg_growth_snapshots_updated_at
before update on public.growth_snapshots
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.is_teacher_for_student(student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.teacher_students ts
    where ts.student_id = student_id and ts.teacher_id = auth.uid()
  );
$$;

create or replace function public.get_published_test_questions(test_id uuid)
returns table (
  id uuid,
  test_id uuid,
  prompt text,
  question_type text,
  topic text,
  points integer,
  options jsonb,
  explanation text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select q.id, q.test_id, q.prompt, q.question_type, q.topic, q.points, q.options, q.explanation, q.created_at, q.updated_at
  from public.test_questions q
  join public.diagnostic_tests dt on dt.id = q.test_id
  where q.test_id = $1 and dt.status = 'published';
$$;

alter table public.profiles enable row level security;
alter table public.teacher_students enable row level security;
alter table public.diagnostic_tests enable row level security;
alter table public.test_questions enable row level security;
alter table public.test_attempts enable row level security;
alter table public.test_answers enable row level security;
alter table public.learning_plans enable row level security;
alter table public.plan_tasks enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.growth_snapshots enable row level security;

create policy "profiles_select_own_or_admin" on public.profiles
for select using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_own_profile" on public.profiles
for insert with check (auth.uid() = id and new.role = 'student');

create policy "profiles_update_own_non_privileged_fields" on public.profiles
for update
using (auth.uid() = id)
with check (
  auth.uid() = id and new.role = old.role
);

create policy "profiles_admin_manage_roles" on public.profiles
for update using (public.is_admin())
with check (public.is_admin());

create policy "teacher_students_visible_to_members" on public.teacher_students
for select using (
  teacher_id = auth.uid() or student_id = auth.uid() or public.is_admin()
);

create policy "teacher_students_manage_by_admin" on public.teacher_students
for all using (public.is_admin()) with check (public.is_admin());

create policy "diagnostic_tests_select_public_or_creator" on public.diagnostic_tests
for select using (
  status = 'published' or created_by = auth.uid() or public.is_admin()
);

create policy "diagnostic_tests_manage_by_teacher_admin" on public.diagnostic_tests
for insert with check (
  (auth.uid() = created_by and exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher', 'admin')
  )) or public.is_admin()
);

create policy "diagnostic_tests_update_by_teacher_admin" on public.diagnostic_tests
for update using (
  created_by = auth.uid() or public.is_admin()
)
with check (
  (created_by = auth.uid() and exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher', 'admin')
  )) or public.is_admin()
);

create policy "test_questions_teacher_admin_access" on public.test_questions
for select using (
  exists (
    select 1 from public.diagnostic_tests dt
    where dt.id = test_id and (dt.created_by = auth.uid() or public.is_admin())
  )
);

create policy "test_questions_manage_by_teacher_admin" on public.test_questions
for insert with check (
  exists (
    select 1 from public.diagnostic_tests dt
    where dt.id = test_id and (dt.created_by = auth.uid() or public.is_admin())
  )
);

create policy "test_questions_update_by_teacher_admin" on public.test_questions
for update using (
  exists (
    select 1 from public.diagnostic_tests dt
    where dt.id = test_id and (dt.created_by = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1 from public.diagnostic_tests dt
    where dt.id = test_id and (dt.created_by = auth.uid() or public.is_admin())
  )
);

create policy "test_attempts_select_own_or_teacher_admin" on public.test_attempts
for select using (
  user_id = auth.uid()
  or public.is_admin()
  or exists (
    select 1
    from public.teacher_students ts
    where ts.student_id = user_id and ts.teacher_id = auth.uid()
  )
);

create policy "test_attempts_insert_own" on public.test_attempts
for insert with check (
  user_id = auth.uid()
  and status in ('in_progress', 'submitted', 'reviewed')
);

create policy "test_answers_select_own_or_teacher_admin" on public.test_answers
for select using (
  exists (
    select 1 from public.test_attempts ta where ta.id = attempt_id and ta.user_id = auth.uid()
  )
  or public.is_admin()
  or exists (
    select 1
    from public.test_attempts ta
    join public.teacher_students ts on ts.student_id = ta.user_id
    where ta.id = attempt_id and ts.teacher_id = auth.uid()
  )
);

create policy "test_answers_insert_own_attempt" on public.test_answers
for insert with check (
  exists (
    select 1 from public.test_attempts ta where ta.id = attempt_id and ta.user_id = auth.uid()
  )
);

create policy "learning_plans_select_own_or_teacher_admin" on public.learning_plans
for select using (
  student_id = auth.uid() or public.is_admin() or exists (
    select 1 from public.teacher_students ts where ts.student_id = student_id and ts.teacher_id = auth.uid()
  )
);

create policy "learning_plans_manage_by_teacher_admin" on public.learning_plans
for insert with check (
  teacher_id = auth.uid() or public.is_admin()
);

create policy "learning_plans_update_by_student_or_teacher_admin" on public.learning_plans
for update using (
  student_id = auth.uid() or teacher_id = auth.uid() or public.is_admin()
)
with check (
  (student_id = auth.uid() and new.status = old.status and new.teacher_notes = old.teacher_notes)
  or teacher_id = auth.uid()
  or public.is_admin()
);

create policy "plan_tasks_select_own_or_teacher_admin" on public.plan_tasks
for select using (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and (
      lp.student_id = auth.uid() or lp.teacher_id = auth.uid() or public.is_admin()
    )
  )
);

create policy "plan_tasks_manage_by_teacher_admin" on public.plan_tasks
for insert with check (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and (lp.teacher_id = auth.uid() or public.is_admin())
  )
);

create policy "plan_tasks_update_by_student_permitted_fields" on public.plan_tasks
for update using (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and lp.student_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and lp.student_id = auth.uid()
  )
  and new.teacher_feedback is not distinct from old.teacher_feedback
  and new.title is not distinct from old.title
  and new.description is not distinct from old.description
  and new.recommended_resource is not distinct from old.recommended_resource
  and new.due_date is not distinct from old.due_date
);

create policy "plan_tasks_update_by_teacher_admin" on public.plan_tasks
for update using (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and (lp.teacher_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1 from public.learning_plans lp where lp.id = plan_id and (lp.teacher_id = auth.uid() or public.is_admin())
  )
);

create policy "portfolio_items_select_own_or_teacher_admin" on public.portfolio_items
for select using (
  student_id = auth.uid() or public.is_admin() or exists (
    select 1 from public.teacher_students ts where ts.student_id = student_id and ts.teacher_id = auth.uid()
  )
);

create policy "portfolio_items_insert_own" on public.portfolio_items
for insert with check (student_id = auth.uid());

create policy "portfolio_items_student_update_own_fields" on public.portfolio_items
for update using (student_id = auth.uid())
with check (
  student_id = auth.uid()
  and new.feedback is not distinct from old.feedback
  and new.grade is not distinct from old.grade
  and new.reviewed_by is not distinct from old.reviewed_by
);

create policy "portfolio_items_teacher_update_feedback_grade" on public.portfolio_items
for update using (
  public.is_admin() or exists (
    select 1 from public.teacher_students ts where ts.student_id = student_id and ts.teacher_id = auth.uid()
  )
)
with check (
  new.student_id = old.student_id
  and new.title is not distinct from old.title
  and new.description is not distinct from old.description
  and new.url is not distinct from old.url
  and new.file_path is not distinct from old.file_path
);

create policy "growth_snapshots_select_own_or_teacher_admin" on public.growth_snapshots
for select using (
  student_id = auth.uid() or public.is_admin() or exists (
    select 1 from public.teacher_students ts where ts.student_id = student_id and ts.teacher_id = auth.uid()
  )
);

create policy "growth_snapshots_insert_own" on public.growth_snapshots
for insert with check (student_id = auth.uid() or public.is_admin());

create policy "growth_snapshots_update_own_or_admin" on public.growth_snapshots
for update using (student_id = auth.uid() or public.is_admin())
with check (student_id = auth.uid() or public.is_admin());

create policy "growth_snapshots_delete_admin_only" on public.growth_snapshots
for delete using (public.is_admin());

create policy "teacher_students_delete_admin_only" on public.teacher_students
for delete using (public.is_admin());

create policy "diagnostic_tests_delete_admin_only" on public.diagnostic_tests
for delete using (public.is_admin());

create policy "test_questions_delete_admin_only" on public.test_questions
for delete using (public.is_admin());

create policy "learning_plans_delete_admin_only" on public.learning_plans
for delete using (public.is_admin());

create policy "plan_tasks_delete_admin_only" on public.plan_tasks
for delete using (public.is_admin());

create policy "portfolio_items_delete_admin_only" on public.portfolio_items
for delete using (public.is_admin());

create policy "profiles_delete_admin_only" on public.profiles
for delete using (public.is_admin());
