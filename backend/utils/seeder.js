const Product = require('../models/productModel');
const products = require('../data/products.json');
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require("../config/database")

dotenv.config({path:'backend/config/config.env'})
connectDatabase();

const seedProducts =async () => {
    try {
        await Product.deleteMany();
        console.log("All products deleted!");
        await Product.insertMany(products);
        console.log("All products added!");
    } catch (error) {
        console.log(error, "in seedProducts");
    }
    process.exit()
}

seedProducts();