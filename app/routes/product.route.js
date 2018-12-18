
module.exports = function (app) {
    const product = require('../controllers/product.controller')
    const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //Reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
})

    // Create new Customer
    app.post('/api/products', upload.single('productImage'), product.create)

    // Retrive all Customer
    app.get('/api/products', product.findAll);

    // Retrive a singel Customer by id
    app.get('/api/products/:productId', product.findOne)

    // Update a customer with id
    app.put('/api/products/:productId', product.update);

    //Delete a customer with id
    app.delete('/api/products/:productId', product.delete)
}