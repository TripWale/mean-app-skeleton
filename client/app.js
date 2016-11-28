var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'UsersController',
		templateUrl: 'views/users.html'
	})
	.when('/trips', {
		controller:'TripsController',
		templateUrl: 'views/trips.html'
	})
	.when('/trips/details/:id',{
		controller:'TripsController',
		templateUrl: 'views/trip_details.html'
	})
	.when('/trips/add',{
		controller:'TripsController',
		templateUrl: 'views/add_trip.html',
		resolve: {
			loggedin : checkLoggedin
		}
	})
	.when('/register',{
		controller:'UsersController',
		templateUrl: 'views/register.html'
	})
	.when('/users',{
		controller:'UsersController',
		templateUrl: 'views/users.html'
	})
	
	.when('/users/profile/:id',{
		controller:'UsersController',
		templateUrl: 'views/profile.html',
		
		resolve: {
			loggedin : checkLoggedin
		}
	})

	.when('/login',{
		controller:'UsersController',
		templateUrl: 'views/login.html'
	})
	.otherwise({
		redirectTo: '/'
	});

});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    	console.log("comes inside");
		var deferred = $q.defer();
		$http.get('/rest/loggedin/').success(function(response){
			console.log("response from logged: " + response);
			 
			if(response != '0'){

				currentUser = response;
				$rootScope.user = response;
				deferred.resolve();
				//console.log("currentUser = " + currentUser._id);

			}
			else{

				currentUser = null;
				window.location.href='#/login';
				alert("please login to access that page");
				deferred.reject();
			}
		});
		return deferred.promise;
};







