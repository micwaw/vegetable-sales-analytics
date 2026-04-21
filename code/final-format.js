const results = [];

for (const item of items) {

  results.push({
    json: {
      product: item.json.product || item.json.produkt,

      //  kluczowe liczby
      plon_kg: item.json.plon_kg,
      zuzycie_kg: item.json.zuzycie_kg,

      //  czas
      daysRemaining: item.json.dni_do_konca,
      depletionDate: item.json.data_konca,

      //  trend
      trend: item.json.trend,
      trend_change_percent: item.json.trend_change_percent,

      //  decyzja AI
      recommended_action: item.json.recommended_action,
      sales_adjustment_percent: item.json.sales_adjustment_percent,

      //  dodatkowe
      confidence: item.json.confidence,

      //  priorytet
      urgency: item.json.dni_do_konca < 60 ? "HIGH" :
               item.json.dni_do_konca < 120 ? "MEDIUM" : "LOW",
// 🎯 dodatkowe
      comment: item.json.comment
      
    }
  });
}

return results;
