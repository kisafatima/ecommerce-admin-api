const Product = require("../models/Product")
const router = require("express").Router()

//Add a product
router.post("/add", async (req, res)=>{
    const newProduct =  new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch(err){
        res.status(500).json(err)
    }
})

//Add multiple products
router.post("/add-multiple", async (req, res) => {
  try {
    const products = req.body;
    const savedProducts = await Product.insertMany(products);
    res.status(201).json(savedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE product e.g. price / stock / desc
router.put("/:id", async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
            $set : req.body
        }, {new: true})
        res.status(200).json(updatedProduct)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
