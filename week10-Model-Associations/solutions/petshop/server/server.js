var http = require("http");
var url = require("url");

function start(handle, route) {
	function onRequest(request, response) {
		//Creating the URL object
		const baseURL =  request.protocol + '://' + request.headers.host + '/';
		const theURL = new URL(request.url, baseURL);
		var pathname = theURL.pathname;
		var query = theURL.query;

		//if GET

		//else POST

		console.log("Request from " + pathname + "with query " + query);
		route(handle, pathname, response, query);
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}

exports.start = start;
