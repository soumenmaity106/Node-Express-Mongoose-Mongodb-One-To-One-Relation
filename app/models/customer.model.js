//const Product  = require('../models/product.model')
const mongoose = require("mongoose")
const CustomerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: { type: Number, min: 18, max: 64, required: true },
    product: {type:mongoose.Schema.Types.ObjectId, ref:"Product"}
})
module.exports = mongoose.model("Customer",CustomerSchema);