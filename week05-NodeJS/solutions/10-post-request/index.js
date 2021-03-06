var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/submit"] = requestHandlers.submit;
server.start(handle, router.route);
