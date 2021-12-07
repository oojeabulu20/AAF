const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
     // Validate request
    if (!req.body.username) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create an User model object
    const user = new User({
        username: req.body.username
    });
  
    // Save User in the database
    user
        .save()
        .then(data => {
            console.log("User saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    //We use req.query.name to get query string from the Request and consider it as condition for findAll() method.
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    User
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single USer with an id
exports.findOne = (req, res) => {
 
};
 
// Update a User by the id in the request
exports.update = (req, res) => {
 
};
 
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
 
};
 
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
 
};