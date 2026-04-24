const API_KEY = "8e7fb273482f52d7fe4c9d91413e88da";

const elements = {
  cityInput: document.getElementById("cityInput"),
  searchBtn: document.getElementById("searchBtn"),
  weatherDisplay: document.getElementById("weatherDisplay"),
  loadingDiv: document.getElementById("loadingDiv"),
  errorDiv: document.getElementById("errorDiv"),
  cityName: document.getElementById("cityName"),
  currentTime: document.getElementById("currentTime"),
  mainWeatherIcon: document.getElementById("mainWeatherIcon"),
  mainTemp: document.getElementById("mainTemp"),
  weatherDescription: document.getElementById("weatherDescription"),
  feelsLike: document.getElementById("feelsLike"),
  windSpeed: document.getElementById("windSpeed"),
  windDirection: document.getElementById("windDirection"),
  humidity: document.getElementById("humidity"),
  visibility: document.getElementById("visibility"),
  pressure: document.getElementById("pressure"),
  sunrise: document.getElementById("sunrise"),
  sunset: document.getElementById("sunset"),
  cloudiness: document.getElementById("cloudiness"),
  uvIndex: document.getElementById("uvIndex"),
  coordinates: document.getElementById("coordinates"),
  timezone: document.getElementById("timezone"),
  forecastGrid: document.getElementById("forecastGrid"),
  heatIndex: document.getElementById("heatIndex"),
  dewPoint: document.getElementById("dewPoint"),
  airQuality: document.getElementById("airQuality"),
  moonPhase: document.getElementById("moonPhase"),
  elevation: document.getElementById("elevation"),
  minTempToday: document.getElementById("minTempToday"),
  maxTempToday: document.getElementById("maxTempToday"),
  visibilityRange: document.getElementById("visibilityRange"),
  windGust: document.getElementById("windGust"),
  precipitation: document.getElementById("precipitation"),
};

function getWeatherIcon(weatherCode, isDay = true) {
  const iconMap = {
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-moon",
    "03d": "fas fa-cloud",
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud",
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-rain",
    "09n": "fas fa-cloud-rain",
    "10d": "fas fa-cloud-sun-rain",
    "10n": "fas fa-cloud-moon-rain",
    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake",
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog",
    "50n": "fas fa-smog",
  };
  return iconMap[weatherCode] || "fas fa-cloud";
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatCurrentTime() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function metersToKilometers(meters) {
  return (meters / 1000).toFixed(1);
}

function getWindDirection(degrees) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
}

function showLoading() {
  elements.loadingDiv.style.display = "block";
  elements.weatherDisplay.classList.remove("active");
  elements.errorDiv.style.display = "none";
}

function hideLoading() {
  elements.loadingDiv.style.display = "none";
}

function showError(message) {
  elements.errorDiv.textContent = message;
  elements.errorDiv.style.display = "block";
  elements.weatherDisplay.classList.remove("active");
  hideLoading();
}

