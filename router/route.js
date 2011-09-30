var util = require("util");

function Route(path, method, callback) {
	var self = this;
	this.path = path;
	this.method = method;
	this.keys = [];
	this.callback = callback;
	
	this.regex = normalize(path, this.keys);
	
	this.match = function(interested_path) {
		return self.regex.exec(interested_path);
	};
}

function normalize(path, keys) {
	if(path instanceof RegExp) return path;
  path = path
    .replace(/\/\(/g, '(?:/')
    .replace(/\/:(\w+)/g, function(_, key){
      keys.push({ name: key });
      return '\/(?:([^/]+?))';
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', 'i');
}

exports = module.exports = Route;