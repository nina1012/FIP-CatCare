create table if not exists public.bloodwork (
    bloodwork_id uuid primary key default gen_random_uuid(),
    cat_id uuid not null references public.cats (cat_id) on delete cascade,
    collected_on date not null,
    albumin_globulin_ratio numeric(5, 3) not null,
    hematocrit numeric(5, 2) not null,
    bilirubin numeric(6, 3) not null,
    report_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint bloodwork_one_result_per_day unique (cat_id, collected_on),
    constraint bloodwork_albumin_globulin_ratio_range check (
        albumin_globulin_ratio >= 0
        and albumin_globulin_ratio <= 3
    ),
    constraint bloodwork_hematocrit_range check (
        hematocrit >= 0
        and hematocrit <= 100
    ),
    constraint bloodwork_bilirubin_range check (
        bilirubin >= 0
        and bilirubin <= 50
    )
);

comment on table public.bloodwork is
'FIP lab results (albumin/globulin ratio, hematocrit, bilirubin) and the attached lab report.';

alter table public.bloodwork enable row level security;

create policy "Allow select for own bloodwork"
on public.bloodwork
for select
using (
    auth.role() = 'authenticated'
    and exists (
        select 1
        from public.cats
        where cats.cat_id = bloodwork.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow insert for own bloodwork"
on public.bloodwork
for insert
with check (
    auth.role() = 'authenticated'
    and exists (
        select 1
        from public.cats
        where cats.cat_id = bloodwork.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow update for own bloodwork"
on public.bloodwork
for update
using (
    auth.role() = 'authenticated'
    and exists (
        select 1
        from public.cats
        where cats.cat_id = bloodwork.cat_id
          and cats.user_id = auth.uid()
    )
)
with check (
    auth.role() = 'authenticated'
    and exists (
        select 1
        from public.cats
        where cats.cat_id = bloodwork.cat_id
          and cats.user_id = auth.uid()
    )
);

create policy "Allow delete for own bloodwork"
on public.bloodwork
for delete
using (
    auth.role() = 'authenticated'
    and exists (
        select 1
        from public.cats
        where cats.cat_id = bloodwork.cat_id
          and cats.user_id = auth.uid()
    )
);

grant all on table public.bloodwork to anon;
grant all on table public.bloodwork to authenticated;
grant all on table public.bloodwork to service_role;

insert into storage.buckets (id, name, public)
values ('lab_reports', 'lab_reports', true)
on conflict (id) do nothing;

create policy "Allow authenticated users to insert lab reports"
on storage.objects
as permissive
for insert
to authenticated
with check (
    (bucket_id = 'lab_reports')
    and (auth.role() = 'authenticated')
);

create policy "Allow authenticated users to read lab reports"
on storage.objects
as permissive
for select
to authenticated
using (
    (bucket_id = 'lab_reports')
    and (auth.role() = 'authenticated')
);

create policy "Allow authenticated users to delete lab reports"
on storage.objects
as permissive
for delete
to authenticated
using (
    (bucket_id = 'lab_reports')
    and (auth.role() = 'authenticated')
);
