var http = require("http"),
	url = require("url"),
	util = require("util");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
	var httpVerb = request.method;
	//console.log();
    util.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      util.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, httpVerb, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(process.env.PORT || 8001);
  util.log("Raspberry Server has started.");
}

exports.start = start;