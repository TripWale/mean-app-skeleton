var mongoose = require('mongoose');


// Trip Schema
var userSchema = mongoose.Schema({

	username:{
		type: String,
	},
	name:{
		type: String,
		
	},
	password:{
		type: String
	},
	email:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});




var User = module.exports = mongoose.model('User', userSchema);


// Get Users
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Add User
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}

