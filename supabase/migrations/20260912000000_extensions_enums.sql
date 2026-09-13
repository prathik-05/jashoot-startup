-- ============================================================================
-- JASHOOTS — 0001: Extensions + enums
-- Frozen build spec v6. Run first. Idempotent-safe (each guarded).
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Role model (Studio / admin)
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('owner', 'studio', 'editor');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Content publication
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.publication_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Package commerce
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.availability_type as enum ('always', 'date_range', 'weekdays', 'custom', 'contact_only');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.cta_action as enum ('book_on_whatsapp', 'discuss_on_whatsapp', 'enquire');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Customer operations pipeline
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.lead_stage as enum ('enquiry', 'contacted', 'quoted', 'awaiting_advance', 'confirmed', 'abandoned', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.booking_state as enum (
    'enquiry', 'contacted', 'quoted', 'awaiting_advance', 'confirmed',
    'in_progress', 'editing', 'review', 'approved', 'delivered',
    'completed', 'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.quote_status as enum ('draft', 'sent', 'accepted', 'declined', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.deliverable_type as enum ('photo', 'video', 'reel', 'raw_footage');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.deliverable_status as enum ('draft', 'pending', 'review', 'approved', 'replaced');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.approval_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.delivery_provider as enum ('google_drive', 'wetransfer', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.delivery_status as enum ('pending', 'ready', 'published', 'expired', 'revoked');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_method as enum ('upi', 'card', 'netbanking', 'cash', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'partial', 'paid', 'refunded', 'failed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_channel as enum ('whatsapp', 'email', 'push');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Conversion analytics (A8)
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.conversion_event_name as enum (
    'page_view', 'work_opened', 'reel_played', 'package_viewed',
    'package_cta_clicked', 'enquiry_started', 'enquiry_submitted',
    'whatsapp_clicked', 'whatsapp_opened', 'quote_sent',
    'booking_confirmed', 'payment_completed'
  );
exception when duplicate_object then null; end $$;