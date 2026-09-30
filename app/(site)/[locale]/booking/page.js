import { getDictionary } from "@/lib/i18n/config";
import { Suspense } from "react";
import BookingForm from "./BookingForm";
import styles from "./booking.module.css";

export async function generateMetadata({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return { title: dict.booking.title, description: dict.booking.description, alternates: { canonical: `/${locale}/booking` } };
}

export default async function BookingPage({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="eyebrow">{dict.booking.h1}</div>
        <h1>{dict.booking.h1}</h1>
        <p>{dict.booking.sub}</p>
      </section>
      <Suspense fallback={null}>
        <BookingForm t={dict.booking} categories={dict.categories} locale={locale} />
      </Suspense>
    </main>
  );
}
