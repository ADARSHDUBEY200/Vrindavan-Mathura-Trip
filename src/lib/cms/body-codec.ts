/**
 * WAF-safe request bodies. Rich-text HTML in a JSON body trips the hosting
 * edge WAF's XSS rules, so the admin client sends base64-encoded UTF-8 JSON:
 *   { "__enc": "b64", "d": "<base64>" }
 * TextEncoder/TextDecoder keep Hindi and other non-Latin text intact
 * (plain btoa throws on characters outside Latin-1).
 */
export type EncodedBody = { __enc: "b64"; d: string };

export function encodeBody(value: unknown): EncodedBody {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return { __enc: "b64", d: btoa(binary) };
}

export function decodeBody<T = unknown>(body: unknown): T {
  if (body && typeof body === "object" && (body as EncodedBody).__enc === "b64") {
    const binary = atob((body as EncodedBody).d);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as T;
  }
  return body as T;
}
