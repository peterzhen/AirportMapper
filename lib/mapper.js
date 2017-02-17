import { createResultsLabel,
         noResults,
         clearResults,
         computeMiles } from "./util";

import { positionMap, drawPath, clearMap } from "./map";

class Mapper {
  constructor( map ){
    this.map = map;
    this.timer = null;
    this.startLocation = null;
    this.endLocation = null;
    this.startMarker = null;
    this.endMarker = null;
    this.path = null;
    this.focusedInput = null;
    this.mode = 'MILES';
    this.placeService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow();
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    this.origin = document.getElementById('origin');
    this.destination = document.getElementById('destination');

    this.handleSuggestions = this.handleSuggestions.bind(this);

    this.bindInput(this.origin);
    this.bindInput(this.destination);
    this.bindFocus(this.origin);
    this.bindFocus(this.destination);
    this.bindModeSelect();
  }

  search(event){
    this.placeService.textSearch({
      query: `${event.target.value}`,
      type: 'airport'
    }, this.handleSuggestions);
  }

  bindInput(input){
    input.oninput = event => {
      clearTimeout(this.timer);
      if ( event.target.value.length > 0 ){
        this.timer = setTimeout( () => this.search(event), 100);
      } else {
        clearResults();
      }
    };
  }

  bindFocus(input){
    input.onfocus = event => {
      if (document.activeElement != this.focusedInput){
        clearResults();
        this.focusedInput = input;
        if ( event.target.value.length > 0 ){
          this.timer = setTimeout( () => this.search(event), 100);
        }
      }
    };
  }

  bindModeSelect(){
    const modesDom = [
      document.getElementById('ruler-button'),
      document.getElementById('walk-button'),
      document.getElementById('drive-button'),
      document.getElementById('transit-button')
    ];

    const modes = [
      'MILES',
      'WALKING',
      'DRIVING',
      'TRANSIT'
    ];

    modesDom.forEach( (mode, idx) => {
      mode.onclick = event => {
        this.clearBorder(modesDom);
        event.target.style.borderBottom = "3px solid #4885ed";
        this.mode = modes[idx];
        this.computeRoute();
      };
    });

    modesDom[0].style.borderBottom = "3px solid #4885ed";
  }

  clearBorder(modes){
    modes.forEach( mode => {
      mode.style.borderBottom = "3px solid white";
    });
  }

  handleSuggestions(suggestions, status){
    clearResults();
    createResultsLabel("Suggestions");
    if (status === google.maps.places.PlacesServiceStatus.OK){
      //TODO sort suggestions
      suggestions.forEach( suggestion => {
        if (suggestion.formatted_address.match("United States")){
          if (suggestion.rating){
            //positionMap(suggestion);
            this.appendSuggestion(suggestion);
          }
        }
      });
    } else {
      noResults();
    }
  }

  appendSuggestion(suggestion) {
    const result = document.createElement('li');
    result.className = "result";
    result.appendChild(document.createTextNode(suggestion.name));
    document.getElementById('results-container').appendChild(result);
    result.onclick = () => {
      clearResults();
      if (this.focusedInput.id === "origin"){
        this.startLocation = suggestion;
        this.origin.value = suggestion.name;
        this.startMarker = positionMap(this.startMarker, this.map, suggestion);
      } else {
        this.endLocation = suggestion;
        this.destination.value = suggestion.name;
        this.endMarker = positionMap(this.endMarker, this.map, suggestion);
      }
      // this.setMarker(suggestion);
      this.computeRoute();
    };
  }

  computeRoute(){
    if (this.startLocation && this.endLocation){
      if (this.mode === "MILES"){
        this.plotMiles();
      } else {
        clearMap([this.startMarker, this.endMarker, this.path]);
        this.plotDirection();
      }
    }
  }

  plotMiles(){
    const start = this.startLocation.geometry.location;
    const end = this.endLocation.geometry.location;
    const miles = computeMiles(start,end);
    clearResults();
    this.directionsDisplay.setMap(null);
    if (this.path) this.path.setMap(null);
    createResultsLabel(`Distance: ${miles} Nautical Miles`,
                        "results-label miles-label");
    if (!this.startMarker.getMap()){
      this.startMarker.setMap(this.map);
      this.endMarker.setMap(this.map);
    }
    this.path = drawPath(this.map, start, end);
  }

  plotDirection(){
    clearResults();
    this.directionsService.route({
        origin: {'placeId': this.startLocation.place_id},
        destination: {'placeId': this.endLocation.place_id},
        travelMode: this.mode
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setMap(this.map);
          this.directionsDisplay.setDirections(response);
        } else {
          createResultsLabel(status);
        }
    });
  }


  // resetBounds() {
  //   const bounds = new google.maps.LatLngBounds();
  //   bounds.extend(this.startLocation.geometry.location);
  //   bounds.extend(this.endLocation.geometry.location);
  //   // this.map.panTo(350,0);
  // }

  configureInfoWindow(){
    const infowindowContent = document.getElementById('infowindow-content');
    this.infoWindow.setContent(infowindowContent);
  }
}

export default Mapper;
