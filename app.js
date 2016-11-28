var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
app.use(session({secret: 'tripwale', resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))

// Connect to Mongoose
mongoose.connect('mongodb://pujan:pujan123@ds157987.mlab.com:57987/tripwale');
var db = mongoose.connection;


Trip = require('./models/trip');
User = require('./models/user');



// passport
passport.use(new LocalStrategy(function(username, password, done){

	User.findOne({username: username, password:password}, function(err, user){

		console.log("goes inside passport use");

		if(err){
			return done(err);
		}

		if(!user){
			return done(null, false);
		}

		return done(null, user);

	});

}));


passport.serializeUser(function(user, done){

	done(null, user);
	

});

passport.deserializeUser(function(user, done){
	User.findById(user._id, function(err, user){
		done(err, user);

	});

});





app.get('/api/trips', function(req, res){
	Trip.getTrips(function(err, trips){
		if(err){
			throw err;
		}
		res.json(trips);
	});
});

app.get('/api/trips/:_id', function(req, res){
	Trip.getTripById(req.params._id, function(err, trip){
		if(err){
			throw err;
		}
		console.log(trip);
		res.json(trip);
	});
});

app.post('/api/trips', function(req, res){
	var trip = req.body;
	Trip.addTrip(trip, function(err, trip){
		if(err){
			throw err;
		}
		console.log(trip);
		res.json(trip);
	});
});


app.put('/api/trips/:_id', function(req, res){
	var id = req.params._id;
	var trip = req.body;
	Trip.updateTrip(id, trip, {}, function(err, trip){
		if(err){
			throw err;
		}
		res.json(trip);
	});
});

app.delete('/api/trips/:_id', function(req, res){
	var id = req.params._id;
	Trip.removeTrip(id, function(err, trip){
		if(err){
			throw err;
		}
		res.json(trip);
	});
});


// login

app.get('/api/users', function(req, res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', function(req, res){
	User.getUserById(req.params._id, function(err, user){
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/users', function(req, res){
	var user = req.body;
	console.log("enters post");
	
	User.findOne({username: user.username} , function(err, existinguser){
		if (existinguser == null) {
			console.log("existing user is null");
			User.addUser(user, function(err, user){
				if(err){
					throw err;
				}
					res.json(user);
			});
		}
		else{
			console.log("existing user is present");
			res.json(null);
		}

		})

});

app.post('/api/users/login', passport.authenticate('local'), function(req, res){
	
	var user = req.body;
	console.log("goes inside /login");
	User.findOne({username: user.username, password: user.password}, function(err, foundUser){
		res.json(foundUser);
	});

});


app.get('/rest/loggedin', function(req, res){

	res.send(req.isAuthenticated() ? req.user: "0");
	console.log("req user in logged" + req);

});



app.listen(3000);
console.log('Running on port 3000...');