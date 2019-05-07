function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.700578, lng: -122.325019},
    zoom: 12
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
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
