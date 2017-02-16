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

export const configureInfoWindow = infoWindow => {
  const infowindowContent = document.getElementById('infowindow-content');
  infoWindow.setContent(infowindowContent);
};
