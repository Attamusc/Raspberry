var http = require("http"),
	url = require("url"),
	util = require("util");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
	var resourcePath = "/" + url.parse(request.url).pathname.split("/")[1];
    util.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      require("util").log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, resourcePath, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(process.env.PORT || 8001);
  util.log("Raspberry Server has started.");
}

exports.start = start;