import { getDictionary } from "@/lib/i18n/config";
import { CARS } from "@/lib/cars";
import Link from "next/link";
import { waLink } from "@/lib/site";
import styles from "./page.module.css";

export default async function HomePage({ params: { locale } }) {
  const dict = await getDictionary(locale);
  const t = dict.home;
  const p = (path) => `/${locale}${path}`;
  const cars = CARS.filter((c) => c.status !== "unavailable").slice(0, 5);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className="eyebrow">{t.heroEyebrow}</div>
          <h1>{t.h1}</h1>
          <p>{t.heroSub}</p>
          <Link className="btnRed" href={p("/booking")}>{t.heroCta} →</Link>
        </div>
      </section>

      {/* INTRO (keyword-rich) */}
      <section className={styles.intro}>
        <h2>{t.introTitle}</h2>
        <p>{t.introText}</p>
      </section>

      {/* WHY */}
      <section className={styles.why}>
        <h2>{t.whyTitle}</h2>
        <div className={styles.feats}>
          {t.features.map((f, i) => (
            <div key={i}><b>{f.t}</b><small>{f.d}</small></div>
          ))}
        </div>
      </section>

      {/* AIRPORT */}
      <section className={styles.airport}>
        <h2>{t.airportTitle}</h2>
        <p>{t.airportText}</p>
      </section>

      {/* FLEET PREVIEW */}
      <section className={styles.fleet}>
        <div className={styles.fleetHead}>
          <h2>{t.fleetPreviewTitle}</h2>
          <Link href={p("/fleet")} className={styles.more}>{t.seeAllFleet} →</Link>
        </div>
        <div className={styles.cards}>
          {cars.map((c) => (
            <Link key={c.id} href={p(`/booking?car=${c.id}`)} className={styles.card}>
              <div className={styles.ph}>
                <span className={styles.price}>{c.price} DH</span>
                <img src={c.image} alt={`${c.brand} ${c.model} — AGHEZOU LUX CAR`} loading="lazy" />
              </div>
              <div className={styles.meta}>
                <h3>{c.brand} {c.model}</h3>
                <div className={styles.yr}>{c.price} DH</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW TO BOOK */}
      <section className={styles.steps}>
        <h2>{t.howTitle}</h2>
        <div className={styles.stepRow}>
          {t.steps.map((s, i) => (
            <div key={i}><b>{String(i + 1).padStart(2, "0")}</b> {s.t}</div>
          ))}
          <Link href={p("/booking")} className="btnRed">{t.heroCta} →</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2>{t.faqTitle}</h2>
        {t.faq.map((f, i) => (
          <details key={i} className={styles.faqItem}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.ctaFinal}>
        <h2>{t.ctaTitle}</h2>
        <a className="btnRed" href={waLink()} target="_blank" rel="noopener noreferrer">{t.ctaBtn} →</a>
      </section>
    </main>
  );
}

export async function generateMetadata({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return { title: dict.home.title, description: dict.home.description, alternates: { canonical: `/${locale}` } };
}
