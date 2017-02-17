import { createResultsLabel,
         noResults,
         clearResults,
         computeMiles,
         shortenName,
         clearBorder,
         appendData,
         appendSpace
       } from "./util";

import { positionMap,
         drawPath,
         clearMap
        } from "./map";

class Mapper {
  constructor(map){
    this.map = map;
    this.timer = null;
    this.startLocation = null;
    this.endLocation = null;
    this.startMarker = null;
    this.endMarker = null;
    this.path = null;
    this.focusedInput = null;
    this.mode = 'MILES';

    //google services
    this.placeService = new google.maps.places.PlacesService(map);
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

  // executes a google place search
  search(event){
    this.placeService.textSearch({
      query: `${event.target.value}`,
      type: 'airport'
    }, this.handleSuggestions);
  }

  // binds input to listen to input changes
  // uses global timeout on searches to prevent overqueries
  bindInput(input){
    input.oninput = event => {
      clearTimeout(this.timer);
      if ( event.target.value.length > 0 ){
        this.timer = setTimeout( () => this.search(event), 150);
      } else {
        clearResults();
      }
    };
  }

  // saves last focused input
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

  //bind onclick to each transportation mode
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
        clearBorder(modesDom);
        event.target.style.borderBottom = "3px solid #4885ed";
        this.mode = modes[idx];
        this.computeRoute();
      };
    });

    // highlight default mode
    modesDom[0].style.borderBottom = "3px solid #4885ed";
  }

  // displays autocomplete suggestions
  handleSuggestions(suggestions, status){
    clearResults();
    createResultsLabel("Suggestions");
    if (status === google.maps.places.PlacesServiceStatus.OK){
      suggestions.forEach( suggestion => {
        if (suggestion.formatted_address.match("United States")){
          if (suggestion.rating){
            this.appendSuggestion(suggestion);
          }
        }
      });
    } else {
      noResults();
    }
  }

  // configures single suggestion with data and click handler
  appendSuggestion(suggestion) {
    const result = document.createElement('li');
    result.className = "result";
    result.appendChild(document.createTextNode(suggestion.name));
    document.getElementById('results-container').appendChild(result);
    result.onclick = () => {
      clearResults();
      if (this.focusedInput.id === "origin"){
        this.setStart(suggestion);
        this.startMarker = positionMap(this.startMarker, this.map, suggestion);
      } else {
        this.setEnd(suggestion);
        this.endMarker = positionMap(this.endMarker, this.map, suggestion);
      }
      this.computeRoute();
    };
  }

  // replaces input box with origin location
  setStart(suggestion){
    const originContainer = document.getElementById('origin-container');
    const originLabel = document.createElement('div');
    originLabel.className = "label";
    originLabel.innerHTML = shortenName(suggestion.name);
    originLabel.appendChild(this.setEdit(originContainer, "origin"));
    originContainer.replaceChild(originLabel, this.origin);
    this.startLocation = suggestion;
  }

  // replaces input box with destination location
  setEnd(suggestion){
    const destinationContainer = document.getElementById('destination-container');
    const destinationLabel = document.createElement('div');
    destinationLabel.className = "label";
    destinationLabel.innerHTML = shortenName(suggestion.name);
    destinationLabel.appendChild(this.setEdit(destinationContainer, "destination"));
    destinationContainer.replaceChild(destinationLabel, this.destination);
    this.endLocation = suggestion;
  }

  // adds edit button to locations
  setEdit(container, type){
    const editButton = document.createElement('img');
    editButton.className = "edit";
    editButton.src = "assets/images/edit.png";
    editButton.onclick = () => {
      clearResults();
      if (type === "origin"){
        this.origin.value = "";
        this.startLocation = null;
        clearMap([
          this.startMarker,
          this.path,
          this.directionsDisplay
        ]);
        container.replaceChild(this.origin, container.children[0]);
      } else {
        this.destination.value = "";
        this.endLocation = null;
        clearMap([
          this.endMarker,
          this.path,
          this.directionsDisplay
        ]);
        container.replaceChild(this.destination, container.children[0]);
      }
    };
    return editButton;
  }

  // calculates route if enough route info is given
  computeRoute(){
    if (this.startLocation && this.endLocation){
      if (this.mode === "MILES"){
        this.plotMiles();
      } else {
        this.plotDirection();
      }
    }
  }

  /* Calculates distance between two points and plots the
  * map elements on the map
  */
  plotMiles(){
    const start = this.startLocation.geometry.location;
    const end = this.endLocation.geometry.location;
    const miles = computeMiles(start,end);
    clearResults();
    clearMap([
      this.path,
      this.directionsDisplay
    ]);

    // creates sidebar data
    createResultsLabel(`Distance: ${miles} Nautical Miles`,
                        "results-label miles-label");

    appendSpace();
    createResultsLabel("START LOCATION");
    appendData(this.startLocation);

    appendSpace();
    createResultsLabel("END LOCATION");
    appendData(this.endLocation);

    if (!this.startMarker.getMap()){
      this.startMarker.setMap(this.map);
      this.endMarker.setMap(this.map);
    }
    this.path = drawPath(this.map, start, end);
  }

  // uses google directions service to plot route on map
  plotDirection(){
    clearMap([
      this.startMarker,
      this.endMarker,
      this.path,
      this.directionsDisplay
    ]);
    clearResults();
    this.directionsService.route({
        origin: {'placeId': this.startLocation.place_id},
        destination: {'placeId': this.endLocation.place_id},
        travelMode: this.mode
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setMap(this.map);
          this.directionsDisplay.setDirections(response);
          createResultsLabel(`${this.mode} INSTRUCTIONS`);
          this.directionsDisplay.setPanel(document.getElementById('results-container'));
        } else {
          createResultsLabel(status);
        }
    });
  }
}

export default Mapper;
