const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoute = require("./routes/product")
const saleRoute = require("./routes/sale")
const revenueRoutes = require("./routes/revenue");
const inventoryRoutes = require("./routes/inventory");

// const inventoryRoute = require("./routes/inventory")


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("DBConnection Succesful!"))
    .catch(
        (err)=>console.log(err)
    );
    
app.use(express.json())
app.use("/api/product", productRoute);
app.use("/api/sale", saleRoute);
app.use("/api/revenue", revenueRoutes);
app.use("/api/inventory", inventoryRoutes);

// app.use("/api/inventory", inventoryRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!")
})