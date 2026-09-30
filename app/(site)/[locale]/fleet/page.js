import { getDictionary } from "@/lib/i18n/config";
import styles from "./fleet.module.css";
import FleetFilters from "./FleetFilters";

export async function generateMetadata({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return { title: dict.fleet.title, description: dict.fleet.description, alternates: { canonical: `/${locale}/fleet` } };
}

export default async function FleetPage({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="eyebrow">{dict.fleet.h1}</div>
        <h1>{dict.fleet.h1}</h1>
        <p>{dict.fleet.sub}</p>
      </section>
      <FleetFilters locale={locale} t={dict.fleet} categories={dict.categories} specs={dict.specs} status={dict.status} />
    </main>
  );
}
