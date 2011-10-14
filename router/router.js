var util = require("util");

function route(routingTable, httpVerb, pathname, response, postData) {
	httpVerb = postData._method === ("PUT" || "put") ? "PUT" : postData._method === ("DELETE" || "delete") ? "DELETE" : httpVerb;
	for(var route = 0; route < routingTable.length; route++) {
		if (typeof(pathname.match(routingTable[route].regex) && (routingTable[route].method === (httpVerb || postDate._method)) && routingTable[route].callback) === 'function') {
			routingTable[route].callback(response, { "pathname": pathname, "postData": postData, "restParams": routingTable[route].match(pathname).splice(1) });
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