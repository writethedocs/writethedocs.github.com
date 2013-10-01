// google maps

// some globals about our map location
var map;
var loc = new google.maps.LatLng(45.526299,-122.688143);
var markerPos = new google.maps.LatLng(45.526299,-122.688143);

// called from body.onload
function initialize() {

  // some custom styling for a washed out look
  var stylers = [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          { "saturation": "-70" }
        ]
    }
  ];

  var mapOptions = {
    zoom: 14,
    center: loc,
    mapTypeId: 'venue',
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var styledMapOptions = {
    map: map,
    name: "venue-map"
  }
  var marker = new google.maps.Marker({
    position: markerPos,
    map: map,
    title: "Portland"
  });

  var infowindow = new google.maps.InfoWindow({
    maxWidth: 500,
    position: markerPos,
    content: '<div class="clearfix"><h4>Portland, Oregon</h4></div>'
  });

  // uncomment to show marker popup at load vs user click on marker
  // infowindow.open(map);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  var testmap =  new google.maps.StyledMapType(stylers, styledMapOptions);

  map.mapTypes.set('venue', testmap);
  map.setMapTypeId('venue');
}
