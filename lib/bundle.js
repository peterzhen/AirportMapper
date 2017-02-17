/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _sidebar = __webpack_require__(1);
	
	var _mappingService = __webpack_require__(6);
	
	var _mappingService2 = _interopRequireDefault(_mappingService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initMap = function initMap() {
	
	  //initialize map
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: 37, lng: -97 },
	    zoom: 4,
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	      position: google.maps.ControlPosition.TOP_RIGHT
	    }
	  });
	
	  (0, _sidebar.bindSidebarDrawer)(map);
	  new _mappingService2.default(map);
	};
	
	window.initMap = initMap;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var hidden = false; //sidebar status
	
	// binds button to hide and show sidebar
	var bindSidebarDrawer = exports.bindSidebarDrawer = function bindSidebarDrawer(map) {
	  var button = document.getElementById("hide-sidebar-button");
	  var sideBar = document.getElementById("side-bar");
	
	  button.onclick = function (event) {
	    if (hidden === false) {
	      closeSidebar(button, sideBar, map);
	    } else {
	      openSidebar(button, sideBar, map);
	    }
	    resize();
	  };
	};
	
	// close sidebar
	var closeSidebar = function closeSidebar(button, sideBar) {
	  sideBar.style.marginLeft = "-300px";
	  button.innerHTML = ">";
	  hidden = true;
	};
	
	// open sidebar
	var openSidebar = function openSidebar(button, sideBar, map) {
	  sideBar.style.marginLeft = "0px";
	  button.innerHTML = "<";
	  hidden = false;
	};
	
	// triggers the map to resize based on available size
	var resize = function resize() {
	  setTimeout(function () {
	    google.maps.event.trigger(map, "resize");
	  }, 550);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// positions the map to place and drops a marker
	var positionMap = exports.positionMap = function positionMap(currentMarker, map, place) {
	  if (currentMarker) currentMarker.setMap(null);
	  map.setCenter(place.geometry.location);
	  map.setZoom(10);
	
	  var marker = new google.maps.Marker({
	    position: place.geometry.location,
	    map: map,
	    animation: google.maps.Animation.DROP
	  });
	
	  return marker;
	};
	
	// draws a polyline given two points
	var drawPath = exports.drawPath = function drawPath(map, start, end) {
	  var path = new google.maps.Polyline({
	    path: [start, end],
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });
	
	  path.setMap(map);
	  fitBounds(map, [start, end]);
	  return path;
	};
	
	// adjusts viewport to show all markers
	var fitBounds = function fitBounds(map, elements) {
	  var bounds = new google.maps.LatLngBounds();
	  elements.forEach(function (element) {
	    bounds.extend(element);
	  });
	  map.fitBounds(bounds);
	};
	
	// takes in an array and clears all elements from map in array
	var clearMap = exports.clearMap = function clearMap(mapElements) {
	  mapElements.forEach(function (element) {
	    if (element) {
	      element.setMap(null);
	    }
	  });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// adds title to autocomplete suggestions
	var createResultsLabel = exports.createResultsLabel = function createResultsLabel(string) {
	  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "results-label";
	
	  var resultsLabel = document.createElement('div');
	  resultsLabel.className = className;
	  resultsLabel.innerHTML = string;
	  document.getElementById('results-container').appendChild(resultsLabel);
	};
	
	// displays error for no results
	var noResults = exports.noResults = function noResults() {
	  var result = document.createElement('li');
	  result.className = "result";
	  result.appendChild(document.createTextNode("No Results"));
	  document.getElementById('results-container').appendChild(result);
	};
	
	// clears results-container
	var clearResults = exports.clearResults = function clearResults() {
	  document.getElementById('results-container').innerHTML = "";
	};
	
	// appends place name and address to results-container
	var appendData = exports.appendData = function appendData(place) {
	  var result = document.createElement('li');
	  result.className = "results-data";
	  result.appendChild(document.createTextNode(place.name));
	  result.appendChild(document.createElement("br"));
	  result.appendChild(document.createElement("br"));
	  result.appendChild(document.createTextNode(place.formatted_address));
	  result.appendChild(document.createElement("br"));
	  document.getElementById('results-container').appendChild(result);
	};
	
	// adds empty space to results-container
	var appendSpace = exports.appendSpace = function appendSpace() {
	  var result = document.createElement('li');
	  result.appendChild(document.createElement("br"));
	  document.getElementById('results-container').appendChild(result);
	};
	
	// sets mode buttons to have a white bottom border
	var clearBorder = exports.clearBorder = function clearBorder(modes) {
	  modes.forEach(function (mode) {
	    mode.style.borderBottom = "3px solid white";
	  });
	};
	
	// converts number to radians
	var toRad = function toRad(num) {
	  return num * (Math.PI / 180);
	};
	
	// computes miles between two points using the Haversine Formula
	var computeMiles = exports.computeMiles = function computeMiles(startLoc, endLoc) {
	  var lat = toRad(startLoc.lat() - endLoc.lat());
	  var lng = toRad(startLoc.lng() - endLoc.lng());
	  var r = 3956; //miles
	
	  var a = Math.sin(lat / 2) * Math.sin(Math.sin(lat / 2)) + Math.cos(toRad(startLoc.lat())) * Math.cos(toRad(endLoc.lat())) * Math.sin(lng / 2) * Math.sin(lng / 2);
	
	  var c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
	  return (r * c).toFixed(2);
	};
	
	// shortens string to 30 characters
	var shortenName = exports.shortenName = function shortenName(name) {
	  if (name.length > 30) {
	    return name.slice(0, 30) + "...";
	  } else {
	    return name;
	  }
	};

/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _map = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MappingService = function () {
	  function MappingService(map) {
	    _classCallCheck(this, MappingService);
	
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
	    this.directionsService = new google.maps.DirectionsService();
	    this.directionsDisplay = new google.maps.DirectionsRenderer();
	
	    //input fields for search
	    this.origin = document.getElementById('origin');
	    this.destination = document.getElementById('destination');
	
	    this.handleSuggestions = this.handleSuggestions.bind(this);
	
	    //bind listeners to input field
	    this.bindInput(this.origin);
	    this.bindInput(this.destination);
	    this.bindFocus(this.origin);
	    this.bindFocus(this.destination);
	    this.bindModeSelect();
	  }
	
	  // executes a google place search restricting type to airport
	
	
	  _createClass(MappingService, [{
	    key: "search",
	    value: function search(event) {
	      this.placeService.textSearch({
	        query: "" + event.target.value,
	        type: 'airport'
	      }, this.handleSuggestions);
	    }
	
	    // binds input to listen to input changes
	    // uses global timeout on searches to prevent overqueries
	
	  }, {
	    key: "bindInput",
	    value: function bindInput(input) {
	      var _this = this;
	
	      input.oninput = function (event) {
	        clearTimeout(_this.timer);
	        if (event.target.value.length > 0) {
	          _this.timer = setTimeout(function () {
	            return _this.search(event);
	          }, 150);
	        } else {
	          (0, _util.clearResults)();
	        }
	      };
	    }
	
	    // saves last focused input
	
	  }, {
	    key: "bindFocus",
	    value: function bindFocus(input) {
	      var _this2 = this;
	
	      input.onfocus = function (event) {
	        if (document.activeElement != _this2.focusedInput) {
	          (0, _util.clearResults)();
	          _this2.focusedInput = input;
	          if (event.target.value.length > 0) {
	            _this2.timer = setTimeout(function () {
	              return _this2.search(event);
	            }, 100);
	          }
	        }
	      };
	    }
	
	    //bind onclick to each transportation mode
	
	  }, {
	    key: "bindModeSelect",
	    value: function bindModeSelect() {
	      var _this3 = this;
	
	      var modesDom = [document.getElementById('ruler-button'), document.getElementById('walk-button'), document.getElementById('drive-button'), document.getElementById('transit-button')];
	
	      var modes = ['MILES', 'WALKING', 'DRIVING', 'TRANSIT'];
	
	      modesDom.forEach(function (mode, idx) {
	        mode.onclick = function (event) {
	          (0, _util.clearBorder)(modesDom);
	          event.target.style.borderBottom = "3px solid #4885ed";
	          _this3.mode = modes[idx];
	          _this3.computeRoute();
	        };
	      });
	
	      // highlight default mode
	      modesDom[0].style.borderBottom = "3px solid #4885ed";
	    }
	
	    // displays autocomplete suggestions
	
	  }, {
	    key: "handleSuggestions",
	    value: function handleSuggestions(suggestions, status) {
	      var _this4 = this;
	
	      (0, _util.clearResults)();
	      (0, _util.createResultsLabel)("Suggestions");
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	        suggestions.forEach(function (suggestion) {
	          if (suggestion.formatted_address.match("United States")) {
	            if (suggestion.rating) {
	              _this4.appendSuggestion(suggestion);
	            }
	          }
	        });
	      } else {
	        (0, _util.noResults)();
	      }
	    }
	
	    // configures single suggestion with data and click handler
	
	  }, {
	    key: "appendSuggestion",
	    value: function appendSuggestion(suggestion) {
	      var _this5 = this;
	
	      var result = document.createElement('li');
	      result.className = "result";
	      result.appendChild(document.createTextNode(suggestion.name));
	      document.getElementById('results-container').appendChild(result);
	      result.onclick = function () {
	        (0, _util.clearResults)();
	        if (_this5.focusedInput.id === "origin") {
	          _this5.setStart(suggestion);
	          _this5.startMarker = (0, _map.positionMap)(_this5.startMarker, _this5.map, suggestion);
	        } else {
	          _this5.setEnd(suggestion);
	          _this5.endMarker = (0, _map.positionMap)(_this5.endMarker, _this5.map, suggestion);
	        }
	        _this5.computeRoute();
	      };
	    }
	
	    // replaces input box with origin location
	
	  }, {
	    key: "setStart",
	    value: function setStart(suggestion) {
	      var originContainer = document.getElementById('origin-container');
	      var originLabel = document.createElement('div');
	      originLabel.className = "label";
	      originLabel.innerHTML = (0, _util.shortenName)(suggestion.name);
	      originLabel.appendChild(this.setEdit(originContainer, "origin"));
	      originContainer.replaceChild(originLabel, this.origin);
	      this.startLocation = suggestion;
	    }
	
	    // replaces input box with destination location
	
	  }, {
	    key: "setEnd",
	    value: function setEnd(suggestion) {
	      var destinationContainer = document.getElementById('destination-container');
	      var destinationLabel = document.createElement('div');
	      destinationLabel.className = "label";
	      destinationLabel.innerHTML = (0, _util.shortenName)(suggestion.name);
	      destinationLabel.appendChild(this.setEdit(destinationContainer, "destination"));
	      destinationContainer.replaceChild(destinationLabel, this.destination);
	      this.endLocation = suggestion;
	    }
	
	    // adds edit button to locations
	
	  }, {
	    key: "setEdit",
	    value: function setEdit(container, type) {
	      var _this6 = this;
	
	      var editButton = document.createElement('img');
	      editButton.className = "edit";
	      editButton.src = "assets/images/edit.png";
	      editButton.onclick = function () {
	        (0, _util.clearResults)();
	        if (type === "origin") {
	          _this6.origin.value = "";
	          _this6.startLocation = null;
	          (0, _map.clearMap)([_this6.startMarker, _this6.path, _this6.directionsDisplay]);
	          container.replaceChild(_this6.origin, container.children[0]);
	        } else {
	          _this6.destination.value = "";
	          _this6.endLocation = null;
	          (0, _map.clearMap)([_this6.endMarker, _this6.path, _this6.directionsDisplay]);
	          container.replaceChild(_this6.destination, container.children[0]);
	        }
	      };
	      return editButton;
	    }
	
	    // calculates route if enough route info is given
	
	  }, {
	    key: "computeRoute",
	    value: function computeRoute() {
	      if (this.startLocation && this.endLocation) {
	        if (this.mode === "MILES") {
	          this.plotMiles();
	        } else {
	          this.plotDirection();
	        }
	      }
	    }
	
	    /* Calculates distance between two points and plots the
	    * map elements on the map
	    */
	
	  }, {
	    key: "plotMiles",
	    value: function plotMiles() {
	      var start = this.startLocation.geometry.location;
	      var end = this.endLocation.geometry.location;
	      var miles = (0, _util.computeMiles)(start, end);
	      (0, _util.clearResults)();
	      (0, _map.clearMap)([this.path, this.directionsDisplay]);
	
	      // creates sidebar data
	      (0, _util.createResultsLabel)("Distance: " + miles + " Nautical Miles", "results-label miles-label");
	
	      //appends start location data to sidebar
	      (0, _util.appendSpace)();
	      (0, _util.createResultsLabel)("START LOCATION");
	      (0, _util.appendData)(this.startLocation);
	
	      //appends end location data to sidebar
	      (0, _util.appendSpace)();
	      (0, _util.createResultsLabel)("END LOCATION");
	      (0, _util.appendData)(this.endLocation);
	
	      if (!this.startMarker.getMap()) {
	        this.startMarker.setMap(this.map);
	        this.endMarker.setMap(this.map);
	      }
	      this.path = (0, _map.drawPath)(this.map, start, end);
	    }
	
	    // uses google directions service to plot route on map
	
	  }, {
	    key: "plotDirection",
	    value: function plotDirection() {
	      var _this7 = this;
	
	      //clears map and sidebar before plotting
	      (0, _map.clearMap)([this.startMarker, this.endMarker, this.path, this.directionsDisplay]);
	      (0, _util.clearResults)();
	      (0, _util.createResultsLabel)("LOADING...");
	
	      // performs a directionsService request based on selected this.mode
	      this.directionsService.route({
	        origin: { 'placeId': this.startLocation.place_id },
	        destination: { 'placeId': this.endLocation.place_id },
	        travelMode: this.mode
	      }, function (response, status) {
	        if (status === 'OK') {
	          (0, _util.clearResults)();
	          _this7.directionsDisplay.setMap(_this7.map);
	          _this7.directionsDisplay.setDirections(response);
	          (0, _util.createResultsLabel)(_this7.mode + " INSTRUCTIONS");
	          _this7.directionsDisplay.setPanel(document.getElementById('results-container'));
	        } else {
	          (0, _util.createResultsLabel)(status);
	        }
	      });
	    }
	  }]);
	
	  return MappingService;
	}();
	
	exports.default = MappingService;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map