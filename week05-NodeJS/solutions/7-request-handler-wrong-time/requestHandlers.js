function start() {
    console.log("Request handler start called");
    function sleep(mSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + mSeconds);
    }
    sleep(10000);
    return "In start()";
}

function submit() {
    console.log("Request handler submit called");
    return "In submit()";
}
exports.start = start;
exports.submit = submit;
