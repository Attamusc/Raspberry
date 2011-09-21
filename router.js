function route(handle, resourcePath, pathname, response, postData) {
  console.log("About to route a request for " + resourcePath);
  if (typeof handle[resourcePath] === 'function') {
    handle[resourcePath](pathname, response, postData);
  } else {
    console.log("No request handler found for " + resourcePath);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;