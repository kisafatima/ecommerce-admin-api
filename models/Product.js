const mongoose =  require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type : String, required: true, unique: true},
        desc: {type : String, required: true},
        img: {type: String, required: true},
        category: {type: String},
        size: {type: String, required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
       
    },
    {timestamps: true}
)


module.exports = mongoose.model("Product", ProductSchema)
