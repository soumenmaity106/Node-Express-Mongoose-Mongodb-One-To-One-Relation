const Customer = require('../models/customer.model');
const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:String,
    details: String,
    price: Number,
    productImage: { type: String, required: true }
})
module.exports = mongoose.model("Product",productSchema)