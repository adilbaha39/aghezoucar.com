"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link href={p("")} className={styles.logo}>
          <img
            src="/images/logo.jpeg"
            alt="AGHEZOU LUX CAR"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div>
            <b>AGHEZOU</b>
            <small>LUX CAR</small>
          </div>
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
        </nav>

        <Link className={styles.btn} href={p("/booking")}>
          {dict.nav.cta}
        </Link>

        <button
          className={styles.burger}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
