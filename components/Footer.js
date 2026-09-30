import Link from "next/link";
import { formatPhone, WA_NUMBER } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer({ locale, dict }) {
  const p = (path) => `/${locale}${path}`;
  const phoneDisplay = formatPhone(WA_NUMBER);
  const email = dict.footer.email || "aghezou.car@gmail.com";
  const address =
    dict.footer.address ||
    "Magasin 181 RDC Imm 8 Lotissement Kenzi Deroua Berrchid";

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div>
            <Link href={p("")} className={styles.logo}>
              <b>AGHEZOU</b>
              <small>LUX CAR</small>
            </Link>
            <p className={styles.tag}>
              {dict.footer.tag}
              <br />
              {dict.footer.tag2}
            </p>
          </div>
          <div>
            <h4>{dict.footer.links}</h4>
            <ul>
              <li>
                <Link href={p("")}>{dict.nav.home}</Link>
              </li>
              <li>
                <Link href={p("/fleet")}>{dict.nav.fleet}</Link>
              </li>
              <li>
                <Link href={p("/about")}>{dict.nav.about}</Link>
              </li>
              <li>
                <Link href={p("/booking")}>{dict.nav.booking}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{dict.footer.contact}</h4>
            <ul>
              <li>
                <a href={`https://wa.me/${WA_NUMBER}`}>{phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>{address}</li>
            </ul>
          </div>
          <div>
            <h4>{dict.footer.hours}</h4>
            <ul>
              <li>
                <a
                  href="https://instagram.com/rental_car_a81"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram @rental_car_a81
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@aghezou.rent.car"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TikTok @aghezou.rent.car
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copy}>
          <span>
            © {new Date().getFullYear()} AGHEZOU LUX CAR. {dict.footer.rights}
          </span>
          <span>AGHEZOU LUX CAR — Casablanca</span>
        </div>
      </div>
    </footer>
  );
}
