const Product = require('../models/product.model');


//Post Product
exports.create = (req, res, next) => {
    //Create Product
    const product = new Product({
        name: req.body.name,
        details: req.body.details,
        price: req.body.price,
        productImage: req.file.path
    })
    //Save Product
    product.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message

            })
        })

}

//Fatch all Product

exports.findAll = (req, res) => {
    Product.find()
        .then(product => {
            res.send(product)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

//Find a product 
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with Id" + req.params.productId
                })
            }
            res.send(product)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with Id" + req.params.productId
                })
            }
            return res.status(500).send({
                message: "Error  retrieving Customer with Id" + req.params.productId
            })
        })
}

// Update Product
exports.update = (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        details: req.body.details,
        price: req.body.price
    }, { new: true })
        .then(
            product => {
                if (!product) {
                    return res.status(404).send({
                        message: "Product not found with Id" + req.params.productId
                    })
                }
                res.send(product)
            }
        )
        .catch(
            err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Product not found with Id" + req.params.productId
                    })
                }
                return res.status(500).send({
                    message: "Error  retrieving Customer with Id" + req.params.productId
                })
            }
        )
}

//Product Delete
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(
            product => {
                if (!product) {
                    return res.status(404).send({
                        message: "Product not found with Id" + req.params.productId
                    })
                }
                res.send("Product Delete Successfully")
            }

        )
        .catch(
            err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Product not found with Id" + req.params.productId
                    })
                }
                return res.status(500).send({
                    message: "Error  retrieving Customer with Id" + req.params.productId
                })
            }
        )
}