var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/js"] = requestHandlers.js;
handle["/css"] = requestHandlers.css;
handle["/img"] = requestHandlers.img;

server.start(router.route, handle);