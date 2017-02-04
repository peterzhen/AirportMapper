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
  }
};

window.initMap = initMap;
