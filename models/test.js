var BaseModel = require("./baseModel"),
	util = require("util");
	
function Test() {
	Test.super_.call(this);
}

util.inherits(Test, BaseModel);

var test = new Test();

exports = module.exports = test;