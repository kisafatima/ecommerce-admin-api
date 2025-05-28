const mongoose =  require("mongoose")

const SaleSchema = new mongoose.Schema(
    {
        productId: { type : String, required: true},
        sale: [
            {
                quantity: { type: Number, required: true},  //Number of items sold
                unitPrice: { type: Number, required: true}, // Price at time of sale
                totalAmount: { type: Number, required: true}, // quantity × unitPrice
                saleDate: { type: Date, required: true},
            }
        ],
    },
    {timestamps: true}
)

module.exports = mongoose.model("Sale", SaleSchema)
