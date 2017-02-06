let hidden = false;

const initMap = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.757534, lng: -73.892648},
    zoom: 10,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    }
  });

  const button = document.getElementById("hide-sidebar-button");
  const sideBar = document.getElementById("side-bar");

  button.onclick = event => {
    if (hidden === false){
      sideBar.style.left = "-275px";
      button.innerHTML = ">";
      hidden = true;
    } else {
      sideBar.style.left = "0px";
      button.innerHTML = "<";
      hidden = false;
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const currentLocation = new google.maps.LatLng(pos);
      map.setCenter(currentLocation);
      map.setZoom(13);

      //info window for current location
      // const infoWindow = new google.maps.InfoWindow({map: map});
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Current Location');
    });

    const card = document.getElementById('pac-card');
    const input = document.getElementById('input');

    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  }
};

window.initMap = initMap;
