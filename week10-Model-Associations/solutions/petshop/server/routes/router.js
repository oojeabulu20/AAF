function route(handle, pathname, response, query) {
    console.log("Routing to " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, query);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type" : "text/plain"});
        response.write("404 page not found");
        response.end();
    }
}
exports.route = route;
