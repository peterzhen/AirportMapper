import { bindSidebarDrawer } from "./sidebar"

const accessCurrentLocation = map => {
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

const initMap = () => {
  let autosuggestTimer;

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
  // accessCurrentLocation(map);

  const input = document.getElementById('input');

  const countryRestrict = {'country': 'us'};
  const typeRestrict = {'types' : ['airport']};

  const filterSuggestions = (suggestion, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK){
      if (suggestion.types.includes("airport")){
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(suggestion.name));
        document.getElementById('results-container').appendChild(li);
      }
    } else {
      console.log(status);
    }
  };

  const handleSuggestions = (suggestion, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK){
      suggestion.forEach( suggestion => {
        const request = {
          placeId: `${suggestion.place_id}`
        };
        window.result = suggestion;
        positionMap(suggestion);
        if (suggestion.formatted_address.match("United States")){
          if (suggestion.rating){
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(suggestion.name));
            document.getElementById('results-container').appendChild(li);
          }
        }

        // placeService.getDetails(request, filterSuggestions);
      });
    } else {
      console.log(status);
    }
  };

  const service = new google.maps.places.AutocompleteService();
  const placeService = new google.maps.places.PlacesService(map);

  // //autocomplete oninput
  // input.oninput = event => {
  //   document.getElementById('results-container').innerHTML = "";
  //   if ( input.value.length > 0 ){
  //     service.getPlacePredictions({
  //       input: `${input.value}`,
  //       location: new google.maps.LatLng(0,0),
  //       radius: 20000000,
  //       offset: 1,
  //       componentRestrictions: {
  //         country: 'us'
  //       }
  //     }, handleSuggestions);
  //   }
  // };

  //peforms a Places Google search for autocomplete
  input.oninput = event => {
    document.getElementById('results-container').innerHTML = "";
    if ( input.value.length > 0 ){
      clearTimeout(autosuggestTimer);
      autosuggestTimer = setTimeout( () => {
          placeService.textSearch({
          query: `${input.value}`,
          type: 'airport'
          }, handleSuggestions);
        }, 100);
    }
  };

  window.input = input;


  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
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

    window.place = place;

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
    // map.panBy(-150,0);
  };
};

window.initMap = initMap;
