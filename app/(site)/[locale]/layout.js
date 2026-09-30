import "../../globals.css";
import { LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangSwitcher from "@/components/LangSwitcher";
import { WA_NUMBER, SITE_URL as SITE_URL_ENV } from "@/lib/site";

const SITE_URL = SITE_URL_ENV;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.home.title,
    description: dict.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", ar: "/ar" }
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "AGHEZOU LUX CAR",
      images: [`${SITE_URL}/images/og-cover.jpg`],
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_FR",
      type: "website"
    },
    twitter: { card: "summary_large_image", title: dict.home.title, description: dict.home.description }
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const dict = await getDictionary(locale);
  const dir = dict.dir;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "AGHEZOU LUX CAR",
    image: `${SITE_URL}/images/logo.jpeg`,
    url: SITE_URL,
    telephone: `+${WA_NUMBER}`,
    areaServed: [{ "@type": "City", name: "Casablanca" }, { "@type": "Airport", name: "Mohammed V International Airport" }],
    email: "aghezou.car@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Magasin 181 RDC Imm 8 Lotissement Kenzi Deroua Berrchid",
      addressLocality: "Deroua",
      addressCountry: "MA"
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00", closes: "23:59"
    }
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        {locale === "ar" && (
          <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={dir === "rtl" ? "rtl" : ""}>
        <Header locale={locale} dict={dict} />
        {children}
        <Footer locale={locale} dict={dict} />
        <LangSwitcher locale={locale} />
      </body>
    </html>
  );
}
