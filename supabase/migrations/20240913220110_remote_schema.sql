alter table "storage"."objects" alter column "owner_id" set data type uuid using "owner_id"::uuid;

create policy "Allow authenticated users to insert images 1rp6lws_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'user_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to insert images 5bbym9_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'cat_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to read images 1rp6lws_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'user_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to read images 5bbym9_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'cat_images'::text) AND (auth.role() = 'authenticated'::text)));



