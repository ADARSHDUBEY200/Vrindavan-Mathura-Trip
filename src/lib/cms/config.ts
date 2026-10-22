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
