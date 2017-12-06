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
  for (var country of countries) {
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  }
}

var countryInfo = function(countries, countryName){


  for (country of countries) {
    if (country.name === countryName) {
      var container = document.getElementById('country-container');
      var countryName = document.getElementById('country-name');
      var countryPop = document.getElementById('country-pop');
      var countryCapital = document.getElementById('country-capital');

      countryName.innerText = "Name: " + country.name;
      countryPop.innerText = "Population: " + country.population;
      countryCapital.innerText = "Capital: " + country.capital;

      container.appendChild(countryName);
      container.appendChild(countryPop);
      container.appendChild(countryCapital);
    }
  }
};

var app = function(){

  var button = document.getElementById("load");
  var url = "https://restcountries.eu/rest/v2/all";

  button.addEventListener('click', function(){
    this.disabled = "disabled";
    makeRequest(url, requestComplete)
  });

  var dropDown = document.querySelector('select');
  var dropDownValue = document.querySelector('select').value;
  dropDown.addEventListener("change", function(){
    makeRequest(url, requestComplete2)
  });

  var selector = JSON.parse(localStorage.getItem('selectorList')) || [];
  populate(selector);

}



window.addEventListener('load', app);
