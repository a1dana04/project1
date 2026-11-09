-- Supabase -> SQL Editor -> вставить -> Run
create table if not exists public.invitations (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.invitations enable row level security;
-- Политик нет: таблицей пользуется только сервер сайта (service role).

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
