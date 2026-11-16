create table if not exists public.care_reminders (
    reminder_id uuid primary key default gen_random_uuid(),
    cat_id uuid not null references public.cats (cat_id) on delete cascade,
    user_id uuid not null references public.users (user_id) on delete cascade,
    kind text not null,
    due_on date not null,
    notes text,
    completed_at timestamptz,
    last_notified_on date,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint care_reminders_kind_check check (
        kind in ('weigh_in', 'bloodwork', 'vet_visit')
    ),
    constraint care_reminders_notes_length check (
        notes is null
        or char_length(notes) <= 500
    )
);

comment on table public.care_reminders is
'Dated weigh-in, bloodwork and vet visit reminders for each cat.';

create unique index if not exists care_reminders_open_kind_day
on public.care_reminders (cat_id, kind, due_on)
where completed_at is null;

create index if not exists care_reminders_cat_due_idx
on public.care_reminders (cat_id, due_on);

create index if not exists care_reminders_user_open_idx
on public.care_reminders (user_id, due_on)
where completed_at is null;

alter table public.care_reminders enable row level security;

create policy "Allow select for own care reminders"
on public.care_reminders
for select
using (
    auth.role() = 'authenticated'
    and user_id = auth.uid()
    and exists (
        select 1
        from public.cats
        where cats.cat_id = care_reminders.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow insert for own care reminders"
on public.care_reminders
for insert
with check (
    auth.role() = 'authenticated'
    and user_id = auth.uid()
    and exists (
        select 1
        from public.cats
        where cats.cat_id = care_reminders.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow update for own care reminders"
on public.care_reminders
for update
using (
    auth.role() = 'authenticated'
    and user_id = auth.uid()
    and exists (
        select 1
        from public.cats
        where cats.cat_id = care_reminders.cat_id
          and cats.user_id = auth.uid()
    )
)
with check (
    auth.role() = 'authenticated'
    and user_id = auth.uid()
    and exists (
        select 1
        from public.cats
        where cats.cat_id = care_reminders.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow delete for own care reminders"
on public.care_reminders
for delete
using (
    auth.role() = 'authenticated'
    and user_id = auth.uid()
    and exists (
        select 1
        from public.cats
        where cats.cat_id = care_reminders.cat_id
          and cats.user_id = auth.uid()
    )
);

grant all on table public.care_reminders to anon;
grant all on table public.care_reminders to authenticated;
grant all on table public.care_reminders to service_role;
