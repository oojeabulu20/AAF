var server = require("./server");
var router = require("./router");
var animalController = require("./controllers/animal.controller");
var handle = {};

handle["/"] = animalController.start;
handle["/getall"] = animalController.findAll;
handle["/create"] = animalController.create;
server.start(handle, router.route);
