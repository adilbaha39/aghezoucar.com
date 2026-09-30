// ===== أسطول AGHEZOU LUX CAR =====
// status: "available" | "booked" | "unavailable"
// category: "Economique" | "SUV" | "Luxury"
// price = أيام عادية | priceSummer = الصيف/العطل
export const CARS = [
  { id: 1,  brand: "Renault",  model: "Clio 5",          transmission: "Automatique", fuel: "Essence", seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars1.jpeg" },
  { id: 2,  brand: "Renault",  model: "Clio 5",          transmission: "Manuelle",    fuel: "DIESEL",  seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars2.jpeg" },
  { id: 3,  brand: "Dacia",    model: "Logan",           transmission: "Manuelle",    fuel: "DIESEL",  seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars3.jpeg" },
  { id: 4,  brand: "Opel",     model: "Corsa",           transmission: "Manuelle",    fuel: "DIESEL",  seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars4.jpeg" },
  { id: 5,  brand: "Hyundai",  model: "Accent",          transmission: "Automatique", fuel: "Essence", seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars5.jpeg" },
  { id: 6,  brand: "Hyundai",  model: "i20",             transmission: "Automatique", fuel: "Essence", seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars6.jpeg" },
  { id: 7,  brand: "Hyundai",  model: "i10",             transmission: "Automatique", fuel: "Essence", seats: 4, luggage: 1, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars7.jpeg" },
  { id: 8,  brand: "Peugeot",  model: "208",             transmission: "Automatique", fuel: "Essence", seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars8.jpeg" },
  { id: 9,  brand: "Peugeot",  model: "208",             transmission: "Manuelle",    fuel: "DIESEL",  seats: 5, luggage: 2, price: 300,  priceSummer: 350,  status: "available", category: "Economique", image: "/images/cars9.jpeg" },
  { id: 10, brand: "Renault",  model: "Kardian",         transmission: "Automatique", fuel: "Essence", seats: 5, luggage: 3, price: 330,  priceSummer: 380,  status: "available", category: "SUV",        image: "/images/cars10.jpeg" },
  { id: 11, brand: "Renault",  model: "Kardian",         transmission: "Manuelle",    fuel: "DIESEL",  seats: 5, luggage: 3, price: 330,  priceSummer: 380,  status: "available", category: "SUV",        image: "/images/cars11.jpeg" },
  { id: 12, brand: "Kia",      model: "Sportage",        transmission: "Automatique", fuel: "DIESEL",  seats: 5, luggage: 3, price: 450,  priceSummer: 550,  status: "available", category: "SUV",        image: "/images/cars12.jpeg" },
  { id: 13, brand: "Hyundai",  model: "Tucson",          transmission: "Automatique", fuel: "DIESEL",  seats: 5, luggage: 3, price: 500,  priceSummer: 650,  status: "available", category: "SUV",        image: "/images/cars13.jpeg" },
  { id: 14, brand: "Renault",  model: "Arkana",          transmission: "Automatique", fuel: "Hybride", seats: 5, luggage: 3, price: 500,  priceSummer: 600,  status: "available", category: "SUV",        image: "/images/cars14.jpeg" },
  { id: 15, brand: "Volkswagen", model: "T-Roc / Golf 8.5", transmission: "Automatique", fuel: "DIESEL", seats: 5, luggage: 3, price: 700,  priceSummer: 850,  status: "available", category: "Luxury",     image: "/images/cars15.jpeg" },
  { id: 16, brand: "Volkswagen", model: "Touareg",       transmission: "Automatique", fuel: "DIESEL",  seats: 5, luggage: 4, price: 1500, priceSummer: 1800, status: "available", category: "Luxury",     image: "/images/cars16.jpeg" },
  { id: 17, brand: "Porsche",  model: "Porsche",         transmission: "Automatique", fuel: "Essence", seats: 4, luggage: 2, price: 2500, priceSummer: 3000, status: "available", category: "Luxury",     image: "/images/cars17.jpeg" },
  { id: 18, brand: "Land Rover", model: "Range Sport",  transmission: "Automatique", fuel: "DIESEL",  seats: 5, luggage: 4, price: 3300, priceSummer: 3800, status: "available", category: "Luxury",     image: "/images/cars18.jpeg" }
];

export function getCarById(id) {
  return CARS.find((c) => String(c.id) === String(id));
}

export function carLabel(c) {
  const trans = c.transmission === "Automatique" ? "أوتو" : "مانويل";
  return `${c.brand === "Porsche" ? "" : c.brand + " "}${c.model} ${trans} ${c.fuel}`.replace(/\s+/g, " ").trim();
}
