var	util = require("util"),
	mysql = require("db-mysql"),
	fs = require("fs");

function BaseModel() {
	var self = this;
	this.tableName = "";
	this.schema = {};
	this.dbConfig = {};
	
	fs.readFile("config/database.json", function(err, data) {
		self.dbConfig = JSON.parse(data);
	});
	
	this.init = function(obj) {
		var record_object = {};
		for(var attr in self.schema) {
			record_object[attr] = typeof(obj) === 'object' && obj.hasOwnProperty(attr) ? obj[attr] : self.schema[attr];
		}
		return record_object;
	};
	
	this.save = function(obj, callback) {
		var keys = [];
		var values = [];
		for(var attr in obj) {
			keys.push(attr);
			values.push(obj[attr]);
		}
		new mysql.Database(self.dbConfig).connect(function(error) {
		    if (error) {
		        return console.log('CONNECTION error: ' + error);
		    }
		    this.query()
		        .insert(self.tableName, keys, values)
		        .execute(function(error, result) {
		                if (error) {
		                        console.log('ERROR: ' + error);
		                        return;
		                }
		                console.log('GENERATED id: ' + result.id);
		        });
		});
	}
	
	this.find = function(db_query, query_args, callback) {
		if(typeof(db_query) !== 'string') {
			if(typeof(callback) === 'function')
				callback("");
		}
			
		new mysql.Database(self.dbConfig).connect(function(error) {
		    if (error) {
		        util.log('Database Connection error: ' + error);
				if(typeof(callback) === 'function')
					callback("");
		    }
		    this.query()
		        .select('*')
		        .from(self.tableName)
		        .where(db_query === "" ? "1 = 1" : db_query + " and 1 = 1", query_args)
		        .order({'id': true})
		        .execute(function(error, rows, cols) {
		                if (error) {
		                        console.log('ERROR: ' + error);
		                        if(typeof(callback) === 'function')
									callback("");
		                }
		                util.log('Database Query: ' + rows.length + ' ROWS found');
						if(typeof(callback) === 'function')
							callback(rows);
		        });
		});
	};
}

module.exports = BaseModel;