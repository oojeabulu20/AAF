function start() {
    console.log("Request handler start called");
    return "Hello world with start";
}

function submit() {
    console.log("Request handler submit called");
    return "Hello world with submit";
}
exports.start = start;
exports.submit = submit;