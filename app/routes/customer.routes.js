module.exports = function (app) {
    const customers = require('../controllers/customer.controller');

    // Create new Customer
    app.post('/api/customers', customers.create)

    // Retrive all Customer
    app.get('/api/customers', customers.findAll);

    // Retrive a singel Customer by id
    app.get('/api/customers/:customerId', customers.findOne)

    // Update a customer with id
    app.put('/api/customers/:customerId', customers.update);

    //Delete a customer with id
    app.delete('/api/customers/:customerId', customers.delete)
}