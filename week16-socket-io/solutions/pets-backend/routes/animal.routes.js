var express = require('express');
var router = express.Router();

//Require controller
var animalController = require('../controllers/animal.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the petshop api"});
});

// Create a new pet
router.post("/pets/", animalController.create);
 
// Retrieve all animals
router.get("/pets/", animalController.findAll);
 
// Retrieve a single pet with id
router.get("/pets/:id", animalController.findOne);
 
// Update a pet with id
router.put("/pets/:id", animalController.update);
 
// Delete a pet with id
router.delete("/pets/:id", animalController.delete);
 
// Delete all animals of the database
router.delete("/pets/", animalController.deleteAll);
 
module.exports = router;
