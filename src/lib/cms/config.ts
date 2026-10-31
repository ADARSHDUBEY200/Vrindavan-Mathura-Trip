/**
 * Admin CMS settings shared by the proxy, the admin pages and the API routes.
 * The admin folder in src/app must match ADMIN_BASE (app/admin-e46ny8zh).
 */
export const ADMIN_BASE = "/admin-e46ny8zh";
export const ADMIN_LOGIN = "/admin-login";

export type EditorType = "Blog" | "Package" | "Temple";

export const STORAGE_BUCKETS: Record<EditorType, string> = {
  Blog: "BlogImages",
  Package: "ProductImages",
  Temple: "TempleImages",
};

export const TABLES: Record<EditorType, string> = {
  Blog: "Blog",
  Package: "Package",
  Temple: "Temple",
};

/** List page for each resource; create is `${list}/create`, edit is `${list}/edit/${id}`. */
export const ADMIN_ROUTES: Record<EditorType, string> = {
  Blog: `${ADMIN_BASE}/blogs`,
  Package: `${ADMIN_BASE}/products`,
  Temple: `${ADMIN_BASE}/temples`,
};

/** Editable copy for whole pages (see supabase-site-page.sql). Not an EditorType: each page is one row, not a list. */
export const SITE_PAGE_TABLE = "SitePage";
export const TOUR_PACKAGES_PAGE_SLUG = "tour-packages";
export const ADMIN_TOUR_PACKAGES_PAGE = `${ADMIN_BASE}/tour-packages-page`;
export const TEMPLES_PAGE_SLUG = "temples";
export const ADMIN_TEMPLES_PAGE = `${ADMIN_BASE}/temples-page`;
