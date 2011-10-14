var BaseController = require("./baseController"),
	util = require("util"),
	User = require("../models/user");

// Declare the Controller
function PagesController() { 
	// Begin: Required Declarations
	PagesController.super_.call(this);
	var self = this;
	// End: Required Declarations
		
	this.start = function(response, params) {
		util.log("Request handler 'start' from 'PagesController' was called");
		User.find("", [], function(users) {
			var data = {
				"title":"Scaly Blackjack Web",
				"user": users[0]
			};
		  	self.render("index", data, response);
		});
	};

	this.about = function(response, params) {
		util.log("Request handler 'about' from 'PagesController' was called");
		User.save({"name":"Gaby", "fav_color":"blue"}, function() {
			var data = {
				"title":"About Scaly Blackjack Web"
			};
		  	self.render("about", data, response);	
		});
	};
}

// Set the BaseController as the super class of the current controller
util.inherits(PagesController, BaseController);

// Create an instance of the current controller
var pagesController = new PagesController();

// Expose the instance of the controller
exports = module.exports = pagesController;