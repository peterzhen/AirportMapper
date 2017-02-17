// positions the map to place and drops a marker
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

// draws a polyline given two points
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

// adjusts viewport to show all markers
const fitBounds = (map, elements) => {
  const bounds = new google.maps.LatLngBounds();
  elements.forEach( element => {
    bounds.extend(element);
  });
  map.fitBounds(bounds);
};

// takes in an array and clears all elements from map in array
export const clearMap = mapElements => {
  mapElements.forEach( element => {
    if (element){
      element.setMap(null);
    }
  });
};
