const key = "46bc014f7ccaffc87b0c2ba98d4abe1d"; 
const $ = s => document.querySelector(s);

$("#btn").onclick = getWeather;

async function getWeather() {
  let city = $("#city").value;
  if (!city) return;

  // Current weather
  let c = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  ).then(r => r.json());

  $("#name").textContent = c.name;
  $("#temp").textContent = "Temperature: " + c.main.temp + "°C";
  $("#hum").textContent = "Humidity: " + c.main.humidity + "%";
  $("#wind").textContent = "Wind: " + c.wind.speed + " m/s";

  $("#current").classList.remove("hidden");

  // Forecast (3 sample days)
  let f = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
  ).then(r => r.json());

  const days = [0, 8, 16]; // roughly 3 days

  $("#forecast").innerHTML = days.map(i => `
      <div class="fbox">
        <p>${f.list[i].dt_txt.split(" ")[0]}</p>
        <p>${Math.round(f.list[i].main.temp)}°C</p>
      </div>
    `).join("");

  $("#fore-title").classList.remove("hidden");
  $("#forecast").classList.remove("hidden");
}
