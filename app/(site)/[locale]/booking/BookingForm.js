"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CARS } from "@/lib/cars";
import { WA_NUMBER } from "@/lib/site";
import styles from "./booking.module.css";

export default function BookingForm({ t, categories, locale }) {
  const params = useSearchParams();
  const preselect = params.get("car");
  const [selected, setSelected] = useState(preselect ? +preselect : CARS[0]?.id);

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [returnLocation, setReturnLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (preselect) setSelected(+preselect);
  }, [preselect]);

  const car = CARS.find((c) => c.id === selected);
  const availableCars = CARS.filter((c) => c.status !== "unavailable");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return null;
    const d =
      Math.round(
        (new Date(returnDate) - new Date(pickupDate)) / 86400000
      ) + 1;
    return d > 0 ? d : null;
  }, [pickupDate, returnDate]);

  // تقدير بالثمن العادي — الصيف يُؤكد عبر واتساب
  const total = days && car ? days * car.price : null;

  const hours = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) =>
        String(i + 7).padStart(2, "0") + ":00"
      ),
    []
  );

  function isValidPhone(v) {
    const digits = String(v).replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15;
  }

  function carTitle(c) {
    if (!c) return "";
    const trans = c.transmission === "Automatique" ? "أوتو" : "مانويل";
    const name =
      c.brand === "Porsche" ? c.model : `${c.brand} ${c.model}`;
    return `${name} ${trans} ${c.fuel}`;
  }

  function confirm() {
    if (
      !car ||
      !pickupDate ||
      !returnDate ||
      !pickupLocation ||
      !returnLocation ||
      !name.trim() ||
      !phone.trim()
    ) {
      setErr(t.errRequired);
      return;
    }
    if (!days) {
      setErr(t.errDates);
      return;
    }
    if (!isValidPhone(phone)) {
      setErr(t.errPhone);
      return;
    }
    setErr("");

    const msg = [
      t.waGreeting,
      `• ${carTitle(car)}`,
      `• ${car.price} DH/${t.waDays} (normal) — ${car.priceSummer} DH/${t.waDays} (été)`,
      `• ${t.waPickup} : ${pickupDate} ${pickupTime} — ${pickupLocation}`,
      `• ${t.waReturn} : ${returnDate} ${returnTime} — ${returnLocation}`,
      `• ${t.waDuration} : ${days} ${t.waDays} — ${t.waTotal} : ~${total} DH`,
      `• ${t.waName} : ${name.trim()}`,
      `• ${t.waPhone} : ${phone.trim()}`,
      email.trim() ? `• ${t.waEmail} : ${email.trim()}` : null,
      notes.trim() ? `• ${t.waNotes} : ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div className={styles.book}>
      <div className={styles.panel}>
        <h2>{t.step1}</h2>
        <div className={styles.carGrid}>
          {availableCars.map((c) => (
            <button
              key={c.id}
              className={`${styles.carPick} ${selected === c.id ? styles.on : ""}`}
              onClick={() => setSelected(c.id)}
              type="button"
              disabled={c.status === "booked"}
            >
              <img src={c.image} alt={`${c.brand} ${c.model}`} />
              <b>
                {c.brand === "Porsche" ? c.model : `${c.brand} ${c.model}`}
              </b>
              <span>
                {c.price} / {c.priceSummer} DH
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.panel}>
        <h2>{t.step2}</h2>
        <div className={styles.row3}>
          <label>
            {t.pickupDate}
            <input
              type="date"
              value={pickupDate}
              min={today}
              onChange={(e) => {
                setPickupDate(e.target.value);
                if (returnDate && e.target.value > returnDate) {
                  setReturnDate("");
                }
              }}
            />
          </label>
          <label>
            {t.pickupTime}
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            >
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </label>
          <label>
            {t.pickupLocation}
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">{t.select}</option>
              {t.locOptions.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.row3}>
          <label>
            {t.returnDate}
            <input
              type="date"
              value={returnDate}
              min={pickupDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
          <label>
            {t.returnTime}
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
            >
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </label>
          <label>
            {t.returnLocation}
            <select
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
            >
              <option value="">{t.select}</option>
              {t.locOptions.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.panel}>
        <h2>{t.step3}</h2>
        <div className={styles.row2}>
          <label>
            {t.name}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePh}
              autoComplete="name"
            />
          </label>
          <label>
            {t.phone}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePh}
              type="tel"
              autoComplete="tel"
            />
          </label>
          <label>
            {t.email}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              type="email"
              autoComplete="email"
            />
          </label>
          <label>
            {t.notes}
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        </div>
      </div>

      <aside className={styles.summary}>
        <h3>{t.h1}</h3>
        {car && (
          <>
            <div className={styles.sRow}>
              <b>
                {car.brand === "Porsche"
                  ? car.model
                  : `${car.brand} ${car.model}`}
              </b>
              <span>
                {car.price} / {car.priceSummer} DH
              </span>
            </div>
            <div className={styles.sRow}>
              <span>{days ? `${days} ${t.waDays}` : "—"}</span>
            </div>
            <div className={styles.total}>
              <span>Total ~</span>
              <strong>{total ? `${total} DH` : "—"}</strong>
            </div>
          </>
        )}
        <button
          className="btnRed"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={confirm}
          type="button"
        >
          {t.confirm} →
        </button>
        {err && <p className={styles.err}>{err}</p>}
      </aside>
    </div>
  );
}
