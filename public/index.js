var makeRequest = function(url, callback){
  // Create a new XHR
  var request = new XMLHttpRequest();

  // Open the Request, passing in the HTTP request type and the URL
  request.open("GET", url);

  // write an event listener for the request
  request.addEventListener("load", callback);

  // GO!
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}

var requestComplete2 = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var dropDownValue = document.querySelector('select').value;
  countryInfo(countries, dropDownValue)
}


var populateList = function(countries){

  var select = document.getElementById('country-list');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });

  var dropDown = document.querySelector('select');

  dropDown.addEventListener("change", function(){
    var selectedCountry = countries[this.value]
    countryInfo(selectedCountry)
  });
}

var countryInfo = function(country){
  var container = document.getElementById('country-container');
  var countryName = document.getElementById('country-name');
  var countryPop = document.getElementById('country-pop');
  var countryCapital = document.getElementById('country-capital');
  var borders = document.getElementById('borders');

  var borderArray = [];

  for (var borderCountry of country.borders) {
    borderArray.push(borderCountry);
  }

  countryName.innerText = "Name: " + country.name;
  countryPop.innerText = "Population: " + country.population;
  countryCapital.innerText = "Capital: " + country.capital;
  borders.innerText = "It borders: " + borderArray;

  var map = document.getElementById('main-map');
  var center = {lat: country.latlng[0], lng: country.latlng[1]};
  var mainMap = new MapWrapper(map, center, 5);

  var flagUrl = country.flag;


  mainMap.addMarker(center, "This is the country of " + country.name + ". It has a population of " + country.population + " and its capital city is " + country.capital + ". It's national flag looks like this:" + '</br><img src=' + flagUrl + ' style="height: 150px; float: center">')

  container.appendChild(countryName);
  container.appendChild(countryPop);
  container.appendChild(countryCapital);
  container.appendChild(borders);
  container.appendChild(map);

};

// var getCountryByCode = function(countries, countryCode){
//   for (var country of countries) {
//     if (country.alpha3Code === countryCode) {
//       return country.name;
//     }
//   }
// }

var app = function(){

  var button = document.getElementById("load");
  var url = "https://restcountries.eu/rest/v2/all";

  button.addEventListener('click', function(){
    this.disabled = "disabled";
    makeRequest(url, requestComplete)
  });

}


window.addEventListener('load', app);
