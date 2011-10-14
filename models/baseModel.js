var	util = require("util"),
	mysql = require("db-mysql"),
	fs = require("fs");

// TO-DO: Check if the table exists in the database; if it doesn't, then construct it using the schema and values provided in the database config.
function BaseModel() {
	var self = this;
	this.tableName = pluralize(self.constructor.name.toLowerCase());  // TO-DO: Write a better, more correct pluralizer
	this.schema = {};
	this.dbConfig = {};
	
	// Possible validations are:
	// Presence, Length, Domain, Format
	this.validations = {};
	
	// Set the necessary configurations for the database as defined in the JSON config file
	fs.readFile("config/database.json", function(err, data) {
		self.dbConfig = JSON.parse(data);
	});
	
	// Initialize an object in memory using the provided schema and an object literal passed into the function
	this.init = function(obj) {
		var record_object = {};
		var passedInDefaultValues = typeof(obj) === 'object';
		for(var attr in self.schema) {
			// If the user passed in values, set them to those; otherwise, use the values defined in the schema
			record_object[attr] = passedInDefaultValues && obj.hasOwnProperty(attr) ? obj[attr] : self.schema[attr];
		}
		return record_object;
	};
	
	// Save an object in memory to the database
	this.save = function(obj, callback) {
		var callbackIsFunction = typeof(callback) === 'function';
		var keys = [];
		var values = [];
		for(var attr in obj) {
			// TO-DO: Check for validation errors here using the key and value passed in.
			keys.push(attr);
			values.push(obj[attr]);
		}
		new mysql.Database(self.dbConfig).connect(function(error) {
		    if (error) {
		        util.log('CONNECTION error: ' + error);
				if(callbackIsFunction)
					callback(false);
					return;
		    }
		    
			var sql_query = this.query()
		        				.insert(self.tableName, keys, values);
			
			util.log("Executing Database Query: " + sql_query.sql());
			
		    sql_query.execute(function(error, result) {
		                if (error) {
		                        util.log('ERROR: ' + error);
								if(callbackIsFunction)
									callback(false);
									return;
		                }
		                util.log('Database Query: Generated id is "' + result.id + '"');
						
						if(callbackIsFunction)
							callback(true);
		        });
		});
	};
	
	// Update an object in the database using an object in memory
	this.update = function(id, obj, callback) {
		var callbackIsFunction = typeof(callback) === 'function';
		var keys = [];
		var values = [];
		for(var attr in obj) {
			// TO-DO: Check for validation errors here using the key and value passed in.
			keys.push(attr);
			values.push(obj[attr]);
		}
		new mysql.Database(self.dbConfig).connect(function(error) {
		    if (error) {
		        util.log('CONNECTION error: ' + error);
				if(callbackIsFunction)
					callback(false);
					return;
		    }
		    
			var sql_query = this.query()
		        				.insert(self.tableName, keys, values);
			
			util.log("Executing Database Query: " + sql_query.sql());
			
		    sql_query.execute(function(error, result) {
		                if (error) {
		                        util.log('ERROR: ' + error);
								if(callbackIsFunction)
									callback(false);
									return;
		                }
		                util.log('Database Query: Generated id is "' + result.id + '"');
						
						if(callbackIsFunction)
							callback(true);
		        });
		});
	};
	
	// Query the database, using a query and arguments provided
	this.find = function(db_query, query_args, callback) {
		var callbackIsFunction = typeof(callback) === 'function';
		if(typeof(db_query) !== 'string') {
			if(callbackIsFunction)
				callback("ERROR");
			util.log("ERROR: Query string is not, in fact, a string");
			return;
		}
			
		new mysql.Database(self.dbConfig).connect( function(error) {
		    if (error) {
		        util.log('Database Connection error: ' + error);
				if(callbackIsFunction)
					callback("ERROR");
					return;
		    }
			
			// Construct the SQL Query using the db-mysql modules' chaining functions
		    var sql_query = this.query()
		        				.select('*')
		        				.from(self.tableName)
		        				.where(db_query === "" ? "1 = 1" : db_query + " and 1 = 1", query_args)
		        				.order({'id': true});
			
			util.log("Executing Database Query: " + sql_query.sql());
			
			// Execute the Query constructed above
			sql_query.execute(function(error, rows, cols) {
		                if (error) {
		                        util.log('ERROR: ' + error);
		                        if(callbackIsFunction)
									callback("ERROR");
									return;
		                }
		                util.log('Database Query: ' + rows.length + ' ROWS found');
						if(callbackIsFunction)
							callback(rows);
			});
		});
	};
	
	this.query = function(query_string, callback) {
		
	};
}

// Pluralize the model name to get the table name.
// NOTE: This currently will get special cases wrong, it only works for common pluralization rules.
function pluralize(noun) {
	var plural = noun
		.replace(/(s|sh|ch|x|z)$/, '$1e')
		.replace(/([^aeiou]o)$/, '$1e')
		.replace(/([^aeiou])y$/, '$1ie')
		.replace(/(f|fe)$/, 've')
		+ "s";
	return plural;
}

module.exports = BaseModel;