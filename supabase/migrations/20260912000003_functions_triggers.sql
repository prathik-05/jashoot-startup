-- ============================================================================
-- JASHOOTS — 0004: Functions, triggers, security helpers
-- ============================================================================

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new is distinct from old then
    new.updated_at := now();
  end if;
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'service_categories','services','packages','portfolio_projects','testimonials',
    'faqs','about_content','home_sections','promo_block','proof_stats',
    'coverage_cities','method_steps','why_features','why_shoot_different','seo_meta',
    'clients','leads','quotes','bookings','projects','deliverables','deliveries','payments','admin_users'
  ] loop
    execute format(
      'create or replace trigger trg_%s_updated before update on public.%I for each row execute function public.set_updated_at()',
      t, t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- RLS helper: is the current auth user a Studio member?
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where id = auth.uid() and is_active
  );
$$;

-- RLS helper: is the current auth user the Studio owner?
create or replace function public.is_owner()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where id = auth.uid() and is_active and role = 'owner'
  );
$$;

-- RLS helper: does the current auth user's guardrail project belong to them?
create or replace function public.is_project_client(p_project_id uuid)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare v_client_id uuid;
begin
  if auth.uid() is null then
    return false;
  end if;
  select c.id into v_client_id
    from public.clients c
   where c.auth_user_id = auth.uid();
  if v_client_id is null then
    return false;
  end if;
  return exists (
    select 1
      from public.projects pr
      join public.bookings b on b.id = pr.booking_id
     where pr.id = p_project_id
       and b.client_id = v_client_id
  );
end $$;

-- RLS helper: does the current auth user's guardrail booking belong to them?
create or replace function public.is_booking_client(p_booking_id uuid)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare v_client_id uuid;
begin
  if auth.uid() is null then
    return false;
  end if;
  select c.id into v_client_id
    from public.clients c
   where c.auth_user_id = auth.uid();
  return v_client_id is not null and exists (
    select 1 from public.bookings b where b.id = p_booking_id and b.client_id = v_client_id
  );
end $$;

-- RLS helper: client has a published delivery on this project (A6 gate)
create or replace function public.delivery_released(p_project_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.deliveries d
    where d.project_id = p_project_id
      and d.delivery_status = 'published'
      and d.external_url is not null
      and (d.expires_at is null or d.expires_at > now())
  );
$$;

