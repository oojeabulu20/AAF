# Week 10 - Mongoose Model Associations

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/week10-Mongoose-Model-Associations/).

## 1. Introduction

In this lab we are going to add a new model to our petshop application exploring mongoose associations.
You will begin by creating a new `User` model, controllers and routers in the back-end application, and then move on to update your front-end to deal with these new models.
This considers that you have finished with the last lab exercises and have a front-end with the technology of your choice and a back-end with mongoose models to start with.

In these instructions we'll use the sample solution from the previous lab as starting point. Make sure to adapt the instruction to reflect your own code.

Make sure your application is working before starting.

- Mongodb database pointing to the correct `dbpath`.
- Back-end ready to go - `nodemon start` (don't forget to run `npm update` and `npm install` if you are using one of the sample solutions).
- Front-end ready to go (React or vue).

We also recommend the use of an API testing tool, e.g., Postman, SoapUI or cURL.

## 2. Adding user model to the back-end

As mentioned before, make sure your project is ready to go with all the necessary dependencies installed.

### 2.1. The User model

Start by adding creating a new file in the back-end `models` folder (`user.model.js`):

```javascript
module.exports = mongoose => {
    var User = mongoose.model(
        "user",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            animals: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "animal"
            }],
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  }
        
        })

    );
    return User;
};
```

Notice the attribute `animals` is a reference to the `animal` model created previously and that its type is `ObjectId`.

Now add the new model to the `models/index.js` file, so it can be used by the rest of the application.

```javascript
//...
db.users = require("./user.model.js")(mongoose);
//...
```

### 2.2. The User controller

Now create a new file called `user.controller.js` inside the `controllers` folder.
Use the code below as a reference to start working on it.

```javascript
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
```

Remember to complete the other methods of the controller.

### 2.3. Routing the user handling code

Now we have to update our routes to include the newly created controller. Within the `routes` folder of your project, create a file named `user.routes.js` with the following content:

```javascript
var express = require('express');
var router = express.Router();
 
//Require controller
var userController = require('../controllers/user.controller');
 
router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the user management subsystem api."});
});

// Create a new user
router.post("/users/", userController.create);
 
// Retrieve all users
router.get("/users/", userController.findAll);
 
// Retrieve a single user with id
router.get("/users/:id", userController.findOne);
 
// Update a user with id
router.put("/users/:id", userController.update);
 
// Delete a user with id
router.delete("/users/:id", userController.delete);
 
// Delete all users of the database
router.delete("/users/", userController.deleteAll);
 
module.exports = router;
```

### 2.4. Putting it all together

Now you have to add your newly created router and controller to your main `app.js` file.

Import the new router with:

```javascript
//...
var userRouter = require('./routes/user.routes');
//...
```

Then configure it to handle the `/users` path:

```javascript
//...
app.use('/users', userRouter);
//...
```

Save your work, start the backend server (don't forget your database) and try to make a few calls to the following URLs using your browser:

- <http://localhost:3050/users>
- <http://localhost:3050/users/users>
- <http://localhost:3050/petshop/users>

What is the expected output to each one of these calls?
What is the obtained output? Why? Write down an explanation of what is happening.

Can you create a few users using the `mongo` command line client? Does it change your expected and obtained responses?
Try to create a new `user` using postman or any other REST client.

## 3. Creating a Front-end for User management

Now you can modify your front-end to include pages for managing users.
Use the pages created for managing Pet as reference (those have been started in week 08 and should be ready by now).
Remember that now your front-end has two different endpoints to consider (`/petshop/pets` and `/users/users`).

The sample solution for vue includes a simple User management interface that can be used as reference.

## 4. Exploring the association

Now we need to modify our code to consider the model association between `Uses` and `Animals`.

### 4.1. Modifying the back-end

We'll start by modifying our back-end to always expect an ID for a `User` when creating a new `Animal`.
This will require a change in the `create` method of the `animal.controller.js`.

The first modification is to consider that the JSON sent as part of the request include a new attribute to indicate the `ObjectID` of the `User` that is creating the animal.
This also assumes that a user with the specified ID already exists in the database. 

Modify the block of code that deals with the database manipulation in your `create` method based on the example below:

```javascript
...
    // Save Animal in the database
    animal
        .save()
        .then(animalData => {
            console.log("Animal saved in the database: " + animalData);

            // Now update the user by adding the association
            db.User.findByIdAndUpdate(
                req.body.userid, //We assume userid is an attribute in the JSON
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
```

Notice how we update the `User` in the database after creating the `Animal`.

You are able to test it using Postman or your favorite API testing tool.
For example, assuming that the following user exists in your database:

```json
{ 
  "_id":"619cd08b3a96796911b757b6", 
  "username":"user1",
  "animals":[],
  "dateCreated":"2021-11-23T11:29:15.187Z",
  "__v":0
}
```

You can create a new animal by including the `userid` attribute in your JSON request, for example,

```json
{
  "userid":"619cd08b3a96796911b757b6", 
  "name":"Scooby Doo2", 
  "species":"Doggie", 
  "breed":"Great Dane", 
  "age":"51", 
  "colour":"Browinsh with pink spots"
}
```

For your reference, this is the command to create the animal described above using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"userid":"619cd08b3a96796911b757b6", "name":"Scooby Doo2", "species":"Doggie", "breed":"Great Dane", "age":"51", "colour":"Browinsh with pink spots"}' http://localhost:3050/petshop/pets
```

By now you should have your back-end working fine and be able to create new users and animals while maintaining the association between users and animals models.

One thing to notice is that the list of users will contain an array of animals id.
It is up to you to perform a second call to the database to populate this information.
This can be done directly in the back-end when retrieving your user or from the front-end by explicitly making calls to the back-end to retrieve the corresponding animals.

### 4.2. Modifying the front-end

Now you need to modify your front-end.
More specifically, the form used to create a new `Animal` now must include a reference (ObjectID) of the `User` that owns the animal.

A quick and dirt hack would be to simply create a new field in the form for the `userid` and to ask the user to populate this manually.
This requires the ability to list the available users in order to copy its id.
This was the approach adopted in the sample front-end solutions (vue).

A more elegant solution would be to populate the `userid` based on a previous database search. Either by coming from the `list users` page with the selected id, or by listing the available users in a select box.

You are free to explore these and any other solution you see fit for this.

## 5. Exercises

1. Finish the implementation of the retrieve and update operations with the `User` model (both back-end and front-end using your chosen technology).
2. Modify your front-end so the creation of new animals does not require manual entry of the user id. 
  - Tip: Use a select box populated when the form if first loaded to allow the selection of the user.
3. Finish the implementation of the CRUD operations for the `Animals` model (now considering the use of model associations).
4. Implement the deletion of `Users`. Consider how to deal with `User` deletion.
5. Reflect on the new API provided by your back-end. Does it follow the best practices? How would you change it so `/petshop` is the first part of the application endpoint and the different models follow from it (e.g., `/petshop/pets` and `/petshop/users`).

## References and extra reading

- Bezkoder tutorials - <https://www.bezkoder.com/mongoose-one-to-many-relationship/>
- <https://www.linkedin.com/learning/mern-essential-training>
- <https://www.pluralsight.com/courses/react-express-full-stack-app-building>
