export const LOCALES = ["fr", "ar", "en"];
export const DEFAULT_LOCALE = "fr";

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default)
};

export async function getDictionary(locale) {
  const loader = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  return loader();
}
