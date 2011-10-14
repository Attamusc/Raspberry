var BaseController = require("./baseController"),
	util = require("util"),
	sys = require("sys"),
	User = require("../models/user");

// Declare the Controller
function UsersController() { 
	// Begin: Required Declarations
	UsersController.super_.call(this);
	var self = this;
	// End: Required Declarations
		
	this.index = function(response, params) {
		util.log("Request handler 'index' from 'UsersController' was called");
		User.find("", [], function(users) {
			var data = {
				"title":"Users Controller Scaffold",
				"users": users
			};
		  	self.render("index", data, response);
		});
	};
	
	this.show = function(response, params) {
		util.log("Request handler 'show' from 'UsersController' was called with REST param: '" + params.restParams + "'");
		User.find("id=?", [params.restParams[0]], function(user) {
			var data = {
				"title": "Users Controller Scaffold - " + user.name,
				"user": user
			}
			self.render("show", data, response);	
		});
	};
	
	this.new = function(response, params) {
		util.log("Request handler 'new' from 'UsersController' was called");
		self.render("new", { "title": "Users Controller Scaffold New" }, response);
	};
	
	this.create = function(response, params) {
		util.log("Request handler 'create' from 'UsersController' was called");
		util.log("Post Data: " + sys.inspect(params.postData));
		User.save(params.postData, function(success) {
			if(success) {
				self.redirect("/users", response);
			}
			else {
				self.render("new", { "title": "Users Controller Scaffold New" }, response);
			}
		});
	};
	
	this.edit = function(response, params) {
		util.log("Request handler 'edit' from 'UsersController' was called with REST param: '" + params.restParams + "'");
		User.find("id=?", [params.restParams[0]], function(user) {
			var data = {
				"title": "Users Controller Scaffold Edit",
				"user": user
			}
			self.render("edit", data, response);	
		});
	};
	
	// TO-DO
	this.update = function(response, params) {};
	
	// TO-DO
	this.destroy = function(response, params) {};
}

// Set the BaseController as the super class of the current controller
util.inherits(UsersController, BaseController);

// Create an instance of the current controller
var usersController = new UsersController();

// Expose the instance of the controller
exports = module.exports = usersController;