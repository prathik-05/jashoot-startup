-- ============================================================================
-- JASHOOTS — 0005: Row Level Security
-- Public surfaces: anon reads published content only.
-- Ops surfaces: Studio (admin) full; clients scoped to their own records.
-- A6: delivery external_url NEVER readable by anon; clients only when the
--      delivery is published + unexpired + linked to their project.
-- ============================================================================

-- ===========================================================================
-- CONTENT / CMS  (public read of published rows; Studio full control)
-- ===========================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'service_categories','services','packages','portfolio_projects','testimonials',
    'faqs','about_content','promo_block','proof_stats','coverage_cities',
    'method_steps','why_features','why_shoot_different','seo_meta'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;

alter table public.home_sections enable row level security;

create policy "published read" on public.service_categories
  for select to anon, authenticated using (published);
create policy "studio manage" on public.service_categories
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.services
  for select to anon, authenticated using (published);
create policy "studio manage" on public.services
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.packages
  for select to anon, authenticated using (published);
create policy "studio manage" on public.packages
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.portfolio_projects
  for select to anon, authenticated using (published);
create policy "studio manage" on public.portfolio_projects
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.testimonials
  for select to anon, authenticated using (published);
create policy "studio manage" on public.testimonials
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.faqs
  for select to anon, authenticated using (published);
create policy "studio manage" on public.faqs
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.about_content
  for select to anon, authenticated using (published);
create policy "studio manage" on public.about_content
  for all to authenticated using ((select public.is_admin()));

create policy "enabled read" on public.promo_block
  for select to anon, authenticated using (enabled and published);
create policy "studio manage" on public.promo_block
  for all to authenticated using ((select public.is_admin()));

-- proof wall: only rows with a real value are visible (real-data-only)
create policy "published read" on public.proof_stats
  for select to anon, authenticated using (published and value is not null);
create policy "studio manage" on public.proof_stats
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.coverage_cities
  for select to anon, authenticated using (published and active);
create policy "studio manage" on public.coverage_cities
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.method_steps
  for select to anon, authenticated using (published);
create policy "studio manage" on public.method_steps
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.why_features
  for select to anon, authenticated using (published);
create policy "studio manage" on public.why_features
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.why_shoot_different
  for select to anon, authenticated using (published);
create policy "studio manage" on public.why_shoot_different
  for all to authenticated using ((select public.is_admin()));

create policy "published read" on public.seo_meta
  for select to anon, authenticated using (published);
create policy "studio manage" on public.seo_meta
  for all to authenticated using ((select public.is_admin()));

-- A7: homepage sections readable publicly but only when enabled+published
create policy "enabled read" on public.home_sections
  for select to anon, authenticated using (enabled and published);
create policy "studio manage" on public.home_sections
  for all to authenticated using ((select public.is_admin()));

-- ===========================================================================
-- OPERATIONS
-- ===========================================================================

-- ---------- clients ----------
alter table public.clients enable row level security;

create policy "self read" on public.clients
  for select to authenticated using (auth_user_id = auth.uid());
create policy "self insert" on public.clients
  for insert to authenticated
  with check (auth_user_id = auth.uid());
create policy "self update" on public.clients
  for update to authenticated using (auth_user_id = auth.uid());
create policy "studio read" on public.clients
  for select to authenticated using ((select public.is_admin()));
create policy "studio write" on public.clients
  for all to authenticated using ((select public.is_admin()));

-- ---------- admin_users ----------
alter table public.admin_users enable row level security;

create policy "studio self read" on public.admin_users
  for select to authenticated using (id = auth.uid());
create policy "owner manage" on public.admin_users
  for all to authenticated using ((select public.is_owner()));

-- ---------- leads ----------
alter table public.leads enable row level security;

create policy "studio read" on public.leads
  for select to authenticated using ((select public.is_admin()));
create policy "studio insert" on public.leads
  for insert to authenticated
  with check ((select public.is_admin()));
