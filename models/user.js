var BaseModel = require("./baseModel"),
	util = require("util");
	
function User() {
	User.super_.call(this);
	var self = this;
	this.tableName = "users";
	this.schema = {
		"name":"",
		"fav_color":""
	};
}

util.inherits(User, BaseModel);

var user = new User();

exports = module.exports = user;