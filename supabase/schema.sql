-- Open Brands form storage
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Safe to re-run: every statement is idempotent.

-- ---------------------------------------------------------------------------
-- Contact form leads (posted from /contact via api/lead.ts)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null,
  email       text        not null,
  business    text,
  phone       text,
  website     text,
  message     text,
  budget      text,
  services    text[],
  source      text        not null default 'contact_form',
  referrer    text,
  utm         jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));

-- ---------------------------------------------------------------------------
-- Blog newsletter signups (posted from /blog via api/subscribe.ts)
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text        not null,
  source          text        not null default 'blog_newsletter',
  referrer        text,
  utm             jsonb,
  unsubscribed_at timestamptz
);

-- One row per address so re-subscribing updates rather than duplicates. Addresses
-- are lower-cased by api/subscribe.ts before insert, so a plain unique index is
-- both case-safe in practice and usable as an ON CONFLICT target.
create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (email);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- RLS is ON with no policies, which denies every request made with the anon or
-- authenticated keys. Writes happen server-side in the Vercel functions using
-- the service role key, which bypasses RLS. Nothing in the browser can read or
-- write these tables, so form submissions cannot be enumerated by visitors.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
