/** Shared site config from env — used by client + server components */

export const WA_NUMBER =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WA_NUMBER) ||
  "212600967655";

export const SITE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  "https://aghezouluxcar.ma";

/** Format 212600967655 → +212 6 00 96 76 55 */
export function formatPhone(num = WA_NUMBER) {
  const n = String(num).replace(/\D/g, "");
  if (n.startsWith("212") && n.length >= 12) {
    return `+212 ${n.slice(3, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)} ${n.slice(8, 10)} ${n.slice(10)}`;
  }
  if (n.length === 10 && n.startsWith("0")) {
    return `+212 ${n.slice(1, 2)} ${n.slice(2, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)} ${n.slice(8)}`;
  }
  return `+${n}`;
}

export function waLink(text = "") {
  const base = `https://wa.me/${WA_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
