const api = {
  key: "89714bbf32c5dfc0ced968ecc7d7a664",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

//see openweather documentation for api calls
//query refers to the data inuputted in the search box, eg. a city
//TODO: Chaage to fahrenheit and remove °
function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

/* The enter/return key has a keyCode of 13*/
/* When user types a city, return results FROM THE API for whatever is in the search box*/
function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  //interpolated code is API response in JSON, see docs (weather fields in API response
  //Eg. weather.sys.country refers to returned data (variable hard coded as weather)
  //weather.sys.country means that the city div will return the city entered in the search, along with the data returned from the API
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  //add date object, see docs on properties
  //by selecting div for date, we can change the innerText to whatever the current date is 
  let currentDate = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(currentDate);

  //per docs: temp_min and temp_max are optional parameters mean min / max temperature in the city at the current moment
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  //weather div sets whether it is sunny, coudy etc
  //found in docs under API response in JSON
  //data -> weather obj where zeroth pos is id -> main (gives type like cloidy, rainy etc)
  let weather_element = document.querySelector(".current .weather");
  weather_element.innerText = weather.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"];
 //See date documentation
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
