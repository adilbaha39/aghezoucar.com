"use client";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import styles from "./LangSwitcher.module.css";

const LABEL = { fr: "FR", en: "EN", ar: "عربية" };

export default function LangSwitcher({ locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(l) {
    document.cookie = `locale=${l}; path=/; max-age=31536000`;
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${l}${rest ? "/" + rest : ""}`);
  }

  return (
    <div className={styles.wrap}>
      {LOCALES.map((l) => (
        <button key={l} className={l === locale ? styles.on : ""} onClick={() => switchTo(l)}>
          {LABEL[l]}
        </button>
      ))}
    </div>
  );
}
