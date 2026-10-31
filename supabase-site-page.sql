-- =====================================================================
-- vrindavanmathuratrip — editable page copy (run once, by hand)
--
-- Adds one new table for the "Tour Packages Page" editor in the admin CMS.
-- It only creates "SitePage"; no existing table, row, policy or bucket is touched.
-- Run THIS file, not supabase-cms.sql: that file resets policies on live tables.
--
-- Until this has been run, /tour-packages shows the default copy from
-- src/content/tour-packages.ts and the editor cannot save.
--
-- content: what the public page shows. draft: unpublished edits, admin only.
-- =====================================================================

create extension if not exists pgcrypto;

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

alter table public."SitePage" enable row level security;

drop policy if exists "Public read published site pages" on public."SitePage";
create policy "Public read published site pages"
  on public."SitePage" for select to anon, authenticated
  using (status = 'published');

-- Writes and draft reads go through /api/admin/pages with the service-role key.
-- The public can read every column except "draft".
revoke all on public."SitePage" from anon, authenticated;
grant select (id, created_at, updated_at, slug, title, content, status) on public."SitePage" to anon, authenticated;
