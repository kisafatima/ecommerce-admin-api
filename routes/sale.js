const Sale = require("../models/Sale")
const Product = require("../models/Product")
const router = require("express").Router()

//Add sale
router.post("/", async (req, res)=>{
    try{
        // Fetch product to get current price
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if enough stock is available
        if (product.stock < req.body.quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        let savedSale
        const unitPrice = product.price;
        const totalAmount = req.body.quantity * unitPrice;
        // Check if a sale already exists for this productId
        const existingSale = await Sale.findOne({ productId: req.body.productId });
        if (existingSale) {
            savedSale = await Sale.findOneAndUpdate(
                { productId: req.body.productId },
                {
                    $push: {
                        sale: {
                            quantity: req.body.quantity,
                            unitPrice: unitPrice,
                            totalAmount: totalAmount,
                            saleDate: req.body.saleDate ? new Date(req.body.saleDate) : new Date()
                        }
                    }
                },
                { new: true })
        } 
        else{
        // Create new sale
        const newSale = new Sale({
            productId: req.body.productId,
            sale: [
                {
                    quantity: req.body.quantity,
                    unitPrice: unitPrice,
                    totalAmount: totalAmount,
                    saleDate: new Date()
                }
            ]
        });
        savedSale = await newSale.save();

        //Update product stock
        await Product.findByIdAndUpdate(
            req.body.productId,
            { $inc: { stock: -req.body.quantity } }
        );
    }
        res.status(200).json(savedSale)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET Product Sales
router.get("/find/:productId", async (req, res)=>{
    try{
        const sales = await Sale.find({ productId: req.params.productId})
        res.status(200).json(sales)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET ALL => Sales of all products
router.get("/all", async (req, res)=>{
    try{
        const sales =  await Sale.find();
        res.status(200).json(sales)
    } catch(err){
        res.status(500).json(err)
    }
})



module.exports = router
