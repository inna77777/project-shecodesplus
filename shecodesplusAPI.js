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

const apiKey = "7928b8fafat7344abbe4f90d8711dbbo";

function showGeolocation(response) {
  console.log(response.data);
  let cityTemperature = Math.round(response.data.temperature.current);

  initialCelciusTemperature = cityTemperature;
  temperatureType = "celcius";

  let nameOfCity = document.querySelector("#city-name");
  let temperatureToday = document.querySelector("#temperature-today");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageToday = document.querySelector("#img-today");
  let feelsTemp = document.querySelector("#feels-like");

  let cityName = response.data.city;
  let humidityToday = response.data.temperature.humidity;
  let weatherDescription = response.data.condition.description;
  let weatherIcon = response.data.condition.icon;
  let windSpeedToday = `${Math.round(response.data.wind.speed)} km/h`;
  let feelsLikeTemp = `${Math.round(response.data.temperature.feels_like)}°C`;

  nameOfCity.innerHTML = cityName;
  temperatureToday.innerHTML = cityTemperature;
  humidity.innerHTML = humidityToday;
  description.innerHTML = weatherDescription;
  windSpeed.innerHTML = windSpeedToday;
  imageToday.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIcon}.png`;
  feelsTemp.innerHTML = feelsLikeTemp;
  // ! FORECAST URL $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`;

  axios.get(forecastApiUrl).then(forecastFor6Days);
}

function searchingCity(event) {
  event.preventDefault();
  let searchingLine = document.querySelector("#search-city");
  let city = searchingLine.value;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showGeolocation);
  searchingLine.value = "";
  // searchingLine.focus()
}

let searchingForm = document.querySelector("#search");
searchingForm.addEventListener("submit", searchingCity);

function getCurrentLocation(position) {
  const { latitude: lat, longitude: lon } = position.coords;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(showGeolocation);
}

function position() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

position();

let currentGeolocationButton = document.querySelector("#current-location");
currentGeolocationButton.addEventListener("click", position);

function getDayName(time) {
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  let date = new Date(time * 1000);
  let dayNumber = date.getDay();
  let day = days[dayNumber];

  return day;
}

function forecastFor6Days(response) {
  const forecastDays = response.data.daily;
  let divForecast = document.querySelector("#days6");
  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function (forecastDay, index) {
    if (index > 0) {
      let dayName = getDayName(forecastDay.time);
      let temperatureMinimum = Math.round(forecastDay.temperature.minimum);
      let temperatureMaximum = Math.round(forecastDay.temperature.maximum);
      let icons = forecastDay.condition.icon;

      forecastHTML += `
        <div class="col">
          <div class="day">${dayName}</div>
             <img class="icons-forecast"
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icons}.png"
                    />
          <div class="temperature-max">
            ${temperatureMaximum}°C
            <div class="temperature-min">${temperatureMinimum}°C</div>
          </div>
        </div>`;
    }
  });

  forecastHTML += `</div>`;

  divForecast.innerHTML = forecastHTML;
}
