var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'petshopdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of pets to show that we're up and running
router.get('/pet', function(req, res, next) {
    //Getting list of animals from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('animals');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving Animals." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new pet to the db
router.post('/pet', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { name: req.body.name, 
               species: req.body.species, 
               breed: req.body.breed, 
               age: req.body.age, 
               colour: req.body.colour };

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('animals');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the animal."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /pet
router.put('/pet', function (req, res) {
 res.send('Got a PUT request at /pet');
});
 
 
// accept DELETE request at /pet
router.delete('/pet', function (req, res) {
 res.send('Got a DELETE request at /pet');
});
 
module.exports = router;
