var http = require("http");

function start() {
	function onRequest(request, response) {
		const baseURL =  request.protocol + '://' + request.headers.host + '/';
		const theURL = new URL(request.url, baseURL);
		var pathname = theURL.pathname;
		console.log("Request from " + pathname);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();	
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}

exports.start = start;