-- ---------------------------------------------------------------------------
-- on_auth_user_created -> clients sync
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_client()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare nm text;
begin
  nm := coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1));
  insert into public.clients (auth_user_id, name, email)
  values (new.id, nm, new.email)
  on conflict (auth_user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_client();

-- clients.auth_user_id must be a plain UNIQUE constraint for ON CONFLICT above
drop index if exists public.idx_clients_auth;
alter table public.clients
  add constraint clients_auth_user_id_key unique (auth_user_id);

-- ---------------------------------------------------------------------------
-- lead reference generation (JS-XXXX)
-- ---------------------------------------------------------------------------
create sequence if not exists public.lead_ref_seq start 1000;

create or replace function public.set_lead_ref()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.ref is null then
    new.ref := 'JS-' || lpad(nextval('public.lead_ref_seq')::text, 4, '0');
  end if;
  return new;
end $$;

drop trigger if exists trg_leads_ref on public.leads;
create trigger trg_leads_ref
  before insert on public.leads
  for each row execute function public.set_lead_ref();

-- ---------------------------------------------------------------------------
-- conversion event logging (A8) — SECURITY DEFINER RPC so anon can log
-- ---------------------------------------------------------------------------
create or replace function public.log_conversion_event(
  p_session text,
  p_event   public.conversion_event_name,
  p_page    text default null,
  p_context jsonb default '{}'::jsonb,
  p_lead_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.conversion_events (session_id, event_name, page, context, lead_id)
  values (p_session, p_event, p_page, p_context, p_lead_id);
end $$;

revoke execute on function public.log_conversion_event(text, public.conversion_event_name, text, jsonb, uuid) from public;
-- Only authenticated users (via server-side service role) can log events.
-- anon grant removed: prevents direct PostgREST bypass of app-level rate limiter.
grant execute on function public.log_conversion_event(text, public.conversion_event_name, text, jsonb, uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- A6: get_delivery_link — client-scoped, auth-gated delivery lookup.
-- Returns '{}' JSON unless the caller is the authenticated owner of the
-- project, the delivery is published, unexpired and has a URL.
-- ---------------------------------------------------------------------------
create or replace function public.get_delivery_link(p_project_id uuid)
returns jsonb
language plpgsql
security definer
stable
set search_path = public
as $$
declare v_client_id uuid;
begin
  if auth.uid() is null then
    return '{}'::jsonb;
  end if;
  select c.id into v_client_id from public.clients c where c.auth_user_id = auth.uid();
  if v_client_id is null or
     not exists (
       select 1 from public.projects pr
       join public.bookings b on b.id = pr.booking_id
       where pr.id = p_project_id and b.client_id = v_client_id
     ) then
    return '{}'::jsonb;
  end if;
  return (
    select jsonb_build_object(
      'url',             d.external_url,
      'provider',        d.provider,
      'expires_at',      d.expires_at,
      'access_notes',    d.access_notes,
      'delivery_status', d.delivery_status
    )
    from public.deliveries d
    where d.project_id = p_project_id
      and d.delivery_status = 'published'
      and (d.expires_at is null or d.expires_at > now())
      and d.external_url is not null
    order by d.published_at desc nulls last
    limit 1
  );
end $$;

revoke execute on function public.get_delivery_link(uuid) from public;
grant execute on function public.get_delivery_link(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Audit trail — per critical table (packages price, quotes, bookings,
-- payments status, approvals, media replacement, delivery publication,
-- lead stage). Explicit jsonb snapshots (no reliance on record casting).
-- ---------------------------------------------------------------------------
create or replace function public.audit_packages()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'DELETE' then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'packages.delete', 'packages', old.id::text,
      jsonb_build_object('name', old.name, 'price', old.price, 'availability_type', old.availability_type, 'published', old.published),
      null);
  elsif tg_op = 'UPDATE' then
    if old is distinct from new then
      insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
      values (coalesce(v_who::text,'system'), v_who, 'packages.update', 'packages', new.id::text,
        jsonb_build_object('name', old.name, 'price', old.price, 'availability_type', old.availability_type, 'published', old.published, 'cta_action', old.cta_action),
        jsonb_build_object('name', new.name, 'price', new.price, 'availability_type', new.availability_type, 'published', new.published, 'cta_action', new.cta_action));
    end if;
  else
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'packages.create', 'packages', new.id::text,
      null,
      jsonb_build_object('name', new.name, 'price', new.price));
  end if;
  return null;
end $$;

create or replace function public.audit_quotes()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'DELETE' then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'quotes.delete', 'quotes', old.id::text,
      jsonb_build_object('lead_id', old.lead_id, 'package_id', old.package_id, 'amount', old.amount, 'status', old.status),
      null);
  else
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'quotes.' || tg_op, 'quotes', new.id::text,
      case when tg_op = 'UPDATE'
           then jsonb_build_object('lead_id', old.lead_id, 'package_id', old.package_id, 'amount', old.amount, 'status', old.status)
           else null end,
      jsonb_build_object('lead_id', new.lead_id, 'package_id', new.package_id, 'amount', new.amount, 'status', new.status, 'sent_at', new.sent_at));
  end if;
  return null;
end $$;

create or replace function public.audit_bookings()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'UPDATE' then
    if old.state is distinct from new.state or old.advance_amount is distinct from new.advance_amount then
      insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
      values (coalesce(v_who::text,'system'), v_who, 'bookings.' || new.state, 'bookings', new.id::text,
        jsonb_build_object('state', old.state, 'advance_amount', old.advance_amount),
        jsonb_build_object('state', new.state, 'advance_amount', new.advance_amount));
    end if;
  elsif tg_op = 'INSERT' then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'bookings.create', 'bookings', new.id::text,
      null, jsonb_build_object('state', new.state, 'advance_amount', new.advance_amount));
  else
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'bookings.delete', 'bookings', old.id::text,
      jsonb_build_object('state', old.state, 'advance_amount', old.advance_amount), null);
  end if;
  return null;
end $$;

