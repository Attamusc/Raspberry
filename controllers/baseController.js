var templateProcessor = require("../templateProcessor"),
	util = require("util");

function BaseController() {
	var self = this;
	this.templateNS = "";
	
	this.render = function(templateName, data, response) {
		// Pushes the template to the template processor and responds with the returned html.
		templateProcessor.process(self.templateNS + "/" + templateName, data, function(html) {
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