"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { CARS } from "@/lib/cars";
import styles from "./fleet.module.css";

export default function FleetFilters({ locale, t, categories, specs, status }) {
  const [cat, setCat] = useState("all");
  const [sortBy, setSortBy] = useState("asc");

  const list = useMemo(() => {
    let l = CARS.filter((c) => c.status !== "unavailable").filter(
      (c) => cat === "all" || c.category === cat
    );
    if (sortBy === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sortBy === "desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sortBy]);

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.tabs}>
          {["all", "Economique", "SUV", "Luxury"].map((c) => (
            <button
              key={c}
              className={cat === c ? styles.on : ""}
              onClick={() => setCat(c)}
            >
              {c === "all" ? categories.all : categories[c]}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="asc">{t.sortAsc}</option>
          <option value="desc">{t.sortDesc}</option>
        </select>
      </div>

      <div className={styles.grid}>
        {list.length === 0 && <p className={styles.empty}>{t.empty}</p>}
        {list.map((c) => (
          <article key={c.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img
                src={c.image}
                alt={`${c.brand} ${c.model} — AGHEZOU LUX CAR`}
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <div className={styles.top}>
                <h3>
                  {c.brand === "Porsche" ? c.model : `${c.brand} ${c.model}`}
                </h3>
                <span className={styles.badge}>
                  {c.transmission === "Automatique" ? specs.auto : specs.manual}
                </span>
              </div>
              <p className={styles.meta}>
                ⛽ {c.fuel} · {c.seats} {specs.seats}
              </p>
              <div className={styles.prices}>
                <div>
                  <small>{specs.normalDays}</small>
                  <strong>{c.price} DH</strong>
                </div>
                <div>
                  <small>{specs.summerDays}</small>
                  <strong>{c.priceSummer} DH</strong>
                </div>
              </div>
              <Link
                href={`/${locale}/booking?car=${c.id}`}
                className={styles.book}
              >
                {t.book} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
