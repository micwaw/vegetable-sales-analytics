# vegetable-sales-analytics
Automated inventory optimization and sales analysis system with AI recommendations based on real sales data.

## 📌 Overview

This project is an automated analytics system built using **n8n**, **JavaScript**, and an **AI Agent** to monitor sales performance and predict stock depletion.

It helps answer key business questions:
- When will a product run out?
- Are we selling too fast or too slow?
- How should we adjust sales to meet target dates?

---

## ⚙️ Features

-  **Inventory tracking**
  - Calculates total stock, usage, and remaining quantity

-  **Sales analysis**
  - Computes average daily sales
  - Compares trends (last 30 days vs previous 90 days)

-  **Depletion forecasting**
  - Predicts when each product will run out
  - Calculates days remaining

-  **Target-based optimization**
  - Compares current depletion vs target dates
  - Calculates required sales adjustment (%)

-  **AI recommendations**
  - Determines if sales are too fast / too slow
  - Suggests actions (increase / decrease sales)
  - Assigns urgency level (LOW / MEDIUM / HIGH)

---

##  Example Output

```json
 
{
"product": "Marchew",
"trend": "increasing",
"trend_change_percent": 49,
"recommended_action": "Reduce daily outflow to ~800 kg/day (~-28.49%) via promotions, transfer excess stock to other channels, or slow incoming deliveries; monitor sales weekly.",
"sales_adjustment_percent": -28.49,
"confidence": "high",
"plon_kg": 283000,
"zuzycie_kg": 247020,
"depletionDate": "2026-05-21",
"daysRemaining": 32,
"urgency": "HIGH",
"comment": "With 35,980 kg remaining and current pace, stock will deplete in 32 days vs 45 days needed to hit target — accelerate mitigation immediately."
}
