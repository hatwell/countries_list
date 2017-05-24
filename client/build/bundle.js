/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(2);
var RestCountries = __webpack_require__(4)

var UI = function() {

  this.countries = new Countries();
  this.createCountriesList();

  // countries.all(function (countries) {
  //   this.render(countries);
  // }.bind(this));

  // this.createForm();
}

UI.prototype = {

  createCountriesList: function(){
    var restCountries = new RestCountries();
    var allCountries = restCountries.all(function(countries){

      var select = document.createElement("select");

      for (country of countries){
        console.log(country)
        var option = document.createElement("option");
        option.value = country.name;
        option.innerText = country.name;
        select.appendChild(option);

      }
      var div = document.getElementById("selection-list");

      div.appendChild(select);

      this.addEventListenerToButton();
      this.populateBucketList();
    }.bind(this));
  },

  addEventListenerToButton: function(){
    var button = document.getElementById("add-button");
    var select = document.querySelector("select");
    button.addEventListener('click', function(){
        var selectedCountry = select.value;
        var objectToAdd = {
          name: selectedCountry
        }

        this.countries.add(objectToAdd, function(){
          this.populateBucketList();
        }.bind(this))
    }.bind(this) )
  },

  populateBucketList: function(){
    var div = document.getElementById("bucket-list-countries")
    div.innerText = "";
    var url = "https://en.wikipedia.org/wiki/"
    this.countries.all(function(countries){
      for (country of countries){
        console.log(country);
        var p = document.createElement("p")
        var name = country.name;
        var a = document.createElement("a")
        var countryUrl = url + name.replace(/ /g, "_");
        a.href = countryUrl;
        a.innerText =name;
        p.appendChild(a)
        div.appendChild(p);


      };
    })
  }



}

module.exports = UI;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  new UI();
}

window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(3);
// var RequestHelper = require('../../helpers/requestHelper.js');

var Countries = function() {

}

Countries.prototype = {
  makeRequest: function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function() {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },

  makePostRequest: function (url, callback, payload) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    console.log(payload);
    request.send(payload);
  },

  all: function (callback) {
  this.makeRequest('http://localhost:3000/api/countries', function (results) {
    console.log(results)
    var countries = this.populateCountries(results)
    console.log(countries)
    callback(countries);
  }.bind(this));
},

populateCountries: function (results) {
    var countries = results.map(function (resultObject) {
      return new Country(resultObject)
    });
    return countries;
  },

  add: function (newCountry, callback) {
    var countryData = JSON.stringify(newCountry);
    this.makePostRequest('http://localhost:3000/api/countries', callback, countryData);
  }
}

module.exports = Countries;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Country = function(options) {
  this.name = options.name;
}

Country.prototype = {

}



module.exports = Country;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__ (3)

var RestCountries = function(){

}

RestCountries.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function() {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },

  all: function (callback) {
    this.makeRequest('https://restcountries.eu/rest/v2/all', function (results) {
      var countries = this.populateCountries(results)
      console.log(callback);
      callback(countries);
    }.bind(this));
  },

  populateCountries: function (results) {
      var countries = results.map(function (resultObject) {
        return new Country(resultObject)
      });
      return countries;
    }
}


module.exports = RestCountries;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map