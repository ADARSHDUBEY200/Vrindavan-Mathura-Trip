-- =====================================================================
-- vrindavanmathuratrip — full setup for a NEW, empty Supabase project
-- Paste this whole file into the Supabase SQL editor and press Run.
-- Safe to re-run: it never deletes or changes rows.
--
-- Replaces supabase-cms.sql + supabase-site-page.sql for a new project.
-- Run only this file.
--
-- Tables:  "Blog", "Package", "Temple", "SitePage"
-- Reads:   the public sees status = 'published' rows only; the admin sees drafts.
-- Writes:  no insert/update/delete policies exist, so every write goes through
--          the service-role key (the /api/admin/* routes).
-- Storage: public buckets BlogImages, ProductImages, TempleImages (.webp, 2 MB).
-- Grants:  new Supabase projects no longer expose public tables to the API
--          automatically, so every role needs an explicit grant here.
--
-- The admin e-mail below must match ADMIN_EMAIL in .env.local.
-- =====================================================================

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
  -- Blog page blocks (all optional; shape in src/lib/cms/blog-fields.ts):
  --   location, updatedOn, readMinutes, readMinutesAuto, featured, authorRole, authorImage,
  --   guideBio, quickAnswer (HTML), quickFacts [{label,value}], keyTakeaways [{text}], guideIntro,
  --   honestNote, guideTip, relatedLinks [{label,href}], cta {title,text},
  --   videoSrc, videoDuration, videoTitle, videoOverlayTitle, videoTestimonials [{title,url,city}],
  --   recommendations [...], reviews [...], totalRating, totalReviews, pilgrimsServed,
  --   templeTimings {title,note,htmlContent}
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
  duration              text,                                -- URL segment, e.g. "five-days"
  destination           text,
  reviews               text,
  rating                text,
  overview              text,                                -- HTML
  heroimage             jsonb not null default '{}'::jsonb,  -- { image, alt }
  meta                  jsonb not null default '{}'::jsonb,
  schema                jsonb not null default '{}'::jsonb,
  policies              jsonb not null default '[]'::jsonb,  -- [{ id, title, description }] x4
  "childImage"          jsonb not null default '[]'::jsonb,  -- [{ id, image, alt }]
  faqs                  jsonb not null default '[]'::jsonb,
  testimonials          jsonb not null default '[]'::jsonb,  -- [{ id, name, description, rating }]
  highlights            jsonb not null default '[]'::jsonb,  -- [{ id, description }]
  inclusions            jsonb not null default '[]'::jsonb,
  exclusions            jsonb not null default '[]'::jsonb,
  documents             jsonb not null default '[]'::jsonb,
  itinerary             jsonb not null default '[]'::jsonb,  -- [{ id, day, title, description, activities? }]
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

-- ---------------------------------------------------------------------
-- SitePage (editable copy for whole pages; one row per page)
-- content: what the public page shows. draft: unpublished edits, admin only.
-- ---------------------------------------------------------------------
create table if not exists public."SitePage" (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  slug        text unique not null,
  title       text,
  content     jsonb,
  draft       jsonb,
  status      text not null default 'draft' check (status in ('draft', 'published'))
);

-- Indexes for the public listing queries
create index if not exists blog_status_created_idx    on public."Blog"    (status, created_at desc);
create index if not exists package_status_created_idx on public."Package" (status, created_at desc);
create index if not exists temple_status_created_idx  on public."Temple"  (status, created_at desc);

-- ---------------------------------------------------------------------
-- Grants: reads for the site, full access for the server only
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

grant select on public."Blog", public."Package", public."Temple" to anon, authenticated;
grant select, insert, update, delete on public."Blog", public."Package", public."Temple", public."SitePage" to service_role;

-- SitePage: the public can read every column except "draft".
revoke all on public."SitePage" from anon, authenticated;
grant select (id, created_at, updated_at, slug, title, content, status) on public."SitePage" to anon, authenticated;

-- ---------------------------------------------------------------------
-- Row Level Security: public read of published rows only
-- ---------------------------------------------------------------------
alter table public."Blog"     enable row level security;
alter table public."Package"  enable row level security;
alter table public."Temple"   enable row level security;
alter table public."SitePage" enable row level security;

drop policy if exists "Public read published blogs"      on public."Blog";
drop policy if exists "Public read published packages"   on public."Package";
drop policy if exists "Public read published temples"    on public."Temple";
drop policy if exists "Public read published site pages" on public."SitePage";

create policy "Public read published blogs"
  on public."Blog" for select to anon, authenticated
  using (status = 'published');

create policy "Public read published packages"
  on public."Package" for select to anon, authenticated
  using (status = 'published');

create policy "Public read published temples"
  on public."Temple" for select to anon, authenticated
  using (status = 'published');

create policy "Public read published site pages"
  on public."SitePage" for select to anon, authenticated
  using (status = 'published');

-- The admin dashboard and list pages read with the browser (anon-key) client
-- while signed in, so the admin user also needs to see drafts.
drop policy if exists "Admin read all blogs"    on public."Blog";
drop policy if exists "Admin read all packages" on public."Package";
drop policy if exists "Admin read all temples"  on public."Temple";

create policy "Admin read all blogs"
  on public."Blog" for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@mathuraguide.com');

create policy "Admin read all packages"
  on public."Package" for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@mathuraguide.com');

create policy "Admin read all temples"
  on public."Temple" for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'admin@mathuraguide.com');

-- ---------------------------------------------------------------------
-- Storage buckets (public read, admin upload)
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

drop policy if exists "CMS images public read"  on storage.objects;
drop policy if exists "CMS images admin upload" on storage.objects;
drop policy if exists "CMS images admin update" on storage.objects;

create policy "CMS images public read"
  on storage.objects for select to public
  using (bucket_id in ('BlogImages', 'ProductImages', 'TempleImages'));

create policy "CMS images admin upload"
  on storage.objects for insert to authenticated
  with check (
    bucket_id in ('BlogImages', 'ProductImages', 'TempleImages')
    and lower(auth.jwt() ->> 'email') = 'admin@mathuraguide.com'
  );

create policy "CMS images admin update"
  on storage.objects for update to authenticated
  using (
    bucket_id in ('BlogImages', 'ProductImages', 'TempleImages')
    and lower(auth.jwt() ->> 'email') = 'admin@mathuraguide.com'
  );

-- ---------------------------------------------------------------------
-- Check: expect 4 rows, all true, with 2 policies (SitePage: 1)
-- ---------------------------------------------------------------------
select
  c.relname                                               as table_name,
  c.relrowsecurity                                        as rls_on,
  has_any_column_privilege('anon', c.oid, 'select')       as public_can_read,
  has_table_privilege('service_role', c.oid, 'insert')    as admin_api_can_write,
  (select count(*) from pg_policies p
    where p.schemaname = 'public' and p.tablename = c.relname) as policies
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname in ('Blog', 'Package', 'Temple', 'SitePage')
order by c.relname;