function updateWeatherDisplay(data) {
  try {
    // Main weather info
    elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    elements.currentTime.textContent = formatCurrentTime();
    elements.mainTemp.textContent = kelvinToCelsius(data.main.temp);
    elements.weatherDescription.textContent = data.weather[0].description;
    elements.feelsLike.textContent = kelvinToCelsius(data.main.feels_like);

    // Weather icon
    const iconCode = data.weather[0].icon;
    elements.mainWeatherIcon.className = getWeatherIcon(iconCode);

    // Wind info
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.windDirection.textContent = getWindDirection(data.wind.deg || 0);

    // Other details
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.visibility.textContent = `${metersToKilometers(data.visibility || 10000)} km`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;

    // Sun times
    elements.sunrise.textContent = formatTime(data.sys.sunrise, data.timezone);
    elements.sunset.textContent = formatTime(data.sys.sunset, data.timezone);

    // Additional info
    elements.cloudiness.textContent = `${data.clouds.all}%`;
    elements.coordinates.textContent = `${data.coord.lat.toFixed(2)}°, ${data.coord.lon.toFixed(2)}°`;

    // Timezone
    const timezoneHours = data.timezone / 3600;
    elements.timezone.textContent = `UTC${timezoneHours >= 0 ? "+" : ""}${timezoneHours}`;

    // UV Index (mock data as OpenWeather free tier doesn't include this)
    elements.uvIndex.textContent = "5"; // You would need a separate API call for real UV data

    // Additional detailed information
    elements.heatIndex.textContent = `${kelvinToCelsius(data.main.feels_like)}°C`;
    elements.dewPoint.textContent = `${Math.round(kelvinToCelsius(data.main.temp) - (100 - data.main.humidity) / 5)}°C`;
    elements.airQuality.textContent = "Moderate"; // Mock data - would need separate API
    elements.moonPhase.textContent = "Waxing Gibbous"; // Mock data
    elements.elevation.textContent = "216m"; // Mock data - would need elevation API
    elements.minTempToday.textContent = `${kelvinToCelsius(data.main.temp_min || data.main.temp - 3)}°C`;
    elements.maxTempToday.textContent = `${kelvinToCelsius(data.main.temp_max || data.main.temp + 5)}°C`;

    // Enhanced visibility info
    const visibilityKm = metersToKilometers(data.visibility || 10000);
    let visibilityDesc = "Excellent";
    if (visibilityKm < 1) visibilityDesc = "Poor";
    else if (visibilityKm < 4) visibilityDesc = "Moderate";
    else if (visibilityKm < 10) visibilityDesc = "Good";
    elements.visibilityRange.textContent = `${visibilityDesc} (${visibilityKm}km)`;

    elements.windGust.textContent = `${Math.round((data.wind.gust || data.wind.speed * 1.3) * 3.6)} km/h`;
    elements.precipitation.textContent = data.rain
      ? `${data.rain["1h"] || 0}mm`
      : "0mm";

    // Show the weather display
    elements.weatherDisplay.classList.add("active");
    hideLoading();
  } catch (error) {
    console.error("Error updating display:", error);
    showError("Error displaying weather data. Please try again.");
  }
}

function updateForecastDisplay(forecastData) {
  try {
    elements.forecastGrid.innerHTML = "";

    // Process forecast data - get one forecast per day
    const dailyForecasts = {};

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyForecasts[dateKey]) {
        dailyForecasts[dateKey] = {
          date: date,
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          clouds: item.clouds.all,
        };
      }

      dailyForecasts[dateKey].temps.push(item.main.temp);
    });

    // Create forecast cards for next 5 days
    const days = Object.values(dailyForecasts).slice(0, 5);

    days.forEach((dayData, index) => {
      const maxTemp = Math.max(...dayData.temps);
      const minTemp = Math.min(...dayData.temps);

      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";

      const dayName =
        index === 0
          ? "Today"
          : dayData.date.toLocaleDateString("en-US", { weekday: "long" });
      const dateString = dayData.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      forecastItem.innerHTML = `
                        <div class="forecast-day">${dayName}</div>
                        <div class="forecast-date">${dateString}</div>
                        <div class="forecast-icon">
                            <i class="${getWeatherIcon(dayData.weather.icon)}"></i>
                        </div>
                        <div class="forecast-temps">
                            <span class="forecast-high">${kelvinToCelsius(maxTemp)}°</span>
                            <span class="forecast-low">${kelvinToCelsius(minTemp)}°</span>
                        </div>
                        <div class="forecast-desc">${dayData.weather.description}</div>
                        <div class="forecast-details">
                            <div class="forecast-detail-item">
                                <i class="fas fa-tint"></i>
                                <span class="forecast-detail-value">${dayData.humidity}%</span>
                            </div>
                            <div class="forecast-detail-item">
                                <i class="fas fa-wind"></i>
                                <span class="forecast-detail-value">${Math.round(dayData.windSpeed * 3.6)}km/h</span>
                            </div>
                            <div class="forecast-detail-item">
                                <i class="fas fa-cloud"></i>
                                <span class="forecast-detail-value">${dayData.clouds}%</span>
                            </div>
                        </div>
                    `;

      elements.forecastGrid.appendChild(forecastItem);
    });
  } catch (error) {
    console.error("Error updating forecast display:", error);
  }
}

