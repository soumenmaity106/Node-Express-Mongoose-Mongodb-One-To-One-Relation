const Customer = require('../models/customer.model');
const Product = require('../models/product.model');

//Post a Customer
exports.create = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Not found Product"
                });
                //process.exit()                
            }
            const coustomer = new Customer({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                product: req.body.productId
            })
            //Save Customer in a mongodb
            return coustomer.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                })

        })
    //Create a customer
    // const customer = new Customer({
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname,
    //     age:req.body.age,
    //     product:req.body.product

    // })
    //Save Customer in a mongodb
    //customer.save()
    // .then(data=>{
    //     res.send(data)
    // })
    // .catch(err=>{
    //     res.status(500).send({
    //         message:err.message
    //     })
    // })
}
// Fatch all Customer
exports.findAll = (req, res) => {
    Customer.find()
        .populate('product')
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.status(500).send({
                massage: err.message
            })
        })
}

//Find a customer
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer Not Found With id" + req.params.customerId
                })
            }
            res.send(customer)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Customer Not Found With id" + req.params.customerId
                })
            }
            return res.status(500).send({
                message: "Error retrieving Found With id" + req.params.customerId
            })
        })
}
//UPDATE Customer
exports.update = (req, res) => {
    //Find Customer and update
    Customer.findByIdAndUpdate(req.params.customerId, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    }, { new: true })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id" + req.params.customerId
                })
            }
            res.send(customer)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Customer not found with id" + req.params.customerId
                })
            }
            return res.status(500).send({
                message: "Error updating customer with id" + req.params.customerId
            })
        })

}
//Delete a customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
        .then(customer => {
            if (!customer) {
                return res.status(404).send({
                    message: "Customer not found with id" + req.params.customerId
                })
            }
            res.send({ message: "Customer Delete Successfully" })
        })
        .catch(err => {
            if (!err) {
                return res.status(404).send({
                    message: "Customer not found with id" + req.params.customerId
                })
            }
            return res.status(500).send({
                message: "Error updating customer with id" + req.params.customerId
            })
        })
}
