var typingTimer;  //timer identifier
var doneTypingInterval = 2000;



var placeSearch, autocomplete;
      function initAutocomplete() {
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
			console.log("preccess url");

			document.getElementById("populateplaces").innerHTML = "";

	        var str = document.getElementById("autocomplete").value;
            var str = str.replace(/ /g,"%20");
            var url = "https://api.foursquare.com/v2/venues/explore?near="+ str + "&venuePhotos=1&radius=100000&v=20161117&query=hike&m=foursquare&client_secret=L1J2NHSD3UK4ZAHH2JRGUQXHMED41PH3YOCYAMJS1GYARFJE&client_id=OI0JUH3OU4C0GM20F1CTT40Y1R5TBRXWTHQPJJQD4PKFFKKX";
			
			$.getJSON(url, function(jsonresult){
				outputstr = JSON.stringify(jsonresult, null, 4); 
		        for(i=0; i<jsonresult.response.groups[0].items.length; i++){
		        	$("#populateplaces").append(
		        		'<option value="' + jsonresult.response.groups[0].items[i].venue.name +
		        		'">'+
		        		jsonresult.response.groups[0].items[i].venue.name +
		        		'</option>'
		        	);
		        }
			});        
		};
