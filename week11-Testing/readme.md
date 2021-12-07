# Week 11 - Testing

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/week11-Testing/).

## 1. Introduction

In this lab we are going to modify the backend of the existing petshop application to use Mocha for testing. 
You should use your own code as starting point (or last week's sample solution if your code is not ready to go).
Make sure to adapt the instruction to reflect your own code.

## 2. Set-up and initialising

The first thing you need to do is to make sure you are able to run your code.
At this point you should have a mongodb database server, an express backend application and a vue (react) frontend application. 

You should be able to perform manual tests in your application, or to use postman (or cURL) to send http requests to the backend.

## 3. Installing the modules

Let’s now start with installing the modules needed to create our tests.
We are going to use mocha and chai modules. Run the following command in the folder of your backend project.

```bash
npm install mocha chai chai-http --save-dev
```

This will install the modules but only mark them to be used at development time.

## 4. Testing GET at the root of the backend

Now create a test directory inside your backend project (e.g., `pets-backend/test`) and then a file named `test-index.js` with the following content:

```javascript
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
 
chai.use(chaiHttp);
//the parent block
describe('backend root', () => {
 it('it should return a 404', () => {
   chai.request(server)
       .get('/')
       .end((err, res) => {
           res.should.have.status(404);
       });
 });
});
```

This test is replicating the behaviour we find when trying to access http://localhost:3050/. 
Since there is no route defined for this path, the backend will return with a 404 error.

This is based on the sample solutions we have in the repository.
If you have created a route for this path then the expected response won't be a 404 error.
You can also change the code above to consider a random path to confirm the trigger of a 404 error.

Before we can run our tests we need to alter the `package.json` file to include them. 
We do that by including the following line in the *scripts* configuration. 

```json
"scripts": {
    "start": "node ./bin/www",
    "test": "mocha --timeout 5000 --exit"
},
```

Notice the addition of the *test* entry.
The `--exit` flag is used to stop the program and return to the console after all tests have finished.

Finally, run your tests with 

```bash
npm test
```

You should obtain an output similar to this one:

```
> mocha --timeout 5000 --exit
 
 
  backend root
Connected to the database!
    ✓ it should return a 404
GET / 404 137.237 ms - 3812
 
 
  1 passing (173ms)
```

## 5. Testing GET at /petshop

Now let’s create a test case for GET /petshop. 

Create a file named animal.test.js inside the test directory with the following content:

```javascript
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
 
let mongoose = require('mongoose');
let Animal = require('../models/animal.model');
 
chai.use(chaiHttp);
 
//the parent block
describe('Testing the /petshop path', () => {
    //Testing GET /petshop
    describe('GET /petshop', () => {
        it('it should return a welcome message', (done) => {
            chai.request(server)
            .get('/petshop')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Welcome to the petshop api');
                done();
            });
        });
    });
    // Finished GET /petshop
});
```

Notice the comments marking the beginning and ending of the test code.

Now run your tests:

```bash
npm test
```

The output should now be something similar to:

```
> mocha --timeout 5000 --exit
 
 
  Testing the /petshop path
Connected to the database!
    GET /petshop
GET /petshop 200 4.785 ms - 41
      ✓ it should return a welcome message
 
  backend root
    ✓ it should return a 404
GET / 404 133.219 ms - 3812
 
 
  2 passing (180ms)
```

## 6. Testing GET at /petshop/pets 

Now we can start testing code that interacts with our database.
Let’s start with the list of pets.

Add the following code in the `animal.test.js` file, under the comment `//Finished GET /petshop`.

```javascript
    //Testing GET /petshop/pets
    describe('GET /petshop/pets', () => {
        it('it should GET all the animals', (done) => {
            chai.request(server)
            .get('/petshop/pets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
    //Finished GET /petshop/pets
```

Make sure this code is still inside the parent block.

Now run your tests:

```bash
npm test
```

The output should now be something similar to:

```
  Testing the /petshop path
Connected to the database!
    GET /petshop
GET /petshop 200 5.330 ms - 41
      ✓ it should return a welcome message
    GET /petshop/pets
GET /petshop/pets 200 20.478 ms - 503
      ✓ it should GET all the animals
 
  backend root
    ✓ it should return a 404
GET / 404 135.900 ms - 3812
 
 
  3 passing (208ms)
```

## 7. Testing POST at /petshop/pets 

Finally, let’s test the POST method.
We are assuming that there is a user in your database with the id *619cd08b3a96796911b757b6* (the same user explored in last week's exercises).
Add the following code in the animal.test.js file, under the comment `//Finished GET /petshop/pets`.

```javascript
    //Testing POST /petshop/pets
    describe('POST /petshop/pets', () => {
        it('it should not POST an animal without name field', (done) => {
            let animal = {
                species: "dog",
                breed: "caninus canine",
                age: 12,
                colour: "yellow"
            };
            chai.request(server)
                .post('/petshop/pets')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
        it('it should POST an animal ', (done) => {
            let animal = {
                name: "fido",
                species: "dog",
                breed: "caninus canine",
                age: 12,
                colour: "yellow",
                userid: "619cd08b3a96796911b757b6" 
            }; 
            chai.request(server)
                .post('/petshop/pets')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('species');
                    res.body.should.have.property('breed');
                    res.body.should.have.property('age');
                    res.body.should.have.property('colour');
                    done();
                });
        });
    });
    //Finished POST /petshop/pets
```

Notice how we have two test cases in this code.

The first test case tries to create a new animal with incomplete information (without the `name` field).
This test expects a negative result from the backend (status 400).
This is an example of negative test.

The second test case creates a new dog named *fido* and expects a positive result of the backend (status 200).

Run your tests:

```bash
npm test
```

You can check the result of this test by using the mongo command line client or mongodb compass, or simply listing the animals.
Modify the pet details and re-run the tests, so you can see the effect of the test in the database.

## 8. Exercises

1. Write test cases for the other methods/routes of your backend. As these are not implemented, all tests that expect an specific result should fail.
2. Finish the implementation of the backend by completing the controller code. You can use this tutorial as basis for defining your database manipulation functions <https://bezkoder.com/node-express-mongodb-crud-rest-api/>. Remember to use your test cases.
3. Finish the implementation of the frontend to consider the full set of CRUD functions from the backend. 
4. Recreate the same tests using Postman.

## References

- Mozilla Developer Network - Express web framework (Node.js/JavaScript) - <https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs>
- Node.js, Express & MongoDb: Build a CRUD Rest Api example - <https://bezkoder.com/node-express-mongodb-crud-rest-api/>
- Test a Node RESTful API with Mocha and Chai - <https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai>
- How to run Mocha/Chai tests on Node.js apps - <https://buddy.works/guides/how-automate-nodejs-unit-tests-with-mocha-chai>
- Getting Started with Node.js and Mocha - <https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha>
