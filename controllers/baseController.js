var templateProcessor = require("../templateProcessor"),
	util = require("util");

function BaseController() {
	var self = this;
	this.render = function(templateName, data, response) {
		// Does some stuff...
		templateProcessor.process(templateName, data, function(html) {
			if(html !== "Read Error Occured!") {
				util.log("Rendering template " + templateName);
				response.writeHead(200, {'Content-Type': 'text/html'});
	            response.write(html);
				response.end();
			}
		});
	};
}

module.exports = BaseController;