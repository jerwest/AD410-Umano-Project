var map
var markers = []
var trafficLayer = {}
var bikeLayer = {}
var styleControl = {}
var styleSelector= {}


// start out with filter features set to false, so no filtering happens by default
var filters = {single_family:false, multi_family:false, condo_townhome:false, retail:false, office:false, former:false}

$(function () {
    $('input[name=filter]').change(function (e) {
     map_filter(this.id);
      filter_markers()
      console.log(filters)
  });
})

var get_set_options = function() {
  ret_array = []
  for (option in filters) {
    if (filters[option]) {

      ret_array.push(option)
    }
  }
  console.log(ret_array)
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
    keep=false
    //mapset = map
      for (opt=0; opt<set_filters.length; opt++) {
        if (marker.properties[set_filters[opt]]) {
          keep = true;
        }
      }
    if(set_filters.length == 0){
        marker.setVisible(true)
    }else{
        marker.setVisible(keep)
    }
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
        var marker = new google.maps.Marker({
          position: point,
            /********* fix highliting hover on pin ***********/
          //title: titleText,
          map: map,
            icon: {

      url: colors

    },
          animation: google.maps.Animation.DROP,
          properties: val['properties']
         });
         marker.addListener('click', toggleBounce);

         function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
		  /********zoom In marker ****/
		   map.addListener('center_changed', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
			   /*** zoom in timeout function ***/
			   /*
          window.setTimeout(function() {
            map.panTo(marker.getPosition());

          }, 3000);
		  */
        });


/***** zoom in map double click function ******/
  google.maps.event.addListener(marker,'dblclick',function() {
  var pos = map.getZoom();
  map.setZoom(13);
  map.setCenter(marker.getPosition());
  window.setTimeout(function() {map.setZoom(pos);},5000);
});


/***** calling back data to display *********/
        var markerInfo =descriptionText+titleText + '<a href =  "' + directions + '" target="_blank" ><br>Get Directions</a>'

        marker.addListener('click', function() {
              infoWindow.close()
              infoWindow.setContent(markerInfo)
              infoWindow.open(map, marker)
              setTimeout(toggleBounce, 1500);
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

    loadMarkers()

    map_document = document.getElementById('map')
    map = new google.maps.Map(map_document,map_options);

} /*End function init map()*/



/* Night Mode*/
var styles = {
        default: null,
        night: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ],
      };

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

var nightModeEnable = false
function nightModeToggle(){
  nightModeEnable = !nightModeEnable
  if (nightModeEnable){
    map.setOptions({styles:styles.night});
  }
  else {
    map.setOptions({styles:styles.default});
    }
  }

/*Overlays background-color toggle*/
$(document).ready(function(){
  $("#overlays #traffic li").toggle(
    function(){$("#overlays #traffic li").css({"background": "#F2F4F4"});},
    function(){$("#overlays #traffic li").css({"background": "white"});
  });
});

$(document).ready(function(){
  $("#overlays #bike li").toggle(
    function(){$("#overlays #bike li").css({"background": "#F2F4F4"});},
    function(){$("#overlays #bike li").css({"background": "white"});
  });
});

$(document).ready(function(){
  $("#overlays #night li").toggle(
    function(){$("#overlays #night li").css({"background": "#F2F4F4"});},
    function(){$("#overlays #night li").css({"background": "white"});
  });
});


google.maps.event.addDomListener(window, 'load', initMap);
