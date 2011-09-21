var fs = require("fs");
var querystring = require("querystring");
var templateProcessor = require("./templateProcessor");

function start(pathname, response, postData) {
  console.log("Request handler 'start' was called.");
  var data = {};
  templateProcessor.process("./templates/index.html.mustache", data, response);
}

function upload(pathname, response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You sent: " + querystring.parse(postData).text);
  response.end();
}

function css(pathname, response, postData) {
	fs.readFile("." + pathname, function(err, stylesheet) {
	  console.log("Request handler 'css' was called.");
	  response.writeHead(200, {"Content-Type": "text/css"});
	  response.write(stylesheet.toString());
	  response.end();
	});
}

function js(pathname, response, postData) {
	fs.readFile("." + pathname, function(err, javascript) {
	  console.log("Request handler 'js' was called.");
	  response.writeHead(200, {"Content-Type": "text/javascript"});
	  response.write(javascript.toString());
	  response.end();
	});
}

function img(pathname, response, postData) {
	fs.readFile("." + pathname, function(err, image) {
	  console.log("Request handler 'img' was called.");
	  response.writeHead(200, {"Content-Type": "image/png"});
	  response.write(javascript.toString());
	  response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.js = js;
exports.css = css;
exports.img = img;