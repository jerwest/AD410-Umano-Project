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


/*  Geocoding - Addresses */

var locations = [
	  [
	  '<strong>Single-Family</strong><br>\r\
    	401 31st Ave Seattle WA	98122 <br>\
    	<a href="https://goo.gl/maps/hT4CE1bRz2jVKDL59">Get Directions</a>',
		47.605317, -122.292903,


		],
		 [
	  '<strong>Single-Family</strong><br>\r\
    	411 NE 94th St	Seattle	WA	98115 <br>\
    	<a href="https://goo.gl/maps/D3nBapfoaQruZTkx7">Get Directions</a>',
		47.696563, -122.324161,"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",



		],



		[
	  '<strong>Single-Family</strong><br>\r\
    	806 217th Place Northeast Sammamish	WA	98074 <br>\
    	<a href="https://goo.gl/maps/9ETrqhNHyxCZP4J89">Get Directions</a>',
		47.616734, -122.049723,



		],
		 [
	  '<strong>Condo/Townhome</strong><br>\r\
    	1100 106th Avenue Northeast #205 Bellevue WA 98004 <br>\
    	<a href="https://goo.gl/maps/1CTTttwP72s1Uipq6">Get Directions</a>',
		47.620572, -122.198734,



		],
		 [
	  '<strong>Single-Family</strong><br>\r\
    	1300 92nd Ave NE Lake Stevens	WA	98258 <br>\
    	<a href="https://goo.gl/maps/S4whT1Qev9bmNPxP8">Get Directions</a>',
		48.007992, -122.106533,



		],
		 [
	  '<strong>Multi-Family</strong><br>\r\
    	1419 Kirkland Avenue Northeast	Renton	WA	98056 <br>\
    	<a href="https://goo.gl/maps/S4whT1Qev9bmNPxP8">Get Directions</a>',
		47.505121, -122.178819,



		],
		 [
	  '<strong>Condo/Townhome</strong><br>\r\
    	1525 NW 57th St #525 Seattle WA	98107 <br>\
    	<a href="https://goo.gl/maps/wY7w22j28ExLLvT58">Get Directions</a>',
		47.66998, -122.377318,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	1710 103rd St Seattle	WA	98133 <br>\
    	<a href="https://goo.gl/maps/DUSehFpAWFSnHWSg9">Get Directions</a>',
		47.703418, -122.336969,

		],
		[
	 '<strong>Condo/TownhomeSingle-Family</strong><br>\r\
    	2201 3rd Avenue  Seattle	WA	98121<br>\
    	<a href="https://goo.gl/maps/m7VijgeXaV2C5c5u8">Get Directions</a>',
		47.613892, -122.34395,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	4120 183rd Place Southeast	Bothell	WA	98012<br>\
    	<a href="https://goo.gl/maps/m7VijgeXaV2C5c5u8">Get Directions</a>',
		47.831166, -122.176762,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	5037 S Bowen Place Seattle	WA	98118<br>\
    	<a href="https://goo.gl/maps/nFSGGTgdG6a6jWM77">Get Directions</a>',
		47.555938, -122.277854,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	5603 18th Avenue Southwest	Seattle	WA	98106<br>\
    	<a href="https://goo.gl/maps/MWsg7FMixUsxsxoCA">Get Directions</a>',
		47.551711, -122.357385,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	8613 Densmore Ave N	Seattle	WA	98103<br>\
    	<a href="https://goo.gl/maps/Zg94uLZVmCpnrHRV7">Get Directions</a>',
		47.692168, -122.338396,

		],
		[
	 '<strong>Condo/Townhome</strong><br>\r\
    	8851 166th Ave NE #A101	Bellevue WA	98052<br>\
    	<a href="https://goo.gl/maps/K7grZaVbLh7yK2n38">Get Directions</a>',
		47.681413, -122.11962,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	9328 63rd Place West Mukilteo WA 98275<br>\
    	<a href="https://goo.gl/maps/JWcEVH291cdms31f6">Get Directions</a>',
		47.913092, -122.319925,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	12834 176th Place Northeast	Redmond	WA	98052<br>\
    	<a href="https://goo.gl/maps/H2w7ivDwuVQRgbs19">Get Directions</a>',
		47.715468, -122.103608,

		],
		[
	 '<strong>Retail</strong><br>\r\
    	13311 NE 175th St Woodinville WA 98072<br>\
    	<a href="https://goo.gl/maps/jwFCW6Rzr7LSm2tA8">Get Directions</a>',
		47.754259, -122.161496,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	17536 Fremont Ave N	Shoreline WA 98133<br>\
    	<a href="https://goo.gl/maps/hzjEfLRHNvNnnCHE6">Get Directions</a>',
		47.756915, -122.350651,

		],
		[
	 '<strong>Single-Family</strong><br>\r\
    	20823 Northeast Inglewood Hill Road	Sammamish	WA	98074<br>\
    	<a href="https://goo.gl/maps/BffwGhhG8pBrcyaa9">Get Directions</a>',
		47.619707, -122.06143,

		],
		[
	 '<strong>Multi-Family</strong><br>\r\
    	2711 Northeast 115th Street	Seattle	WA	98125<br>\
    	<a href="https://goo.gl/maps/sKoSqgPVoKq8nPN47">Get Directions</a>',
		47.711699, -122.29867,

		],
		[
	'<strong>Multi-Family</strong><br>\r\
    	620 12th Avenue East Seattle WA	98102<br>\
    	<a href="https://goo.gl/maps/CXQayddEq4j4b7LF7">Get Directions</a>',
		47.624923, -122.316403,

		],
		[
	'<strong>Multi-Family</strong><br>\r\
    	2403 6th Ave W Seattle WA 98119<br>\
    	<a href="https://goo.gl/maps/yRVpiA3LuxrtbH3T6">Get Directions</a>',
		47.639865, -122.36519,

		],
		[
	'<strong>Multi-Family</strong><br>\r\
    	5818 Latona Avenue Northeast Seattle WA	98105<br>\
    	<a href="https://goo.gl/maps/nwvBkJ3rZzhq486Q9">Get Directions</a>',
		47.671405, -122.325231,

		],
		[
	'<strong>Office</strong><br>\r\
    	5017 196th Street Southwest	Lynnwood WA	98036<br>\
    	<a href="https://goo.gl/maps/dUePYscB5BMnE6T76">Get Directions</a>',
		47.821584 , -122.301419,

		],
		[
	'<strong>Multi-Family</strong><br>\r\
    	3837 Aurora Avenue North Seattle WA	98103<br>\
    	<a href="https://goo.gl/maps/LtZVEtZQcSvMbDrE9">Get Directions</a>',
		47.653878 , -122.347657,

		],
		[
	'<strong>Multi-Family</strong><br>\r\
    	4616 25th Ave NE #133 Seattle WA 98105<br>\
    	<a href="https://goo.gl/maps/yu1TpzbYNedDDPwg7">Get Directions</a>',
		47.66237 , -122.300133,

		]

    ];
