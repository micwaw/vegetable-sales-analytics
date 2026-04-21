// === KONFIGURACJA PLONÓW ===
const harvestConfig = {
  "Marchew": 283000,
  "Seler": 40000,
  "Pietruszka": 142000,
  "Ziemniaki": 100000
};

// === POBRANIE DANYCH ===
const rows = items.map(i => i.json);

// === FUNKCJA: bezpieczna liczba ===
function num(val) {
  return val === "" || val === null || val === undefined ? 0 : Number(val);
}

// === CZYSZCZENIE + KONWERSJA ===
rows.forEach(r => {
  r.Marchew = num(r.Marchew);
  r.Marchew_Gruba = num(r.Marchew_Gruba);
  r.Marchew_Odpad = num(r.Marchew_Odpad);

  r.Seler = num(r.Seler);

  r.Pietruszka = num(r.Pietruszka);
  r.Pietruszka_Gruba = num(r.Pietruszka_Gruba);

  //  ziemniaki → kg
  r.potatoes_kg =
    num(r["Ziemniak [10kg w]"]) * 10 +
    num(r["Ziemniak [15kg w]"]) * 15 +
    num(r["Ziemniak Gruby"]) * 15;

  //  data (DD.MM.YYYY)
  const parts = r.Data.split(".");
  r.dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
});

// === SORTOWANIE ===
rows.sort((a, b) => a.dateObj - b.dateObj);

// === ZAKRES DNI ===
const firstDate = rows[0].dateObj;
const lastDate = rows[rows.length - 1].dateObj;

const daysRange = (lastDate - firstDate) / (1000 * 60 * 60 * 24);
const safeDays = daysRange > 0 ? daysRange : 1;

// === FUNKCJA TRENDU ===
function calculateTrend(product) {

  const lastDate = rows[rows.length - 1].dateObj;

  const last30 = rows.filter(r => (lastDate - r.dateObj) <= 30 * 86400000);
  const prev90 = rows.filter(r => {
    const diff = lastDate - r.dateObj;
    return diff > 30 * 86400000 && diff <= 120 * 86400000;
  });

  function getValue(r) {
    if (product === "Marchew") return r.Marchew;
    if (product === "Seler") return r.Seler;
    if (product === "Pietruszka") return r.Pietruszka;
    if (product === "Ziemniaki") return r.potatoes_kg;
    return 0;
  }

  function avg(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, r) => sum + getValue(r), 0) / arr.length;
  }

  const avg30 = avg(last30);
  const avg90 = avg(prev90);

  let change = 0;
  if (avg90 > 0) {
    change = ((avg30 - avg90) / avg90) * 100;
  }

  return {
    avg30: Math.round(avg30),
    avg90: Math.round(avg90),
    change: Math.round(change)
  };
}

// === ANALIZA ===
const results = [];

for (const product in harvestConfig) {

  let totalUsed = 0;

  rows.forEach(r => {

    // 🥕 MARCHEW
    if (product === "Marchew") {
      totalUsed += r.Marchew + r.Marchew_Gruba + r.Marchew_Odpad;
    }

    // 🌿 PIETRUSZKA 
    else if (product === "Pietruszka") {
      const waste = r.Pietruszka * 0.25;
      totalUsed += r.Pietruszka + r.Pietruszka_Gruba + waste;
    }

    // 🥔 ZIEMNIAKI
    else if (product === "Ziemniaki") {
      totalUsed += r.potatoes_kg;
    }

    // 🧄 SELER
    else {
      totalUsed += r.Seler;
    }
  });

  const harvest = harvestConfig[product];


  const remaining = Math.max(0, harvest - totalUsed);

  const avgDaily = totalUsed / safeDays;

  const daysLeft = avgDaily > 0 ? remaining / avgDaily : 0;

  // ✅ DATA OD OSTATNIEJ SPRZEDAŻY
  const depletionDate = new Date(lastDate);
  depletionDate.setDate(depletionDate.getDate() + daysLeft);

  const trend = calculateTrend(product);

  results.push({
    produkt: product,
    plon_kg: Math.round(harvest),
    zuzycie_kg: Math.round(totalUsed),
    pozostalo_kg: Math.round(remaining),
    srednia_dzienna_kg: Math.round(avgDaily),
    dni_do_konca: Math.round(daysLeft),
    data_konca: depletionDate.toISOString().split("T")[0],

    trend_30: trend.avg30,
    trend_90: trend.avg90,
    trend_change_percent: trend.change
  });
}

// === OUTPUT ===
return results.map(r => ({
  json: r
}));
