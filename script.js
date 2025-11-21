async function getWeather() {
  const city = document.getElementById("city-input").value;
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

  // Current weather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  // Forecast (5-day)
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  // Current weather card
  const weatherDiv = document.getElementById("weather-dashboard");
  weatherDiv.innerHTML = `
    <div class="weather-card">
      <h2>${data.name}</h2>
      <p>Temp: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    </div>
  `;

  // Forecast cards (next 5 days, every 24h)
  let forecastHTML = "";
  for (let i = 0; i < forecastData.list.length; i += 8) {
    let day = forecastData.list[i];
    forecastHTML += `
      <div class="weather-card">
        <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
        <p>${day.main.temp}°C</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
      </div>
    `;
  }
  weatherDiv.innerHTML += forecastHTML;
}
