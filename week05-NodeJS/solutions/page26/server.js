var http = require("http");
var url = require("url");

function start(handle, route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;
		console.log("Request from " + pathname + "with query " + query);
		route(handle, pathname, response, query);
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}

exports.start = start;