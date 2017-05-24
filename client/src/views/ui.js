var Countries = require('../models/countries');
var RestCountries = require('../models/restCountries')

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
