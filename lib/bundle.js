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
	  }
	};
	
	window.initMap = initMap;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map