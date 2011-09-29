var fs = require("fs"),
	mustache = require("mustache"),
	util = require("util");

function process(template, data, callback) {
	fs.readFile("./views/" + template + ".html.mustache", function(err, template) {
			if(err === null) {
	            var processedTemplate = mustache.to_html(template.toString(), data);
				if(typeof(callback) === 'function') {
					callback(processedTemplate);
				}
			}
			else {
				util.log("There was an error processing the template: " + template + " \n" + err);
				if(typeof(callback) === 'function') {
					callback("Read Error Occured!");
				}
			}
	});
}

exports.process = process;