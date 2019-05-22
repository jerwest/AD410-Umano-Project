var map
var markers = []
var trafficLayer = {}
var bikeLayer = {}

// start out with filter features set to false, so no filtering happens by default
var filters = {single_family:false, multi_family:false, condo_townhome:false, retail:false, office:false}

$(function () {
    $('input[name=filter]').change(function (e) {
     map_filter(this.id);
      filter_markers()
  });
})

var get_set_options = function() {
  ret_array = []
  for (option in filters) {
    if (filters[option]) {

      ret_array.push(option)
    }
  }
  return ret_array;
}

var filter_markers = function() {
  set_filters = get_set_options()

  // for each marker, check to see if all required options are set
  for (i = 0; i < markers.length; i++) {
    marker = markers[i];

    // start the filter check assuming the marker will be displayed
    // if any of the required features are missing, set 'keep' to false
    // to discard this marker
    keep=true
    mapset = map
    for (opt=0; opt<set_filters.length; opt++) {
      if (!marker.properties[set_filters[opt]]) {
        keep = false;
      }
    }
    marker.setVisible(keep)
  }
}

var map_filter = function(id_val) {
   if (filters[id_val])
      filters[id_val] = false
   else
      filters[id_val] = true
}


// after the geojson is loaded, iterate through the map data to create markers
// and add the pop up (info) windows
function loadMarkers() {
  console.log('creating markers')
  var infoWindow = new google.maps.InfoWindow()
  geojson_url = '../collection.geojson'
  $.getJSON(geojson_url, function(result) {
      // Post select to url.
      data = result['features']
      $.each(data, function(key, val) {
        var point = new google.maps.LatLng(
                parseFloat(val['geometry']['coordinates'][0]),
                parseFloat(val['geometry']['coordinates'][1]));
        var titleText = val['properties']['title']
        var descriptionText = val['properties']['description']
        var directions = val['properties']['url']
        var colors = val['properties']['marker-color']
          //var url = "http://maps.google.com/mapfiles/ms/icons/";

      //url += colors + "-dot.png";
        var marker = new google.maps.Marker({
          
          position: point,
            icon : colors,
            
            /********* fix highliting hover on pin ***********/
          //title: titleText,
          map: map,
        
            
        //  animation: google.maps.Animation.DROP,
          //properties: val['properties']
            
         });
		
/***** zoom in map double click function with timeout  ******/
        
          google.maps.event.addListener(marker,'dblclick',function() {
  var pos = map.getZoom();
  map.setZoom(13);
  map.setCenter(marker.getPosition());
 
}); 

/***** calling back data to display *********/
        var markerInfo =descriptionText+titleText + '<a href = "' + directions + '"><br>Get Directions</a>'


        marker.addListener('click', function() {
              infoWindow.close()
              infoWindow.setContent(markerInfo)
              infoWindow.open(map, marker)
			            });
          
        markers.push(marker)
      });
  });
}

function initMap() {
    trafficLayer = new google.maps.TrafficLayer();
    bikeLayer = new google.maps.BicyclingLayer();
    map_options = {
      zoom: 10,
        
      center: {lat: 47.700578, lng: -122.325019}
        
         
    }

    map_document = document.getElementById('map')
    map = new google.maps.Map(map_document,map_options);
    loadMarkers()

}

/* Overlays */
function trafficToggle(){
  if(trafficLayer.getMap() == null){
        trafficLayer.setMap(map);
    } else {
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



google.maps.event.addDomListener(window, 'load', initMap);
