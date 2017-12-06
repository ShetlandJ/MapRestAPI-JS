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
  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  });

  var dropDown = document.querySelector('select');
  var dropDownValue = document.querySelector('select').value;
  dropDown.addEventListener("change", function(){
    countryInfo(dropDownValue)
  });
}

var countryInfo = function(country){

  var container = document.getElementById('country-container');
  var countryName = document.getElementById('country-name');
  var countryPop = document.getElementById('country-pop');
  var countryCapital = document.getElementById('country-capital');
  var countryCode = document.getElementById('country-code');
  var borders = document.getElementById('borders');

  countryName.innerText = "Name: " + country.name;
  countryPop.innerText = "Population: " + country.population;
  countryCapital.innerText = "Capital: " + country.capital;
  countryCode.innerText = "Code: " + country.alpha3Code;
  borders.innerText = "";

  // var borderArray = [];
  //
  // for (var borderCountry of country.borders) {
  //   borderArray.push(borderCountry);
  // }
  //
  // borders.innerText = "It borders: " + borderArray;
  //
  container.appendChild(countryName);
  container.appendChild(countryPop);
  container.appendChild(countryCapital);
  container.appendChild(countryCode);
  container.appendChild(borders);

};

var getCountryByCode = function(countries, countryCode){
  for (var country of countries) {
    if (country.alpha3Code === countryCode) {
      return country.name;
    }
  }
}

var app = function(){

  var button = document.getElementById("load");
  var url = "https://restcountries.eu/rest/v2/all";

  button.addEventListener('click', function(){
    this.disabled = "disabled";
    makeRequest(url, requestComplete)
  });

}


window.addEventListener('load', app);
