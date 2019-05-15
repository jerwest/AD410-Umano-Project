

var map = {}
var trafficLayer = {}
var bikeLayer = {}

function initMap() {
  var umanoLatLng = {lat: 47.700578, lng: -122.325019}

  /*overlay variables*/
  trafficLayer = new google.maps.TrafficLayer();
  bikeLayer = new google.maps.BicyclingLayer();

    map = new google.maps.Map(document.getElementById('map'), {
    center: umanoLatLng,
    zoom: 11
    });

   /* drop umano office pin*/

	/***** marker info **/
	/*
	 var infowindow = new google.maps.InfoWindow({
      content: 'hello world'
	  });

   // Attach it to the marker we've just added
   google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
   });
	*/

	/** zoom in more**/

    /* drop all other property pins  */
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }

} /* End of Create Map - function initMap() */



/* Overlays */
function trafficToggle(){
  if(trafficLayer.getMap() == null){
        //traffic layer is disabled.. enable it
        trafficLayer.setMap(map);
    } else {
        //traffic layer is enabled.. disable it
        trafficLayer.setMap(null);
    }
}
function bikeToggle(){
  if(bikeLayer.getMap() == null){
        bikeLayer.setMap(map);
    } else {
        bikeLayer.setMap(null);
    }
}
