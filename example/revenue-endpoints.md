**Get daily revenue**
- GET /api/revenue/daily
Returns the total revenue and quantity for a specific day.
➜ Query parameters: year, month, day (optional, default: today).
➜ Example: /api/revenue/daily?year=2025&month=5&day=27

**Get weekly revenue**
- GET /api/revenue/weekly
Returns the total revenue and quantity for a specific week of the year.
➜ Query parameters: year, week (optional, default: current week).
➜ Example: /api/revenue/weekly?year=2025&week=22

**Get monthly revenue**
- GET /api/revenue/monthly
Returns the total revenue and quantity for a specific month of a given year.
➜ Query parameters: year, month (optional, default: current month).
➜ Example: /api/revenue/monthly?year=2025&month=5

**Get annual revenue**
- GET /api/revenue/annual
Returns the total revenue and quantity for a specific year.
➜ Query parameter: year (optional, default: current year).
➜ Example: /api/revenue/annual?year=2025

**Get revenue by product**
- GET /api/revenue/by-product

- GET /api/revenue/by-product/:productId

**Get revenue by category**
- GET /api/revenue/by-category

- GET /api/revenue/by-category/:category