create policy "studio update" on public.leads
  for update to authenticated using ((select public.is_admin()));
create policy "studio delete" on public.leads
  for delete to authenticated using ((select public.is_admin()));
create policy "client own leads" on public.leads
  for select to authenticated
  using (client_id in (select c.id from public.clients c where c.auth_user_id = auth.uid()));

-- ---------- quotes ----------
alter table public.quotes enable row level security;

create policy "studio manage" on public.quotes
  for all to authenticated using ((select public.is_admin()));
create policy "client own quotes" on public.quotes
  for select to authenticated
  using (lead_id in (select l.id from public.leads l join public.clients c on c.id = l.client_id
                     where c.auth_user_id = auth.uid()));

-- ---------- bookings ----------
alter table public.bookings enable row level security;

create policy "studio manage" on public.bookings
  for all to authenticated using ((select public.is_admin()));
create policy "client own bookings" on public.bookings
  for select to authenticated
  using (client_id in (select c.id from public.clients c where c.auth_user_id = auth.uid()));

-- ---------- projects ----------
alter table public.projects enable row level security;

create policy "studio manage" on public.projects
  for all to authenticated using ((select public.is_admin()));
create policy "client own projects" on public.projects
  for select to authenticated
  using (public.is_project_client(id));

-- ---------- deliverables ----------
alter table public.deliverables enable row level security;

create policy "studio manage" on public.deliverables
  for all to authenticated using ((select public.is_admin()));
create policy "client own deliverables" on public.deliverables
  for select to authenticated
  using (public.is_project_client(project_id));

-- ---------- approvals ----------
alter table public.approvals enable row level security;

create policy "studio manage" on public.approvals
  for all to authenticated using ((select public.is_admin()));
create policy "client own approvals" on public.approvals
  for insert to authenticated
  with check (exists (select 1 from public.deliverables d
                       where d.id = deliverable_id and public.is_project_client(d.project_id)));
create policy "client own approvals update" on public.approvals
  for update to authenticated
  using (exists (select 1 from public.deliverables d
                  where d.id = deliverable_id and public.is_project_client(d.project_id)));
create policy "client own approvals read" on public.approvals
  for select to authenticated
  using (exists (select 1 from public.deliverables d
                  where d.id = deliverable_id and public.is_project_client(d.project_id)));

-- ---------- deliveries ----------
alter table public.deliveries enable row level security;

create policy "studio manage" on public.deliveries
  for all to authenticated using ((select public.is_admin()));
-- A6: clients may only read a delivery once it is published + unexpired,
-- and only for projects they own. external_url is otherwise invisible.
create policy "client released delivery only" on public.deliveries
  for select to authenticated
  using (public.is_project_client(project_id) and public.delivery_released(project_id));

-- ---------- payments ----------
alter table public.payments enable row level security;

create policy "studio manage" on public.payments
  for all to authenticated using ((select public.is_admin()));
create policy "client own payments" on public.payments
  for select to authenticated
  using (booking_id in (select b.id from public.bookings b join public.clients c on c.id = b.client_id
                        where c.auth_user_id = auth.uid()));

-- ---------- notifications ----------
alter table public.notifications enable row level security;

create policy "studio manage" on public.notifications
  for all to authenticated using ((select public.is_admin()));
create policy "client own notifications" on public.notifications
  for select to authenticated
  using (
    (project_id is not null and public.is_project_client(project_id))
    or (booking_id is not null and public.is_booking_client(booking_id))
  );

-- ---------- conversion_events (analytics: Studio only; insert via RPC) ----
alter table public.conversion_events enable row level security;

create policy "studio read" on public.conversion_events
  for select to authenticated using ((select public.is_admin()));

-- ---------- audit_logs (Studio only) ----------
alter table public.audit_logs enable row level security;

create policy "studio read" on public.audit_logs
  for select to authenticated using ((select public.is_admin()));