const cities = ["Hyderabad", "Delhi", "Mumbai", "Chennai", "Kolkata"]; // fixed Indian cities
const apiKey = "46bc014f7ccaffc87b0c2ba98d4abe1d"; // replace with your OpenWeather API key

async function getWeather(city) {
  // Current weather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  // Forecast (5-day)
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&units=metric`;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  // Current weather card
  let html = `
    <div class="weather-card">
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    </div>
  `;

  // Forecast (next 5 days, one per day)
  for (let i = 0; i < forecastData.list.length; i += 8) {
    let day = forecastData.list[i];
    html += `
      <div class="weather-card">
        <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
        <p>${day.main.temp} °C</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
      </div>
    `;
  }

  document.getElementById("dashboard").innerHTML += html;
}

// Load weather for all fixed Indian cities automatically
cities.forEach(city => getWeather(city));
