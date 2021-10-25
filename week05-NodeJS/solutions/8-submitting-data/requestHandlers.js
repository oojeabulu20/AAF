var querystring = require("querystring");

function start(response) {
    console.log("Request handler start called");
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Request Handler START called");
    response.end();
}

function submit(response, query) {
    console.log("In submit with query string " + query);
    var queryAsObject = querystring.parse(query);

    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Request Handler SUBMIT called with value "+
        queryAsObject['a']);
    response.end();
}
exports.start = start;
exports.submit = submit;
