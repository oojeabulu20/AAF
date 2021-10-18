var http = require("http");
//var url = require("url");

function start(handle, route) {
	function onRequest(request, response) {
		//Creating the URL object
		const baseURL =  request.protocol + '://' + request.headers.host + '/';
		const theURL = new URL(request.url, baseURL);
		var pathname = theURL.pathname;
		var query = theURL.query;
		var postData = "";
		console.log("Request from " + pathname + "with query " + query);
		
		//Adding a listener to receive data.
		request.addListener("data", function(postDataChunk) {
			//This unnamed function is the callback for the data event
			postData += postDataChunk;
			console.log("Received more data: " + postDataChunk);
		});

		//Adding a listener for when finishing receiving data
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}

exports.start = start;
