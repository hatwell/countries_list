var Country = require ('./country.js')

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
