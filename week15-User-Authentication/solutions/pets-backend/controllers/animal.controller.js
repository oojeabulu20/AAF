const db = require("../models");
const Animal = db.animals;

var querystring = require("querystring");

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the petshop system");
    response.end();
};

// Create and Save a new Animal
exports.create = (req, res) => {
     // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a Animal model object
    const animal = new Animal({
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        colour: req.body.colour
    });
  
    // Save Animal in the database
    animal
        .save()
        .then(animalData => {
            console.log("Animal saved in the database: " + animalData);

            // Now update the user by creating the reference
            db.users.findByIdAndUpdate(
                req.body.userid,  //We assume userid is an attribute in the JSON
                { $push: { animals: animalData._id } },
                { new: true, useFindAndModify: false }
            ).then(userData => {
                console.log(`The updated user: ${userData}`);
                // Returning the new animal
                res.send(animalData);
            });
            
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the Animal."
            });
        });
};
 
// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Animal
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Animals."
            });
        });
};

// Find a single Animal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Animal.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Animal with id: " + id});
            else 
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: "Error retriving Animal with id: " + id});
        })
 
};
 
// Update a Animal by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Animal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Animal with id=${id}. Maybe Animal was not found!`
                });
            } else 
                res.send({ message: "Animal was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Animal with id=" + id
            });
        });
};
 
// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Animal.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
                });
            } else {
                res.send({
                    message: "Animal was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Animal with id=" + id
            });
        });

};
 
// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
    Animal.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Animals were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all animals."
            });
        });
};