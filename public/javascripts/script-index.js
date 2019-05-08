function initMap() {
  var umanoLatLng = {lat: 47.700578, lng: -122.325019}

  var map = new google.maps.Map(document.getElementById('map'), {
    center: umanoLatLng,
    zoom: 13
  });

  var marker = new google.maps.Marker({
    position: umanoLatLng,
    map: map,
    title: 'Hello World!'
  });

  /*
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
  */
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function trafficOverlay() {
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

/*
function streetViewOverlay() {
  var panorama;
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('map'),
      {
        position: {lat: 47.700578, lng: -122.325019},
        pov: {heading: 165, pitch: 0},
        zoom: 1
      });
*/
