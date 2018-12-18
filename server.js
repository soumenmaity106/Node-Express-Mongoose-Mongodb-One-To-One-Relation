const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Configar database
const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

//Connecting to the database
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connect to mongodb")
    }
    )
    .catch(err => {
        console.log("Could not Connect to mongodb");
        process.exit()
    }
    )
//Customer route
require('./app/routes/customer.routes')(app);
//Product router
require('./app/routes/product.route')(app);

//Create a Server
const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port
    console.log("App listening at http://%:%s", host, port)
})