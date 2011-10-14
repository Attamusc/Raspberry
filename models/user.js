var BaseModel = require("./baseModel"),
	util = require("util");
	
function User() {
	// Begin: Required Declaraions
	User.super_.call(this);
	// End: Required Declarations
	
	// This describes the schema of the object in memory, with each properties default value.
	this.schema = {
		"name":"",
		"fav_color":""
	};
	
	// This describes the validations, if any, for the instance variables
	this.validations = {
		"name": {
			"presence": true,
			"length": "< 25"
		},
		"color": {
			"presence": true,
			"domain": ["red", "blue", "green", "yellow", "purple"]
		}
	};
}

util.inherits(User, BaseModel);

var user = new User();

exports = module.exports = user;