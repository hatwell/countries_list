var Country = require('./country.js');
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
