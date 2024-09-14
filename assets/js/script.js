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

// current weather
function displayCurrentWeather(data) {
  const city = data.name;
  const date = new Date().toLocaleDateString();
  const temp = data.main.temp;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  currentWeatherDiv.innerHTML = `
    <h3>${city} (${date}) <img src="${icon}" alt="Weather Icon"></h3>
    <p>Temp: ${temp} °F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %</p>
  `;
}

// 5-day forecast
function displayForecast(data) {
  forecastDiv.innerHTML = "";

  const forecastData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt_txt).toLocaleDateString();
    const temp = forecast.main.temp;
    const wind = forecast.wind.speed;
    const humidity = forecast.main.humidity;
    const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

    // a forecast card for each day
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
      <h3>${date}</h3>
      <img src="${icon}" alt="Weather Icon">
      <p>Temp: ${temp} °F</p>
      <p>Wind: ${wind} MPH</p>
      <p>Humidity: ${humidity} %</p>
    `;
    forecastDiv.appendChild(forecastCard);
  });
}

// add city to search history
function addToSearchHistory(city) {
  const historyItem = document.createElement("li");
  historyItem.textContent = city;
  historyItem.addEventListener("click", () => {
    getWeatherData(city);
  });
  searchHistoryDiv.appendChild(historyItem);
}
