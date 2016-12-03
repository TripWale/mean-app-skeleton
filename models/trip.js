var mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;
// Trip Schema
var tripSchema = mongoose.Schema({
	_user:{
	 type: String,
	 ref: 'User' 
	},
	city:{
		type: String,
	},
	startpoint:{
		type: String,
		required: true
	},
	sights:{
		type: [String]
	},
	address:{
		type: [String]
	},
	sightsdetails:{
		type: [{}]
	},
	endpoint:{
		type: String
	},
	rating:{
		type: Number
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	start_date:{
		type: Date
	},
	time:{
		type: Number
	}
});



var Trip = module.exports = mongoose.model('Trip', tripSchema);



// Get Trips
module.exports.getTrips = function(callback, limit){
	Trip.find(callback).limit(limit);
}

// Get Trip
module.exports.getTripById = function(id, callback){
	Trip.findById(id, callback).populate('_user');

}

// Add Trip
module.exports.addTrip = function(trip, callback){
	Trip.create(trip, callback);
}


module.exports.getTripsbyUser = function(id, callback){
	console.log("id - " +id);
	Trip.find({ '_user': id}, callback);
}



// Update Trip
module.exports.updateTrip = function(id, trip, options, callback){
	var query = {_id: id};
	var update = {
		title: trip.title,
		genre: trip.genre,
		description: trip.description,
		author: trip.author,
		publisher: trip.publisher,
		pages: trip.pages,
		image_url: trip.image_url,
		buy_url: trip.buy_url
	}
	Trip.findOneAndUpdate(query, update, options, callback);
}

// Delete Trip
module.exports.removeTrip = function(id, callback){
	var query = {_id: id};
	Trip.remove(query, callback);
}