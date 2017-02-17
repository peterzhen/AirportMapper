import { bindSidebarDrawer } from "./sidebar";
import MappingService from "./mappingService";

const initMap = () => {

  //initialize map
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37, lng: -97},
    zoom: 4,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    }
  });

  bindSidebarDrawer(map);
  new MappingService(map);
};

window.initMap = initMap;
