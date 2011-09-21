var fs = require("fs");
var mustache = require("./node_modules/mustache/mustache");

function process(template, data, response) {
	fs.readFile(template, function(err, template) {
			if(err === null) {
	            response.writeHead(200, {'Content-Type': 'text/html'});
	            response.write(mustache.to_html(template.toString(), data));
				response.end();
			}
			else {
				console.log("There was an error processing the template: " + template + " \n" + err);
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("There was an error processing the template.");
				response.end();
			}
	});
}

exports.process = process;