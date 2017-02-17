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
	
	var _mapper = __webpack_require__(4);
	
	var _mapper2 = _interopRequireDefault(_mapper);
	
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
	  new _mapper2.default(map);
	};
	
	window.initMap = initMap;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var hidden = false;
	
	var bindSidebarDrawer = exports.bindSidebarDrawer = function bindSidebarDrawer(map) {
	  var button = document.getElementById("hide-sidebar-button");
	  var sideBar = document.getElementById("side-bar");
	
	  button.onclick = function (event) {
	    if (hidden === false) {
	      closeSidebar(button, sideBar, map);
	    } else {
	      openSidebar(button, sideBar, map);
	    }
	    resize(map);
	  };
	};
	
	var closeSidebar = function closeSidebar(button, sideBar) {
	  sideBar.style.marginLeft = "-300px";
	  button.innerHTML = ">";
	  hidden = true;
	};
	
	var openSidebar = function openSidebar(button, sideBar, map) {
	  sideBar.style.marginLeft = "0px";
	  button.innerHTML = "<";
	  hidden = false;
	};
	
	var resize = function resize(map) {
	  google.maps.event.trigger(map, "resize");
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var accessCurrentLocation = exports.accessCurrentLocation = function accessCurrentLocation(map) {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function (position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	
	      var currentLocation = new google.maps.LatLng(pos);
	      map.setCenter(currentLocation);
	      map.setZoom(13);
	
	      // info window for current location
	      var infoWindow = new google.maps.InfoWindow({ map: map });
	      infoWindow.setPosition(pos);
	      infoWindow.setContent('Current Location');
	    });
	  }
	};
	
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
	
	var fitBounds = function fitBounds(map, elements) {
	  var bounds = new google.maps.LatLngBounds();
	  elements.forEach(function (element) {
	    bounds.extend(element);
	  });
	  map.fitBounds(bounds);
	};
	
	var clearMap = exports.clearMap = function clearMap(elements) {
	  elements.forEach(function (element) {
	    if (element) element.setMap(null);
	  });
	};
	
	// <div id="infowindow-content">
	//       <img src="" width="16" height="16" id="place-icon">
	//       <span id="place-name"  class="title"></span><br>
	//       <span id="place-address"></span>
	//     </div>

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createResultsLabel = exports.createResultsLabel = function createResultsLabel(string) {
	  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "results-label";
	
	  var resultsLabel = document.createElement('div');
	  resultsLabel.className = className;
	  resultsLabel.innerHTML = string;
	  document.getElementById('results-container').appendChild(resultsLabel);
	};
	
	var noResults = exports.noResults = function noResults() {
	  var result = document.createElement('li');
	  result.className = "result";
	  result.appendChild(document.createTextNode("No Results"));
	  document.getElementById('results-container').appendChild(result);
	};
	
	var clearResults = exports.clearResults = function clearResults() {
	  document.getElementById('results-container').innerHTML = "";
	};
	
	var computeMiles = exports.computeMiles = function computeMiles(startLoc, endLoc) {
	  var latDiff = (startLoc.lat() - endLoc.lat()) * (Math.PI / 180);
	  var lngDiff = (startLoc.lng() - endLoc.lng()) * (Math.PI / 180);
	  var startLatRad = startLoc.lat() * (Math.PI / 180);
	  var endLatRad = endLoc.lat() * (Math.PI / 180);
	
	  var a = Math.sin(latDiff / 2) * Math.sin(Math.sin(latDiff / 2)) + Math.cos(startLatRad) * Math.cos(endLatRad) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
	  var c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;
	  return (3440 * c).toFixed(2);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _map = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mapper = function () {
	  function Mapper(map) {
	    _classCallCheck(this, Mapper);
	
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
	    this.directionsService = new google.maps.DirectionsService();
	    this.directionsDisplay = new google.maps.DirectionsRenderer();
	
	    this.origin = document.getElementById('origin');
	    this.destination = document.getElementById('destination');
	
	    this.handleSuggestions = this.handleSuggestions.bind(this);
	
	    this.bindInput(this.origin);
	    this.bindInput(this.destination);
	    this.bindFocus(this.origin);
	    this.bindFocus(this.destination);
	    this.bindModeSelect();
	  }
	
	  _createClass(Mapper, [{
	    key: "search",
	    value: function search(event) {
	      this.placeService.textSearch({
	        query: "" + event.target.value,
	        type: 'airport'
	      }, this.handleSuggestions);
	    }
	  }, {
	    key: "bindInput",
	    value: function bindInput(input) {
	      var _this = this;
	
	      input.oninput = function (event) {
	        clearTimeout(_this.timer);
	        if (event.target.value.length > 0) {
	          _this.timer = setTimeout(function () {
	            return _this.search(event);
	          }, 100);
	        } else {
	          (0, _util.clearResults)();
	        }
	      };
	    }
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
	  }, {
	    key: "bindModeSelect",
	    value: function bindModeSelect() {
	      var _this3 = this;
	
	      var modesDom = [document.getElementById('ruler-button'), document.getElementById('walk-button'), document.getElementById('drive-button'), document.getElementById('transit-button')];
	
	      var modes = ['MILES', 'WALKING', 'DRIVING', 'TRANSIT'];
	
	      modesDom.forEach(function (mode, idx) {
	        mode.onclick = function (event) {
	          _this3.clearBorder(modesDom);
	          event.target.style.borderBottom = "3px solid #4885ed";
	          _this3.mode = modes[idx];
	          _this3.computeRoute();
	        };
	      });
	
	      modesDom[0].style.borderBottom = "3px solid #4885ed";
	    }
	  }, {
	    key: "clearBorder",
	    value: function clearBorder(modes) {
	      modes.forEach(function (mode) {
	        mode.style.borderBottom = "3px solid white";
	      });
	    }
	  }, {
	    key: "handleSuggestions",
	    value: function handleSuggestions(suggestions, status) {
	      var _this4 = this;
	
	      (0, _util.clearResults)();
	      (0, _util.createResultsLabel)("Suggestions");
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	        //TODO sort suggestions
	        suggestions.forEach(function (suggestion) {
	          if (suggestion.formatted_address.match("United States")) {
	            if (suggestion.rating) {
	              //positionMap(suggestion);
	              _this4.appendSuggestion(suggestion);
	            }
	          }
	        });
	      } else {
	        (0, _util.noResults)();
	      }
	    }
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
	          _this5.startLocation = suggestion;
	          _this5.origin.value = suggestion.name;
	          _this5.startMarker = (0, _map.positionMap)(_this5.startMarker, _this5.map, suggestion);
	        } else {
	          _this5.endLocation = suggestion;
	          _this5.destination.value = suggestion.name;
	          _this5.endMarker = (0, _map.positionMap)(_this5.endMarker, _this5.map, suggestion);
	        }
	        // this.setMarker(suggestion);
	        _this5.computeRoute();
	      };
	    }
	  }, {
	    key: "computeRoute",
	    value: function computeRoute() {
	      if (this.startLocation && this.endLocation) {
	        if (this.mode === "MILES") {
	          this.plotMiles();
	        } else {
	          (0, _map.clearMap)([this.startMarker, this.endMarker, this.path]);
	          this.plotDirection();
	        }
	      }
	    }
	  }, {
	    key: "plotMiles",
	    value: function plotMiles() {
	      var start = this.startLocation.geometry.location;
	      var end = this.endLocation.geometry.location;
	      var miles = (0, _util.computeMiles)(start, end);
	      (0, _util.clearResults)();
	      this.directionsDisplay.setMap(null);
	      if (this.path) this.path.setMap(null);
	      (0, _util.createResultsLabel)("Distance: " + miles + " Nautical Miles", "results-label miles-label");
	      if (!this.startMarker.getMap()) {
	        this.startMarker.setMap(this.map);
	        this.endMarker.setMap(this.map);
	      }
	      this.path = (0, _map.drawPath)(this.map, start, end);
	    }
	  }, {
	    key: "plotDirection",
	    value: function plotDirection() {
	      var _this6 = this;
	
	      (0, _util.clearResults)();
	      this.directionsService.route({
	        origin: { 'placeId': this.startLocation.place_id },
	        destination: { 'placeId': this.endLocation.place_id },
	        travelMode: this.mode
	      }, function (response, status) {
	        if (status === 'OK') {
	          _this6.directionsDisplay.setMap(_this6.map);
	          _this6.directionsDisplay.setDirections(response);
	        } else {
	          (0, _util.createResultsLabel)(status);
	        }
	      });
	    }
	
	    // resetBounds() {
	    //   const bounds = new google.maps.LatLngBounds();
	    //   bounds.extend(this.startLocation.geometry.location);
	    //   bounds.extend(this.endLocation.geometry.location);
	    //   // this.map.panTo(350,0);
	    // }
	
	  }, {
	    key: "configureInfoWindow",
	    value: function configureInfoWindow() {
	      var infowindowContent = document.getElementById('infowindow-content');
	      this.infoWindow.setContent(infowindowContent);
	    }
	  }]);
	
	  return Mapper;
	}();
	
	exports.default = Mapper;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map