var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

//A local list of animals
var animalsList = [{ name:'Logan', species:'Dog', breed:'Border Collie', age:'5', colour:'Black with white, blue and tan head' }, {name:'Archie', species:'Dog', breed:'Mongrel', age:'15.5', colour:'White' }]


// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of pets to show that we're up and running
router.get('/pet', function(req, res, next) {
  // The first example
  //res.send('Got a GET request at /pet');

  //Adding call to pug template
  //res.render('pets', 
  //  {title: 'Pet store',
  //  message: 'Hello World! from the <tt>pets</tt> router'}
  //);

  //Passing data to the template from the handler
  res.render('pets',
    {title: 'Pet store',
     message: 'Hello World! from the <tt>pets</tt> router',
     animalsList: animalsList }
  );
});
 
// accept POST request and add a new pet to the db
router.post('/pet', upload.array(), function (req, res) {
    //Initial handler to demonstrate manipulating req
    //res.send('Post handler at /petshop received '+ req.body.name +' '+ req.body.breed);

    //Second handler to demonstrate extracting data and saving in the array
    animalsList.push(req.body);
    res.redirect('/petshop/pet');
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
