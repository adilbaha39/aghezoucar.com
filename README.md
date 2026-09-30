# AGHEZOU LUX CAR — Next.js (FR / AR / EN)

موقع كراء سيارات فاخرة واقتصادية — مطار محمد الخامس، الدار البيضاء.
4 صفحات، 3 لغات، بلا Backend: السيارات فـ `lib/cars.js`، الحجز عبر واتساب.

## الإعداد
```
cp .env.local.example .env.local
```
- `NEXT_PUBLIC_WA_NUMBER=212600967655`
- `NEXT_PUBLIC_SITE_URL=https://votredomaine.ma`

```
npm install
npm run dev
```

## السيارات
`lib/cars.js` — 18 سيارة (اقتصادية / متوسطة / فاخرة) مع ثمن عادي + صيف.
الصور: `public/images/cars1.jpeg` … `cars18.jpeg` + `logo.jpeg`

## الصفحات
- `/` الرئيسية — Hero، لماذا تختارنا، المطار، معاينة الأسطول، كيفاش تحجز، FAQ
- `/fleet` الأسطول — فلترة (اقتصادية / متوسطة / فاخرة) + ترتيب بالثمن
- `/booking` الحجز — فورم → رسالة واتساب متعددة اللغات
- `/about` من نحن — خدمات، دفع، عنوان دروا، تواصل

## معلومات الوكالة
- **الاسم:** AGHEZOU LUX CAR
- **واتساب:** +212 600-967655
- **إيميل:** aghezou.car@gmail.com
- **عنوان:** Magasin 181 RDC Imm 8 Lotissement Kenzi Deroua Berrchid
- **Instagram:** @rental_car_a81
- **TikTok:** @aghezou.rent.car
- **دفع:** CASH · TPE · CHEQUE · PAYPAL · VIREMENT INSTANTANÉ
- **شروط:** كيلومتراج غير محدود · أقل سن 22 سنة · 24/7

## الترجمة
`lib/i18n/dictionaries/{fr,en,ar}.json`
