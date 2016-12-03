var typingTimer;  //timer identifier
var doneTypingInterval = 2000;
var places;
var total_time;
var outputstr;
var sightsdetails;
var timeformat = new Date(null);


function processwaypoints(){
    var waypts = [];
    var sightsdetailsarray = [];
    var checkboxArray = document.getElementById('populateplaces');
    console.log(checkboxArray.length);
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
                    
                     phototemp = outputstr.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix
                        + "original" + 
                        outputstr.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix;



                $( "#populateplacedetails" ).append(
                    '<div class="col-lg-3 col-md-4 col-sm-6"><div class="card"><img src="' + phototemp + 
                    '" style="width:100%"><div class="container"> <h4> <b> ' + 
                    outputstr.response.groups[0].items[i].venue.name +
                    '</b></h4><hr><p>Category:' +
                    outputstr.response.groups[0].items[i].venue.categories[0].name +
                    '</p></div></div></div>'

                );


              sightsdetailsarray.push({
                "name"     : outputstr.response.groups[0].items[i].venue.name,
                "lat"      : outputstr.response.groups[0].items[i].venue.location.lat,
                "long"     : outputstr.response.groups[0].items[i].venue.location.lng,
                "category" : outputstr.response.groups[0].items[i].venue.categories[0].name,
                "photo"    : phototemp

              }); 
        }
    }
    sightsdetails = sightsdetailsarray;
    console.log(sightsdetails);

}



function initialize() {
	
    initMap();
    initAutoComplete();
}


var placeSearch, autocomplete;
 function initAutoComplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
        autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('autocomplete2'));
        autocomplete3 = new google.maps.places.Autocomplete(document.getElementById('autocomplete3'));
      }

      function myFunction() {
        console.log(document.getElementById('autocomplete').value);
}


$('#autocomplete').keyup(function(){
    clearTimeout(typingTimer);
    if ($('#autocomplete').val()) {

        typingTimer = setTimeout(processurl, doneTypingInterval);
    }
});


function processurl(){
			

			document.getElementById("populateplaces").innerHTML = "";

	        var str = document.getElementById("autocomplete").value;
            var str = str.replace(/ /g,"%20");
            var url = "https://api.foursquare.com/v2/venues/explore?near="+ str + "&venuePhotos=1&radius=100000&v=20161117&query=hike&m=foursquare&client_secret=L1J2NHSD3UK4ZAHH2JRGUQXHMED41PH3YOCYAMJS1GYARFJE&client_id=OI0JUH3OU4C0GM20F1CTT40Y1R5TBRXWTHQPJJQD4PKFFKKX";
			
			$.getJSON(url, function(jsonresult){
				outputstr = jsonresult;
		        for(i=0; i<jsonresult.response.groups[0].items.length; i++){
		        	$("#populateplaces").append(
		        		'<option value="' + jsonresult.response.groups[0].items[i].venue.name +  ", " + jsonresult.response.groups[0].items[i].venue.location.city +
		        		'">' +
		        		jsonresult.response.groups[0].items[i].venue.name +  ", " + jsonresult.response.groups[0].items[i].venue.location.city +
		        		'</option>'


		        	);

		        	
		        }
			}).error(function() { sweetAlert("Cannot find the place"); });        
		};



// init map 


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
            lat: 37.332716,
            lng: -121.882374


            
        },
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]

    });
    directionsDisplay.setMap(map);
    document.getElementById('showresult').addEventListener('click', function() {
    	event.preventDefault();
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    
    var checkboxArray = document.getElementById('populateplaces');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true


            });
        }
    }
    directionsService.route({
        origin: document.getElementById('autocomplete2').value,
        destination: document.getElementById('autocomplete3').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            total_time = 0;
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].duration.text + '<br><br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                console.log(route.legs[i]);

                total_time += route.legs[i].duration.value;

            }


                timeformat.setSeconds(total_time); // specify value for SECONDS here
                timeformat.toISOString().substr(11, 8);
                //sweetAlert(timeformat);

            
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}