import { encodeBody } from "@/lib/cms/body-codec";

type Row = Record<string, unknown>;
type Result = { data?: Row; error?: string };

async function request(method: "POST" | "PUT" | "DELETE", resource: string, id?: string, body?: Row): Promise<Result> {
  try {
    const url = `/api/admin/${resource}${id ? `?id=${encodeURIComponent(id)}` : ""}`;
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(encodeBody(body)) : undefined,
      credentials: "same-origin",
    });
    const payload = (await res.json().catch(() => ({}))) as Result;
    if (!res.ok) return { error: payload.error ?? `Request failed (${res.status})` };
    return { data: payload.data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Network error" };
  }
}

function resource(name: "blogs" | "packages" | "temples") {
  return {
    insert: (row: Row) => request("POST", name, undefined, row),
    update: (id: string, row: Row) => request("PUT", name, id, row),
    delete: (id: string) => request("DELETE", name, id),
  };
}

/** Client-side helper for admin writes. Never throws; check `error`. */
export const adminApi = {
  blogs: resource("blogs"),
  packages: resource("packages"),
  temples: resource("temples"),
};
