function start(response) {
    console.log("Request handler start called");
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Request Handler START called");
    response.end();
}

function submit(response) {
    console.log("Request handler submit called");
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Request Handler SUBMIT called");
    response.end();
}
exports.start = start;
exports.submit = submit;