create or replace function public.audit_payments()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'payments.status.' || new.status, 'payments', new.id::text,
      jsonb_build_object('status', old.status, 'amount', old.amount, 'provider_ref', old.provider_ref),
      jsonb_build_object('status', new.status, 'amount', new.amount, 'provider_ref', new.provider_ref, 'paid_at', new.paid_at));
  end if;
  return null;
end $$;

create or replace function public.audit_approvals()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'approvals.' || new.status, 'approvals', new.id::text,
      jsonb_build_object('status', old.status, 'feedback', old.feedback),
      jsonb_build_object('status', new.status, 'feedback', new.feedback, 'decided_at', new.decided_at));
  end if;
  return null;
end $$;

create or replace function public.audit_deliverables()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if tg_op = 'UPDATE' and (old.media_url is distinct from new.media_url or old.status is distinct from new.status) then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'deliverables.update', 'deliverables', new.id::text,
      jsonb_build_object('status', old.status, 'media_url', old.media_url, 'replaced_by_id', old.replaced_by_id),
      jsonb_build_object('status', new.status, 'media_url', new.media_url, 'replaced_by_id', new.replaced_by_id));
  end if;
  return null;
end $$;

create or replace function public.audit_deliveries()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if old.delivery_status is distinct from new.delivery_status
     or old.external_url is distinct from new.external_url then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'deliveries.status.' || new.delivery_status, 'deliveries', new.id::text,
      jsonb_build_object('delivery_status', old.delivery_status, 'external_url', old.external_url),
      jsonb_build_object('delivery_status', new.delivery_status, 'external_url', new.external_url, 'published_at', new.published_at));
  end if;
  return null;
end $$;

create or replace function public.audit_leads()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_who uuid := auth.uid();
begin
  if new.stage is distinct from old.stage then
    insert into public.audit_logs(actor_type, actor_id, action, entity_type, entity_id, before, after)
    values (coalesce(v_who::text,'system'), v_who, 'leads.stage.' || new.stage, 'leads', new.id::text,
      jsonb_build_object('stage', old.stage, 'ref', old.ref),
      jsonb_build_object('stage', new.stage, 'ref', new.ref));
  end if;
  return null;
end $$;

drop trigger if exists trg_packages_audit on public.packages;
create trigger trg_packages_audit after insert or update or delete on public.packages
  for each row execute function public.audit_packages();

drop trigger if exists trg_quotes_audit on public.quotes;
create trigger trg_quotes_audit after insert or update or delete on public.quotes
  for each row execute function public.audit_quotes();

drop trigger if exists trg_bookings_audit on public.bookings;
create trigger trg_bookings_audit after insert or update or delete on public.bookings
  for each row execute function public.audit_bookings();

drop trigger if exists trg_payments_audit on public.payments;
create trigger trg_payments_audit after insert or update on public.payments
  for each row execute function public.audit_payments();

drop trigger if exists trg_approvals_audit on public.approvals;
create trigger trg_approvals_audit after update on public.approvals
  for each row execute function public.audit_approvals();

drop trigger if exists trg_deliverables_audit on public.deliverables;
create trigger trg_deliverables_audit after update on public.deliverables
  for each row execute function public.audit_deliverables();

drop trigger if exists trg_deliveries_audit on public.deliveries;
create trigger trg_deliveries_audit after update on public.deliveries
  for each row execute function public.audit_deliveries();

drop trigger if exists trg_leads_audit on public.leads;
create trigger trg_leads_audit after update on public.leads
  for each row execute function public.audit_leads();

-- ---------------------------------------------------------------------------
-- limit default EXECUTE grants on helper functions (defense in depth)
-- ---------------------------------------------------------------------------
revoke execute on function public.audit_packages() from public;
revoke execute on function public.audit_quotes() from public;
revoke execute on function public.audit_bookings() from public;
revoke execute on function public.audit_payments() from public;
revoke execute on function public.audit_approvals() from public;
revoke execute on function public.audit_deliverables() from public;
revoke execute on function public.audit_deliveries() from public;
revoke execute on function public.audit_leads() from public;
revoke execute on function public.set_updated_at() from public;
revoke execute on function public.set_lead_ref() from public;
revoke execute on function public.handle_new_client() from public;
revoke execute on function public.is_owner() from public;
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_project_client(uuid) from public;
revoke execute on function public.is_booking_client(uuid) from public;
revoke execute on function public.delivery_released(uuid) from public;