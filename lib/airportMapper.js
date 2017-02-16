import { bindSidebarDrawer } from "./sidebar";
import { accessCurrentLocation,
         configureInfoWindow } from "./map";
import { handleSuggestions } from "./util";

const initMap = () => {
  let autosuggestTimer;
  let startLocation;
  let endLocation;

  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37, lng: -110},
    zoom: 4,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    }
  });

  bindSidebarDrawer();

  const origin = document.getElementById('origin');
  const destination = document.getElementById('destination');

  const placeService = new google.maps.places.PlacesService(map);

  //peforms a Places Google search for autocomplete
  origin.oninput = event => {
    if ( origin.value.length > 0 ){
      clearTimeout(autosuggestTimer);
      autosuggestTimer = setTimeout( () => {
          placeService.textSearch({
          query: `${origin.value}`,
          type: 'airport'
          }, handleSuggestions);
        }, 100);
    }
  };

  window.origin = origin;


  const infowindow = new google.maps.InfoWindow();
  configureInfoWindow(infowindow);


  const marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    animation: google.maps.Animation.DROP,
  });

  const positionMap = place => {
    window.place = place;
    infowindow.close();
    marker.setVisible(false);

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    map.setCenter(place.geometry.location);
    map.setZoom(13);

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
    // map.panBy(-150,0);
  };
};

window.initMap = initMap;
