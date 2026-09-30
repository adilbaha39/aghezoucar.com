import { getDictionary } from "@/lib/i18n/config";
import Link from "next/link";
import { waLink } from "@/lib/site";
import styles from "./about.module.css";

export async function generateMetadata({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return { title: dict.about.title, description: dict.about.description, alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({ params: { locale } }) {
  const dict = await getDictionary(locale);
  const t = dict.about;
  const p = (path) => `/${locale}${path}`;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="eyebrow">{t.h1}</div>
        <h1>{t.h1}</h1>
      </section>

      <section className={styles.block}>
        <h2>{t.whoTitle}</h2>
        <p>{t.whoText}</p>
      </section>

      <section className={styles.block}>
        <h2>{t.servicesTitle}</h2>
        <ul className={styles.list}>
          {t.services.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </section>

      <section className={styles.blockAlt}>
        <h2>{t.whyTitle}</h2>
        <p>{t.whyText}</p>
      </section>

      <section className={styles.block}>
        <h2>{t.fleetTitle}</h2>
        <p>{t.fleetText}</p>
        <Link href={p("/fleet")} className={styles.link}>{t.ctaFleet} →</Link>
      </section>

      <section className={styles.blockDark}>
        <h2>{t.airportTitle}</h2>
        <p>{t.airportText}</p>
      </section>

      <section className={styles.block}>
        <h2>{t.commitTitle}</h2>
        <p>{t.commitText}</p>
      </section>

      <section className={styles.ctaBlock}>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className={styles.ctaRow}>
          <a className="btnRed" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp →</a>
          <Link href={p("/booking")} className={styles.link}>{t.ctaBooking} →</Link>
        </div>
      </section>
    </main>
  );
}
