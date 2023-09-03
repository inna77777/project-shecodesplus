let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDateTime = new Date();
let dayOfWeek = daysOfWeek[currentDateTime.getDay()];
let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();
let currentDateTimeElement = document.querySelector("#current-date");

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDateTimeElement.innerHTML = `${dayOfWeek} ${hours} : ${minutes} `;

let temperature = document.querySelector("#temperature-today");
let initialCelciusTemperature = temperature.textContent;
let temperatureType = "celcius";

function convertToFarenheit() {
  if (temperatureType === "celcius") {
    let tempF = Math.round((initialCelciusTemperature * 9) / 5 + 32);
    temperature.textContent = tempF;
    temperatureType = "farenheit";
  }
}

function convertToCelcius() {
  if (temperatureType === "farenheit") {
    temperature.textContent = initialCelciusTemperature;
    temperatureType = "celcius";
  }
}

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
let temperatureCelsius = document.querySelector("#celsius-link");
temperatureFahrenheit.addEventListener("click", convertToFarenheit);
temperatureCelsius.addEventListener("click", convertToCelcius);

const apiKey = "2528bb449c83030b0b8168f0cf74654c";

function showGeolocation(response) {
  console.log(response.data);
  let cityTemperature = Math.round(response.data.main.temp);

  initialCelciusTemperature = cityTemperature;
  temperatureType = "celcius";

  let nameOfCity = document.querySelector("#city-name");
  let temperatureToday = document.querySelector("#temperature-today");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageToday = document.querySelector("#img-today");

  let cityName = response.data.name;
  let humidityToday = response.data.main.humidity;
  let weatherDescription = response.data.weather[0].main;
  let weatherIcon = response.data.weather[0].icon;
  let windSpeedToday = `${Math.round(response.data.wind.speed)} km/h`;

  nameOfCity.innerHTML = cityName;
  temperatureToday.innerHTML = cityTemperature;
  humidity.innerHTML = humidityToday;
  description.innerHTML = weatherDescription;
  windSpeed.innerHTML = windSpeedToday;
  imageToday.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
}

function searchingCity(event) {
  event.preventDefault();
  let searchingLine = document.querySelector("#search-city");
  let city = searchingLine.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showGeolocation);
}

let searchingForm = document.querySelector("#search");
searchingForm.addEventListener("submit", searchingCity);

// function showWeather(response) {
// console.log(response.data);
// let cityName = document.querySelector("#city-name");
// cityName.innerHTML = response.data.name
// }

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showGeolocation);
}

function position(position) {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentGeolocationButton = document.querySelector("#current-location");
currentGeolocationButton.addEventListener("click", position);

//let userInput = prompt("Provide us a city name");

// if (userInput) {
//   let inputedCity = cities.find(function (city) {
//     return userInput.toLowerCase() === city.name.toLowerCase();
//   });
//   if (inputedCity) {
//     const cityName = document.getElementById("city-name");
//     const temperature = document.getElementById("temperature");
//     const body = document.getElementById("city-background");
//     cityName.innerHTML = inputedCity.name;
//     temperature.innerHTML = inputedCity.temperature + "°C";
//     body.style.backgroundImage = `url(${inputedCity.image})`;
//   } else {
//     alert("City not found");
//   }
// }

// const form = document.getElementById("search");
// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const input = document.getElementById("search-city");

//   if (input.value) {
//     let inputedCity = cities.find(function (city) {
//       return input.value.trim().toLowerCase() === city.name.toLowerCase();
//     });
//     if (inputedCity) {
//       const cityName = document.getElementById("city-name");
//       const temperature = document.getElementById("temperature");
//       const body = document.getElementById("city-background");
//       cityName.innerHTML = inputedCity.name;
//       temperature.innerHTML = inputedCity.temperature + "°C";
//       body.style.backgroundImage = `url(${inputedCity.image})`;
//       input.value = null;
//     } else {
//       alert("City not found");
//       input.value = null;
//     }
//   }
// });
