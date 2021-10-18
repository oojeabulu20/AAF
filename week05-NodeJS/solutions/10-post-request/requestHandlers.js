
function start(response, postData) {
    var body = "<html>"+
		"<head><title>Index</title></head>"+
		"<body>"+
		"<form action='/submit' method='post'>"+
		"Name: <input type='text' name='name'/>"+
		"Degree: <input type='text' name='degree'/>"+
		"Age: <input type='text' name='age'/>"+
		"<input type='submit' value='Submit it' />"+
		"</body></html>";
    response.writeHead(200, {"Content-type": "text/html"});
    response.write(body);
    response.end();
}

function submit(response, postData) {
    console.log("In submit with data " + postData);

    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Request Handler SUBMIT called with value " +
        postData);
    response.end();
}
exports.start = start;
exports.submit = submit;
