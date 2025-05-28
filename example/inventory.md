**Add/Update stock by adding new inventory**
POST /api/inventory/update
Body:
{
    "productId": "6834a5d85556fae67951ae24",
    "newStock": 5
}

**Get all inventory logs**
GET /api/inventory/

**Get inventory logs for a specific product**
GET api/inventory?productId=6834a5d85556fae67951ae24