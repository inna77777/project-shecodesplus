let cities = [
  {
    name: "Paris",
    temperature: 25,
    humidity: 70,
    image: "./images/paris.jpeg",
  },
  {
    name: "Brussels",
    temperature: -2,
    humidity: 99,
    image: "./images/brussels.jpg",
  },
  {
    name: "Madrid",
    temperature: 36,
    humidity: 30,
    image: "./images/madrid.jpg",
  },
  {
    name: "Kiev",
    temperature: -5,
    humidity: 30,
    image: "./images/kiev.jpg",
  },
  {
    name: "Warsaw",
    temperature: 19,
    humidity: 55,
    image: "./images/warsaw.jpg",
  },
  {
    name: "Amsterdam",
    temperature: -1,
    humidity: 77,
    image: "./images/brussels.jpg",
  },
  {
    name: "Rome",
    temperature: 35,
    humidity: 88,
    image: "./images/rome.jpg",
  },
  {
    name: "Tokyo",
    temperature: 26,
    humidity: 45,
    image: "./images/tokyo.jpg",
  },
  {
    name: "Lisbon",
    temperature: 14,
    humidity: 85,
    image: "./images/lisbon.jpg",
  },
  {
    name: "Los Angeles",
    temperature: 33,
    humidity: 60,
    image: "./images/losangeles.jpg",
  },
  {
    name: "San Francisco",
    temperature: 29,
    humidity: 90,
    image: "./images/sanfrancisco.jpg",
  },
  {
    name: "Oslo",
    temperature: 12,
    humidity: 91,
    image: "./images/oslo.jpg",
  },
];

let enterCity = prompt("Enter your city...");

if (enterCity) {
  let inputedCity = cities.find(function (city) {
    return enterCity.toLowerCase() === city.name.toLowerCase();
  });

  if (inputedCity) {
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature-today");
    const humidity = document.getElementById("humidity");
    const bodyElement = document.getElementById("city-background");
    // const fahrenheit = document.getElementById("temperature-today-fahrenheit");
    // const fahrenheitTemp = Math.round((inputedCity.temperature * 9) / 5 + 32);
    cityName.innerHTML = inputedCity.name;
    temperature.innerHTML = inputedCity.temperature;
    // fahrenheit.innerHTML = fahrenheitTemp;
    humidity.innerHTML = inputedCity.humidity;
    bodyElement.style.backgroundImage = `url(${inputedCity.image})`;
    // alert(
    //   `It is currently ${inputedCity.temperature}°C (${fahrenheitTemp}°F) in ${inputedCity.name} with a humidity of ${inputedCity.humidity}%`
    // );
    if (inputedCity.temperature < 0) {
      const emojiElements = document.getElementsByClassName("emoji-today");
      for (let i = 0; i < emojiElements.length; i++) {
        emojiElements[i].innerHTML = "❄️";
      }
    }
  } else {
    alert(
      "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
    );
  }
}

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

function serchingCity(event) {
  event.preventDefault();
  let searchingLine = document.querySelector("#search-city");
  let nameOfCity = document.querySelector("#city-name");
  nameOfCity.innerHTML = searchingLine.value;
}

let searchingForm = document.querySelector("#search");
searchingForm.addEventListener("submit", serchingCity);

let temperature = document.querySelector("#temperature-today");
let temperatureType = "celcius";
let initialCelciusTemperature = temperature.textContent;

function convertToFarenheit() {
  if (temperatureType === "celcius") {
    let tempF = Math.round((initialCelciusTemperature * 9) / 5 + 32);
    temperature.textContent = tempF;
    temperatureType = "farenheit";
    console.log(temperatureType);
  }
}

function convertToCelcius() {
  if (temperatureType === "farenheit") {
    temperature.textContent = initialCelciusTemperature;
    temperatureType = "celcius";
    console.log(temperatureType);
  }
}

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", convertToFarenheit);
let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", convertToCelcius);

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
