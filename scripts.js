var places;
var marker;
var origin, destination;
var originLat;
var originLng;
var destinationLat;
var destinationLng;
var destinationList;
var minDistance=Number.MAX_VALUE;
var flag=false;


function calcShortDist()
{
  let destLength=destinationList.length;
  var directionsService = new google.maps.DirectionsService();

  for(let j=0;j<destLength;j++){
    let destLt=destinationList[j].geometry.location.lat();
    let destLg=destinationList[j].geometry.location.lng();
    var request = {
                     origin      : new google.maps.LatLng(originLat, originLng),
                     destination : new google.maps.LatLng(destLt, destLg),
                     travelMode  : google.maps.DirectionsTravelMode.DRIVING
                   };

    directionsService.route(request,function(response, status) {
      if ( status == google.maps.DirectionsStatus.OK ) {
        if(minDistance >response.routes[0].legs[0].distance.value){
          minDistance= response.routes[0].legs[0].distance.value;
          destinationLat=response.routes[0].legs[0].end_location.lat();
          destinationLng=response.routes[0].legs[0].end_location.lng();
          localStorage.setItem('address',response.routes[0].legs[0].end_address);
          localStorage.setItem('time',response.routes[0].legs[0].duration.text);
        }
      }
    })
  }
flag=true;
alert("Nearest Destination Found : Click DETAILS");
}

function getDestinationDetails(){
  if (flag===true){
    alert('Nearest destination address : '+localStorage.getItem('address')+' and estimated time taken would be : '
           +localStorage.getItem('time'));  
    var flightPlanCoordinates = [
          {lat: originLat, lng: originLng},
          {lat: destinationLat, lng: destinationLng},
    ];
    var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
    });
    flightPath.setMap(map);
    flag=false;
  }else{
    alert("ERROR: Enter destination");
  }
}

function refresh(event){
        setTimeout("location.reload(true);", 0);
}

function searchPlaces(){
  var itemName=document.getElementById("specific").value;
  var latitude= places[0].geometry.location.lat();
  var longitude=places[0].geometry.location.lng();
  var place = new google.maps.LatLng(latitude, longitude);
  infowindow = new google.maps.InfoWindow({
               maxWidth:200
  });
  map = new google.maps.Map(
        document.getElementById('map'), {center: place, zoom: 15}
  );
  var request = {
      location:place,
      radius:500,
      query: itemName
  };
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  destinationList=results;
  var tableID=document.getElementById('table-body');
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      var info = results[i];
      let tableRow=document.createElement('tr');
      let tableCol1=document.createElement('td');
      let tableCol2=document.createElement('td');
      let col1=document.createTextNode(info.name);
      let col2=document.createTextNode(info.formatted_address);
      tableCol1.appendChild(col1);
      tableCol2.appendChild(col2);
      tableRow.appendChild(tableCol1);
      tableRow.appendChild(tableCol2);
      tableID.append(tableRow);
      tableRow.onclick=(function(data){
          return  function(){
                      var image="http://maps.google.com/mapfiles/ms/icons/blue.png";
                      var finalmarker = new google.maps.Marker({
                         map: map,
                         animation:google.maps.Animation.DROP,
                         position: data.geometry.location,
                         icon: image
                      });
                  }
      })(results[i]);
      createMarker(info);
    }
  }
}
                        
function createMarker(place){
  marker =  new google.maps.Marker({
               map: map,
               animation:google.maps.Animation.DROP,
               position: place.geometry.location
            });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

async function getCurrentLocation(){
  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8781136, lng: -87.62979819999998},
          zoom: 6
        });
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
      };
  infoWindow.setPosition(pos);
  infoWindow.setContent('We found you');
  infoWindow.open(map);
  map.setCenter(pos);
  originLat=pos.lat;
  originLng=pos.lng;            
  }, await function() {
      handleLocationError(true, infoWindow, map.getCenter());
          });
  }   
}

function initAutocomplete() {
  var markers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:41.8781136 , lng:-87.62979819999998},
          zoom: 13,
          mapTypeId: 'roadmap'
  });
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
  });
  searchBox.addListener('places_changed', function() {
    places = searchBox.getPlaces();
    if (places.length == 0) {
            return;
    }
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
  if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
  }
  var icon = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };
  markers.push(new google.maps.Marker({
    map: map,
    icon: icon,
    title: place.name,
    position: place.geometry.location
  }));
  if (place.geometry.viewport) {
    bounds.union(place.geometry.viewport);
  } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
  });
  getCurrentLocation();
}