const results = [];

for (const item of items) {
  
  let raw = item.json.output;

  // 🧠 1. string → JSON
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    continue;
  }

  const rec = parsed[0];
  if (!rec) continue;

  // 🧠 2. dodajemy też dane z wcześniejszego node
  results.push({
    json: {
      product: rec.product,

      // 
      depletionDate: item.json.data_konca,
      daysRemaining: item.json.dni_do_konca,

      // 
      depletion_status: rec.depletion_status,
      trend: rec.trend,
      trend_change_percent: rec.trend_change_percent,
      recommended_action: rec.recommended_action,
      sales_adjustment_percent: rec.sales_adjustment_percent,
      comment: rec.comment,
      confidence: rec.confidence
    }
  });
}

return results;
