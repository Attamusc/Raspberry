var server = require("./server"),
	router = require("./router"),
	util = require("util"),
	fs = require("fs"),
	handle = {
		"/js": function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, javascript) {
					  util.log("Request handler 'js' was called.");
					  response.writeHead(200, {"Content-Type": "text/javascript"});
					  response.write(javascript.toString());
					  response.end();
					});
				},
		"/css": function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, stylesheet) {
					  util.log("Request handler 'css' was called.");
					  response.writeHead(200, {"Content-Type": "text/css"});
					  response.write(stylesheet.toString());
					  response.end();
					});
				},
		"/img": function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, image) {
					  util.log("Request handler 'img' was called.");
					  response.writeHead(200, {"Content-Type": "image/png"});
					  response.write(javascript.toString());
					  response.end();
					});
				}
	};

fs.readFile('./routes.json', function(err, data) {
	var routes = JSON.parse(data);
	for(var i = 0; i < routes.length; i++)
		handle[routes[i].path] = eval("require(\"./controllers/" + routes[i].controller + "\")." + routes[i].method);
	server.start(router.route, handle);
});