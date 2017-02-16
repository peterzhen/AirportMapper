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
	
	var _map = __webpack_require__(2);
	
	var _util = __webpack_require__(3);
	
	var initMap = function initMap() {
	  var autosuggestTimer = void 0;
	  var startLocation = void 0;
	  var endLocation = void 0;
	
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: 37, lng: -110 },
	    zoom: 4,
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	      position: google.maps.ControlPosition.TOP_RIGHT
	    }
	  });
	
	  (0, _sidebar.bindSidebarDrawer)();
	
	  var origin = document.getElementById('origin');
	  var destination = document.getElementById('destination');
	
	  var placeService = new google.maps.places.PlacesService(map);
	
	  //peforms a Places Google search for autocomplete
	  origin.oninput = function (event) {
	    if (origin.value.length > 0) {
	      clearTimeout(autosuggestTimer);
	      autosuggestTimer = setTimeout(function () {
	        placeService.textSearch({
	          query: "" + origin.value,
	          type: 'airport'
	        }, _util.handleSuggestions);
	      }, 100);
	    }
	  };
	
	  window.origin = origin;
	
	  var infowindow = new google.maps.InfoWindow();
	  (0, _map.configureInfoWindow)(infowindow);
	
	  var marker = new google.maps.Marker({
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29),
	    animation: google.maps.Animation.DROP
	  });
	
	  var positionMap = function positionMap(place) {
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
	      address = [place.address_components[0] && place.address_components[0].short_name || '', place.address_components[1] && place.address_components[1].short_name || '', place.address_components[2] && place.address_components[2].short_name || ''].join(' ');
	    }
	
	    infowindowContent.children['place-icon'].src = place.icon;
	    infowindowContent.children['place-name'].textContent = place.name;
	    infowindowContent.children['place-address'].textContent = address;
	    infowindow.open(map, marker);
	    // map.panBy(-150,0);
	  };
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
	
	var bindSidebarDrawer = exports.bindSidebarDrawer = function bindSidebarDrawer() {
	  var button = document.getElementById("hide-sidebar-button");
	  var sideBar = document.getElementById("side-bar");
	
	  button.onclick = function (event) {
	    if (hidden === false) {
	      closeSidebar(button, sideBar);
	    } else {
	      openSidebar(button, sideBar);
	    }
	  };
	};
	
	var closeSidebar = function closeSidebar(button, sideBar) {
	  sideBar.style.left = "-275px";
	  button.innerHTML = ">";
	  hidden = true;
	};
	
	var openSidebar = function openSidebar(button, sideBar) {
	  sideBar.style.left = "0px";
	  button.innerHTML = "<";
	  hidden = false;
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
	
	var configureInfoWindow = exports.configureInfoWindow = function configureInfoWindow(infoWindow) {
	  var infowindowContent = document.getElementById('infowindow-content');
	  infoWindow.setContent(infowindowContent);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var filterSuggestions = function filterSuggestions(suggestion, status) {
	  if (status === google.maps.places.PlacesServiceStatus.OK) {
	    if (suggestion.types.includes("airport")) {
	      var li = document.createElement('li');
	      li.appendChild(document.createTextNode(suggestion.name));
	      document.getElementById('results-container').appendChild(li);
	    }
	  } else {
	    console.log(status);
	  }
	};
	
	var handleSuggestions = exports.handleSuggestions = function handleSuggestions(suggestions, status) {
	  if (status === google.maps.places.PlacesServiceStatus.OK) {
	    clearResults();
	    //sort suggestions
	    suggestions.forEach(function (suggestion) {
	      if (suggestion.formatted_address.match("United States")) {
	        if (suggestion.rating) {
	          //positionMap(suggestion);
	          var result = document.createElement('li');
	          result.className = "result";
	          result.appendChild(document.createTextNode(suggestion.name));
	          document.getElementById('results-container').appendChild(result);
	        }
	      }
	
	      // placeService.getDetails(request, filterSuggestions);
	    });
	  } else {
	    console.log(status);
	  }
	};
	
	var clearResults = exports.clearResults = function clearResults() {
	  document.getElementById('results-container').innerHTML = "";
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map