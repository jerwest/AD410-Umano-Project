var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.608013, lng: -122.335167},
    zoom: 14
  });
  var marker = new google.maps.Marker({
    position: {lat: 47.608013, lng: -122.335167},
    map: map,
    title: 'Hello World!'//Downtown Seattle
  });
}

function trafficOverlay() {
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}
