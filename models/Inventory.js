const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productTitle: { type: String, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    currentStock: { type: Number, required: true },
    status: { type: String, enum: ["low", "normal", "sufficient"], default: "normal" }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Inventory", InventorySchema);
