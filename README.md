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
[
  {
    "product": "Carrot",
    "remaining_kg": 35980,
    "days_remaining": 32,
    "trend": "increasing",
    "recommended_action": "slow down sales",
    "sales_adjustment_percent": -28.5,
    "urgency": "HIGH"
  }
]
