const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

// Update stock - add inventory
router.patch("/update", async (req, res) => {
  try {
    const { productId, newStock } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const previousStock = product.stock;
    const currentStock = previousStock + newStock;

    // Update product stock
    product.stock = currentStock;
    await product.save();

     // Determine status
    let status = "normal";
    if (currentStock <= 10) status = "low";
    else if (currentStock > 100) status = "sufficient";

    const inventoryLog = {
      productId,
      productTitle: product.title,
      previousStock,
      newStock,
      currentStock,
      status,
    }
    const existingInventory = await Inventory.findOne({ productId: productId });
    if (existingInventory) {
            savedInventory = await Inventory.findOneAndUpdate(
            { productId: productId },
                {
                    $set: inventoryLog
                },
                { new: true })
    } else{
        const savedInventory = new Inventory(inventoryLog);
        await savedInventory.save();
    } 

    res.status(200).json({
      message: "Inventory updated successfully",
      inventoryStatus: status,
      product: {
        id: product._id,
        title: product.title,
        stock: product.stock,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET inventory; can provide productId for a specific product inventory log 
router.get("/", async (req, res) => {
  try {
    const { productId } = req.query;

    let query = {};
    if (productId) {
      query = { productId: productId };
    }

    // Fetch products with their current stock
    const inventory = await Inventory.find(query);
    
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
