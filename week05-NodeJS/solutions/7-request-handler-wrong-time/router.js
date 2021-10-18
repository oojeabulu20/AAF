function route(handle, pathname) {
    console.log("Routing to " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    } else {
        var message = "No request handler found for " + pathname;
        console.log(message);
        return message;
    }
}
exports.route = route;
