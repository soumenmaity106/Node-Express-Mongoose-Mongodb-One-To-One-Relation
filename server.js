const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;


//Configar database
const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

//Connecting to the database
const uri = "mongodb+srv://soumenmaity:Patibunia@556@mongodb-test-jqk0g.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices")
  if(collection){
      console.log('Connect Database')
  }else{
      console.log('data base connect faild')
  }
 
 // perform actions on the collection object
  client.close();
});
//Morgan
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

// Routes which should handle requests
require('./app/routes/customer.routes')(app);
//Product router
require('./app/routes/product.route')(app);

// Routes Should not handel request
app.use((req,res,next)=>{
    const error  = new Error("Not Found");
    error.status = 404;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message:error.message
    })
})

//Create a Server
const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port
    console.log("App listening at http://%:%s", host, port)
})