function route(handle, pathname) {
    console.log("Routing to " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
    }
}
exports.route = route;