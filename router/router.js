var util = require("util");

function route(routingTable, httpVerb, pathname, response, postData) {
  util.log("About to route a request for " + pathname);
	for(var route = 0; route < routingTable.length; route++) {
		if (typeof(routingTable[route].callback) === 'function' && httpVerb === routingTable[route].method && pathname.match(routingTable[route].regex)) {
			routingTable[route].callback(pathname, response, postData, routingTable[route].match(pathname));
			return;
		}
		else if(route === routingTable.length - 1) {
			util.log("No request handler found for " + pathname);
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not found");
			response.end();
		}
	}
}

exports.route = route;