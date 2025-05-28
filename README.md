 # Ecommerce Admin API
The project is a backend api to power a web admin dashboard for e-commerce managers.

## Setup and Installation

### 1. Clone the repository:
`git clone `

### 2. Install dependencies
`npm install`

### 3. Set up environment variables:
Create a .env file in the project root.
Add your MongoDB URI and PORT as needed:
```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
```

### 4. Run the project
`npm start`

## Tech stack used:
**Programming Language**: Javascript

**Framework:** Node.js with Express.js
**Database:** MongoDB
**API:** RESTful API

## API Endpoints:
For detail description, check the example folder 

## Product Routes:
- **GET /api/product/add** 
Add a single new product to the database.

- **GET /api/product/add-multiple** 
Add multiple new products at once (batch insert).

- **GET /api/product/:id** 
Update an existing product’s details by its ID.

## Sale Endpoints:
- **GET /api/sale**
Add a new sale for a product. Checks stock and adjusts the product’s stock accordingly.

- **GET /api/sale/find/:productId**
Retrieve all sales for a specific product by its productId.

- **GET /api/sale/all/**
Retrieve all sales records for all products.

## Revenue Routes:

- **GET /api/revenue/daily**
Returns the total revenue and quantity for a specific day.
➜ Query parameters: year, month, day (optional, default: today).
➜ Example: /api/revenue/daily?year=2025&month=5&day=27

- **GET /api/revenue/weekly**
Returns the total revenue and quantity for a specific week of the year.
➜ Query parameters: year, week (optional, default: current week).
➜ Example: /api/revenue/weekly?year=2025&week=22

- **GET /api/revenue/monthly**
Returns the total revenue and quantity for a specific month of a given year.
➜ Query parameters: year, month (optional, default: current month).
➜ Example: /api/revenue/monthly?year=2025&month=5

- **GET /api/revenue/annual**
Returns the total revenue and quantity for a specific year.
➜ Query parameter: year (optional, default: current year).
➜ Example: /api/revenue/annual?year=2025

- **GET /api/revenue/by-product**
Returns the total quantity sold and total revenue for all products.

- **GET /api/revenue/by-product/:productId**
Returns the sales data for a specific product, identified by its productId.

- **GET /api/revenue/by-category**
Returns the total quantity sold and total revenue grouped by product category.

- **GET /api/revenue/by-category/:category**
Returns sales data for a specific category.

## Inventory Routes:

- **PATCH /api/inventory/update**
Updates the stock of a product by adding new inventory.
Returns a message confirming update, current inventory status (normal, low, or sufficient), and updated product details.

- **GET /api/inventory**
Retrieves inventory logs. Can optionally filter by product ID using a query parameter. Returns inventory records matching the query.
➜ Query parameters: productId (optional): string — to fetch inventory log for a specific product.


**NOTES**
The API uses MongoDB’s aggregation pipeline to calculate revenue and quantity sold.

productId in the Sale schema is stored as a string but converted to ObjectId during aggregation to enable $lookup joins with the Product collection.