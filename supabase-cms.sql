-- =====================================================================
-- vrindavanmathuratrip — Admin CMS schema
-- Run once in the Supabase SQL editor (safe to re-run).
--
-- Tables: "Blog", "Package", "Temple"
-- RLS:    anon/authenticated can SELECT only status = 'published' rows.
--         There are no insert/update/delete policies, so every write must
--         go through the service-role key (the /api/admin/* routes).
-- Storage: public buckets BlogImages, ProductImages, TempleImages.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------
create table if not exists public."Blog" (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  title         text,
  category      text,
  slug          text unique not null,
  author        text,
  meta          jsonb not null default '{}'::jsonb,   -- { title, description }
  schema        jsonb not null default '{}'::jsonb,   -- { title, description }
  image         text,
  alt           text,
  subcontent    text,
  content       text,                                 -- HTML
  faqs          jsonb not null default '[]'::jsonb,   -- [{ id, question, answer }]
  "seoContent"  jsonb not null default '{}'::jsonb,
  status        text not null default 'draft' check (status in ('draft', 'published'))
);

-- ---------------------------------------------------------------------
-- Package (tour packages)
-- ---------------------------------------------------------------------
create table if not exists public."Package" (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  title                 text,
  category              text,
  slug                  text unique not null,
  price                 text,
  day                   text,
  night                 text,
  duration              text,
  destination           text,
  reviews               text,
  rating                text,
  overview              text,
  heroimage             jsonb not null default '{}'::jsonb,  -- { image, alt }
  meta                  jsonb not null default '{}'::jsonb,
  schema                jsonb not null default '{}'::jsonb,
  policies              jsonb not null default '[]'::jsonb,  -- [{ id, title, description }] x4
  "childImage"          jsonb not null default '[]'::jsonb,  -- [{ id, image, alt }] x4
  faqs                  jsonb not null default '[]'::jsonb,
  testimonials          jsonb not null default '[]'::jsonb,  -- [{ id, name, description, rating }]
  highlights            jsonb not null default '[]'::jsonb,  -- [{ id, description }]
  inclusions            jsonb not null default '[]'::jsonb,
  exclusions            jsonb not null default '[]'::jsonb,
  documents             jsonb not null default '[]'::jsonb,
  itinerary             jsonb not null default '[]'::jsonb,  -- [{ id, day, title, description }]
  durationbreakdown     jsonb not null default '[]'::jsonb,  -- [{ id, days, place }]
  destroutes            jsonb not null default '{}'::jsonb,  -- { source, destination, segments: [{ id, from, to }] }
  breakfast_included    boolean not null default false,
  stay_included         boolean not null default false,
  transfer_included     boolean not null default false,
  sightseeing_included  boolean not null default false,
  available_src         text[] not null default '{}',
  "seoContent"          jsonb not null default '{}'::jsonb,
  status                text not null default 'draft' check (status in ('draft', 'published'))
);

-- ---------------------------------------------------------------------
-- Temple
-- ---------------------------------------------------------------------
create table if not exists public."Temple" (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  title           text,
  location        text,
  slug            text unique not null,
  meta            jsonb not null default '{}'::jsonb,
  schema          jsonb not null default '{}'::jsonb,
  image           text,
  alt             text,
  subcontent      text,
  content         text,                                -- HTML
  history         text,
  timing          text,                                -- darshan timing HTML
  bestvisit       text,                                -- HTML
  journey         text,                                -- HTML
  templeoverview  text,                                -- HTML
  quickanswer     text,                                -- HTML
  ataglance       jsonb not null default '[]'::jsonb,  -- [{ id, label, value }]
  whybook         jsonb not null default '{}'::jsonb,  -- { heading, intro, rows: [{ id, reason, detail }], outro }
  faqs            jsonb not null default '[]'::jsonb,
  status          text not null default 'draft' check (status in ('draft', 'published'))
);

-- Indexes for the public listing queries
create index if not exists blog_status_created_idx    on public."Blog"    (status, created_at desc);
create index if not exists package_status_created_idx on public."Package" (status, created_at desc);
create index if not exists temple_status_created_idx  on public."Temple"  (status, created_at desc);

-- ---------------------------------------------------------------------
-- Row Level Security: public read of published rows only
-- ---------------------------------------------------------------------
alter table public."Blog"    enable row level security;
alter table public."Package" enable row level security;
alter table public."Temple"  enable row level security;

drop policy if exists "Public read published blogs"    on public."Blog";
drop policy if exists "Public read published packages" on public."Package";
drop policy if exists "Public read published temples"  on public."Temple";

create policy "Public read published blogs"
  on public."Blog" for select to anon, authenticated
  using (status = 'published');

create policy "Public read published packages"
  on public."Package" for select to anon, authenticated
  using (status = 'published');

create policy "Public read published temples"
  on public."Temple" for select to anon, authenticated
  using (status = 'published');

-- The admin dashboard and list pages read with the browser (anon-key) client
-- while signed in, so the admin user also needs to see drafts. Replace the
-- e-mail below with the same value as ADMIN_EMAIL before running.
drop policy if exists "Admin read all blogs"    on public."Blog";
drop policy if exists "Admin read all packages" on public."Package";
drop policy if exists "Admin read all temples"  on public."Temple";

create policy "Admin read all blogs"
  on public."Blog" for select to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@example.com');

create policy "Admin read all packages"
  on public."Package" for select to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@example.com');

create policy "Admin read all temples"
  on public."Temple" for select to authenticated
  using ((auth.jwt() ->> 'email') = 'admin@example.com');

-- ---------------------------------------------------------------------
-- Storage buckets (public read, authenticated upload)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('BlogImages',    'BlogImages',    true, 2097152, array['image/webp']),
  ('ProductImages', 'ProductImages', true, 2097152, array['image/webp']),
  ('TempleImages',  'TempleImages',  true, 2097152, array['image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CMS images public read"          on storage.objects;
drop policy if exists "CMS images authenticated upload" on storage.objects;
drop policy if exists "CMS images authenticated update" on storage.objects;

create policy "CMS images public read"
  on storage.objects for select to public
  using (bucket_id in ('BlogImages', 'ProductImages', 'TempleImages'));

create policy "CMS images authenticated upload"
  on storage.objects for insert to authenticated
  with check (bucket_id in ('BlogImages', 'ProductImages', 'TempleImages'));

create policy "CMS images authenticated update"
  on storage.objects for update to authenticated
  using (bucket_id in ('BlogImages', 'ProductImages', 'TempleImages'));