// Mock data for demonstration (when API fails due to CORS)
function getMockWeatherData(cityName) {
  return {
    name: cityName || "Delhi",
    sys: { country: "IN", sunrise: 1692941400, sunset: 1692992400 },
    weather: [{ description: "overcast clouds", icon: "04d" }],
    main: {
      temp: 303.15, // 30°C
      feels_like: 305.15, // 32°C
      temp_min: 299.15, // 26°C
      temp_max: 307.15, // 34°C
      humidity: 75,
      pressure: 1008,
    },
    wind: { speed: 4.2, deg: 225, gust: 5.0 },
    visibility: 8000,
    clouds: { all: 100 },
    coord: { lat: 28.67, lon: 77.22 },
    timezone: 19800, // UTC+5.5
    rain: { "1h": 0.2 },
  };
}

function getMockForecastData() {
  const mockForecasts = [];
  const baseTemp = 295;
  const weatherConditions = [
    { description: "sunny", icon: "01d" },
    { description: "partly cloudy", icon: "02d" },
    { description: "cloudy", icon: "03d" },
    { description: "light rain", icon: "10d" },
    { description: "clear sky", icon: "01d" },
  ];

  for (let i = 0; i < 40; i++) {
    const dayIndex = Math.floor(i / 8);
    const tempVariation = Math.random() * 10 - 5;
    const weather = weatherConditions[dayIndex % weatherConditions.length];

    mockForecasts.push({
      dt: Date.now() / 1000 + i * 3 * 3600,
      main: {
        temp: baseTemp + tempVariation,
        humidity: 60 + Math.random() * 20,
      },
      weather: [weather],
      wind: { speed: 3 + Math.random() * 5 },
      clouds: { all: Math.floor(Math.random() * 100) },
    });
  }

  return { list: mockForecasts };
}

async function fetchWeatherData(cityName) {
  try {
    showLoading();

    // Try to fetch real data first
    try {
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&mode=cors`,
      );

      if (currentWeatherResponse.ok) {
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&appid=${API_KEY}&mode=cors`,
        );

        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          updateForecastDisplay(forecastData);
        }

        updateWeatherDisplay(currentWeatherData);
        return;
      }
    } catch (fetchError) {
      console.log("API fetch failed, using mock data:", fetchError.message);
    }

    // Fallback to mock data for demonstration
    console.log("Using mock data for demonstration purposes");

    // Show demo notice
    elements.errorDiv.innerHTML = `
                    <div style="background: rgba(59, 130, 246, 0.1); color: #1d4ed8; border-color: rgba(59, 130, 246, 0.2);">
                        <i class="fas fa-info-circle"></i> 
                        <strong>Demo Mode:</strong> Using sample data for "${cityName || "London"}". 
                        To use real weather data, serve this file from a web server or use the API directly in a backend application.
                    </div>
                `;
    elements.errorDiv.style.display = "block";

    // Use mock data
    const mockCurrentWeather = getMockWeatherData(cityName);
    const mockForecastData = getMockForecastData();

    // Add some delay to simulate API call
    setTimeout(() => {
      updateWeatherDisplay(mockCurrentWeather);
      updateForecastDisplay(mockForecastData);
    }, 500);
  } catch (error) {
    console.error("Weather API Error:", error);
    showError(
      error.message || "Unable to fetch weather data. Please try again.",
    );
  }
}

// Event listeners
elements.searchBtn.addEventListener("click", () => {
  const cityName = elements.cityInput.value.trim();
  if (cityName) {
    fetchWeatherData(cityName);
    elements.cityInput.value = "";
  } else {
    showError("Please enter a city name");
  }
});

elements.cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    elements.searchBtn.click();
  }
});

// Initialize with a default city for demo purposes
document.addEventListener("DOMContentLoaded", () => {
  // Load Delhi as default for demonstration
  setTimeout(() => {
    fetchWeatherData("Delhi");
  }, 1000);
});
