var server = require("./server"),
	router = require("./router/router"),
	Route = require("./router/route"),
	util = require("util"),
	fs = require("fs"),
	mysql = require("db-mysql"),
	routingTable = [
		new Route(new RegExp("^\/js\/.*\.js$"), "GET", function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, javascript) {
					  util.log("Request handler 'js' was called.");
					  response.writeHead(200, {"Content-Type": "text/javascript"});
					  response.write(javascript.toString());
					  response.end();
					});
				}),
		new Route(new RegExp("^\/css\/.*\.css$"), "GET", function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, stylesheet) {
					  util.log("Request handler 'css' was called.");
					  response.writeHead(200, {"Content-Type": "text/css"});
					  response.write(stylesheet.toString());
					  response.end();
					});
				}),
		new Route(new RegExp("^\/img\/.*\.\w+$"), "GET", function(pathname, response, postData) {
					fs.readFile("." + pathname, function(err, image) {
					  util.log("Request handler 'img' was called.");
					  response.writeHead(200, {"Content-Type": "image/png"});
					  response.write(javascript.toString());
					  response.end();
					});
				})
	];

fs.readFile('config/routes.json', function(err, data) {
	var routes = JSON.parse(data);
	for(var i = 0; i < routes.length; i++) {
		var controllerCallback = eval("require(\"./controllers/" + routes[i].controller + "\")." + routes[i].method);
		routingTable.push(new Route(routes[i].path, routes[i].verb, controllerCallback));
	}
	server.start(router.route, routingTable);
});