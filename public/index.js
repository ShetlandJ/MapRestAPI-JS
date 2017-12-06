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

var populateList = function(countries){

  var select = document.getElementById('country-list');
  for (var country of countries) {
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  }
}

var countryInfo = function(countries){

  var container = document.getElementById('country-container');
  for (var country of countries) {
    var countryName = document.createElement('p');
    var countryPop = document.createElement('p');
    var countryCapital = document.createElement('p');

    countryName.innerText = country.name;
    countryPop.innerText = country.population;
    countryCapital.innerText = country.capital;

    container.appendChild(countryName);
    container.appendChild(countryPop);
    container.appendChild(countryCapital);

  }
}


// Display the country name, population, capital city of the country that is selected.


var app = function(){

  var button = document.getElementById("load");

  button.addEventListener('click', function(){
    this.disabled = "disabled";
    var url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete)
  });
}



window.addEventListener('load', app);
