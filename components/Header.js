"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header({ locale, dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const p = (path) => `/${locale}${path}`;

  const NAV = [
    { href: p(""), label: dict.nav.home },
    { href: p("/fleet"), label: dict.nav.fleet },
    { href: p("/about"), label: dict.nav.about },
    { href: p("/booking"), label: dict.nav.booking }
  ];

  // سكّر القائمة منين يتبدّل الرابط أو يتكبّر الشاشة
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 820) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // منع السكرول منين القائمة مفتوحة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link href={p("")} className={styles.logo} onClick={() => setOpen(false)}>
          <b>AGHEZOU</b>
          <small>LUX CAR</small>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={pathname === n.href ? styles.active : ""}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            className={styles.navCta}
            href={p("/booking")}
            onClick={() => setOpen(false)}
          >
            {dict.nav.cta}
          </Link>
        </nav>

        <Link className={styles.btn} href={p("/booking")}>
          {dict.nav.cta}
        </Link>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <i />
          <i />
          <i />
        </button>
      </div>

      {/* خلفية كتمة منين القائمة مفتوحة */}
      {open && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
