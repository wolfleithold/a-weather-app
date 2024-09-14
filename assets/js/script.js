//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a4a7f30922e93c33f8e80ace1d6f26cb}

// a4a7f30922e93c33f8e80ace1d6f26cb

const apiKey = "a4a7f30922e93c33f8e80ace1d6f26cb";

// DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentWeatherDiv = document.getElementById("weather-details");
const forecastDiv = document.getElementById("forecast-details");
const searchHistoryDiv = document.getElementById("search-history");

// search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
    addToSearchHistory(city);
    cityInput.value = ""; // Clear the input field
  }
});

// weather data
function getWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  // current weather
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => displayCurrentWeather(data))
    .catch((err) => console.error("Error fetching current weather:", err));

  // 5-day forecast
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => displayForecast(data))
    .catch((err) => console.error("Error fetching forecast:", err));
}
