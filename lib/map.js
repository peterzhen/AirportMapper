export const accessCurrentLocation = map => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const currentLocation = new google.maps.LatLng(pos);
      map.setCenter(currentLocation);
      map.setZoom(13);

      // info window for current location
      const infoWindow = new google.maps.InfoWindow({map: map});
      infoWindow.setPosition(pos);
      infoWindow.setContent('Current Location');
    });
  }
};

export const positionMap = (currentMarker, map, place) => {
  if (currentMarker) currentMarker.setMap(null);
  map.setCenter(place.geometry.location);
  map.setZoom(10);

  const marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    animation: google.maps.Animation.DROP
  });

  return marker;
};

export const drawPath = (map, start, end) => {
  const path = new google.maps.Polyline({
          path: [start,end],
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

  path.setMap(map);
  fitBounds(map, [start,end]);
  return path;
};

const fitBounds = (map, elements) => {
  const bounds = new google.maps.LatLngBounds();
  elements.forEach( element => {
    bounds.extend(element);
  });
  map.fitBounds(bounds);
};

export const clearMap = elements=> {
  elements.forEach( element => {
    if (element) element.setMap(null);
  });
};

// <div id="infowindow-content">
//       <img src="" width="16" height="16" id="place-icon">
//       <span id="place-name"  class="title"></span><br>
//       <span id="place-address"></span>
//     </div>
