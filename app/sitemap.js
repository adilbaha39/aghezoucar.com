import { LOCALES } from "@/lib/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aghezouluxcar.ma";
const PAGES = ["", "/fleet", "/booking", "/about"];

export default function sitemap() {
  const now = new Date();
  const entries = [];
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "/fleet" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.7
      });
    }
  }
  return entries;
}
