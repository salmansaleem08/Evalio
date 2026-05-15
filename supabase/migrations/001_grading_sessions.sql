-- Grading sessions owned by authenticated teachers
create table if not exists public.grading_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled session',
  status text not null default 'draft'
    check (status in ('draft', 'processing', 'completed', 'failed')),
  marking_key_text text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.session_papers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.grading_sessions (id) on delete cascade,
  label text not null,
  file_name text,
  extracted_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.grading_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.grading_sessions (id) on delete cascade,
  paper_id uuid not null references public.session_papers (id) on delete cascade,
  total_score numeric,
  max_score numeric,
  percentage numeric,
  question_breakdown jsonb not null default '[]'::jsonb,
  feedback_summary text,
  created_at timestamptz not null default now(),
  unique (paper_id)
);

create index if not exists idx_grading_sessions_user on public.grading_sessions (user_id);
create index if not exists idx_grading_sessions_created on public.grading_sessions (created_at desc);
create index if not exists idx_session_papers_session on public.session_papers (session_id);
create index if not exists idx_grading_results_session on public.grading_results (session_id);

alter table public.grading_sessions enable row level security;
alter table public.session_papers enable row level security;
alter table public.grading_results enable row level security;

create policy "Users manage own sessions"
  on public.grading_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage papers in own sessions"
  on public.session_papers for all
  using (
    exists (
      select 1 from public.grading_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.grading_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create policy "Users manage results in own sessions"
  on public.grading_results for all
  using (
    exists (
      select 1 from public.grading_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.grading_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger grading_sessions_updated
  before update on public.grading_sessions
  for each row execute function public.set_updated_at();
