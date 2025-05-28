**Add a sale**
POST /api/sale
Body:
{
    "productId": "6834a5d85556fae67951ae24",
    "quantity": 68,
    "saleDate": "2025-01-30"    //optional
}

**Get a single product sale by productId**
GET /api/sale/find/:productId

**Get all products sales**
GET /api/sale/all/
