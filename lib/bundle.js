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
/***/ function(module, exports) {

	"use strict";
	
	var hidden = false;
	
	var initMap = function initMap() {
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: 40.757534, lng: -73.892648 },
	    zoom: 10,
	    mapTypeControl: true,
	    mapTypeControlOptions: {
	      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	      position: google.maps.ControlPosition.TOP_RIGHT
	    }
	  });
	
	  var button = document.getElementById("hide-sidebar-button");
	  var sideBar = document.getElementById("side-bar");
	
	  button.onclick = function (event) {
	    if (hidden === false) {
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
	    (function () {
	      navigator.geolocation.getCurrentPosition(function (position) {
	        var pos = {
	          lat: position.coords.latitude,
	          lng: position.coords.longitude
	        };
	
	        var currentLocation = new google.maps.LatLng(pos);
	        map.setCenter(currentLocation);
	        map.setZoom(13);
	
	        //info window for current location
	        // const infoWindow = new google.maps.InfoWindow({map: map});
	        // infoWindow.setPosition(pos);
	        // infoWindow.setContent('Current Location');
	      });
	
	      var card = document.getElementById('pac-card');
	      var input = document.getElementById('input');
	
	      var autocomplete = new google.maps.places.Autocomplete(input);
	
	      autocomplete.bindTo('bounds', map);
	
	      var infowindow = new google.maps.InfoWindow();
	      var infowindowContent = document.getElementById('infowindow-content');
	      infowindow.setContent(infowindowContent);
	      var marker = new google.maps.Marker({
	        map: map,
	        anchorPoint: new google.maps.Point(0, -29)
	      });
	
	      autocomplete.addListener('place_changed', function () {
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
	          map.setZoom(17); // Why 17? Because it looks good.
	        }
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
	      });
	    })();
	  }
	};
	
	window.initMap = initMap;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map