-- ============================================================================
-- JASHOOTS — 0006: Storage buckets + storage RLS
--   work-public     : PUBLIC transcoded previews/reels served via CDN
--   portal-private  : client review media (never public; signed/RLS-gated)
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('work-public',    'work-public',    true,  104857600, array['video/mp4','video/webm','video/quicktime','image/jpeg','image/png','image/webp']),
  ('portal-private', 'portal-private', false, 104857600, array['video/mp4','video/webm','image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- work-public: public read (CDN friendly); Studio manages objects
-- ---------------------------------------------------------------------------
create policy "work-public public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'work-public');

create policy "work-public studio insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'work-public' and (select public.is_admin()));

create policy "work-public studio update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'work-public' and (select public.is_admin()));

create policy "work-public studio delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'work-public' and (select public.is_admin()));

-- ---------------------------------------------------------------------------
-- portal-private: Studio only via PostgREST/RLS. Client review media is
-- served as signed URLs or through the A6 delivery link, never by direct
-- object listing.
-- ---------------------------------------------------------------------------
create policy "portal-private studio insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portal-private' and (select public.is_admin()));

create policy "portal-private studio update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portal-private' and (select public.is_admin()));

create policy "portal-private studio delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portal-private' and (select public.is_admin()));

create policy "portal-private studio read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'portal-private' and (select public.is_admin()));