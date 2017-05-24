var express = require('express');
var app = express();
var countryRouter = express.Router();

//countries models n stuff here

var Country = require('../client/src/models/country')

//create new country query object for accessing the database
var CountryQuery = require ('..db/countryQuery.js');
var query = new CountryQuery();


//country by id
countryRounter.get('/:id', function(req, res){
  res.json(countries[req.params.id]);
});


//get all countries - index
countryRouter.get('/', function(req, res){
  queryy.all(function (countries) {
    res.json(countries);
  });
});

//add new countries
countries.post('/', function(req, res) {
  var country = new Country({
    name: req.body.name
  });
  query.add(country, function(results){
    res.json(results)
  })
});

//delete
countryRouter.delete('/:id', function(req, res){
  countries.splice(req.params.id, 1);
  res.json({data:countries});
})

module.exports = countryRouter;
