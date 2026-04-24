
# 🌦️ WeatherScope – Modern Weather App

🔗 **Live Demo:** [https://weather-website-td2o.onrender.com](https://weather-website-td2o.onrender.com)

WeatherScope is a **modern, responsive weather web application** that provides real-time weather data along with a detailed 5-day forecast. It offers a clean UI, smooth UX, and comprehensive weather insights for any city worldwide.

---

## 🚀 Features

✨ **Core Features**

* 🌍 Search weather by city name
* 🌡️ Real-time temperature & weather conditions
* 📅 5-Day weather forecast
* 🕒 Current date & time display
* 🌅 Sunrise & Sunset timings

📊 **Detailed Weather Insights**

* 💨 Wind speed & direction
* 💧 Humidity levels
* 👁️ Visibility & pressure
* 🌥️ Cloudiness
* 🌡️ Feels like temperature

📌 **Advanced Information (Enhanced UI)**

* 🔥 Heat Index
* 💦 Dew Point
* 🌫️ Air Quality (mock data)
* 🌙 Moon Phase
* 📍 Coordinates & Timezone
* 🌄 Elevation (mock data)
* 🌧️ Precipitation & Wind Gust

🎨 **UI/UX Features**

* Modern glassmorphism design
* Fully responsive (mobile + desktop)
* Smooth animations & transitions
* Dynamic weather icons

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **API:** OpenWeatherMap API
* **Icons:** Font Awesome
* **Fonts:** Google Fonts (Inter)

---

## 📁 Project Structure

```
📦 WeatherScope
 ┣ 📜 index.html      # Main UI structure :contentReference[oaicite:0]{index=0}
 ┣ 📜 style.css      # Styling & responsive design :contentReference[oaicite:1]{index=1}
 ┣ 📜 script.js      # App logic & API handling :contentReference[oaicite:2]{index=2}
 ┗ 📜 README.md
```

---

## ⚙️ How It Works

1. User enters a city name
2. App fetches data from **OpenWeather API**
3. Displays:

   * Current weather
   * Detailed metrics
   * 5-day forecast

👉 If API fails (e.g., CORS issue), the app automatically switches to **demo/mock data mode** for smooth experience 

---

## 🔑 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2️⃣ Add Your API Key

Replace the API key in `script.js`:

```js
const API_KEY = "your_api_key_here";
```

### 3️⃣ Run the Project

Simply open `index.html` in browser
OR use a local server:

```bash
npx live-server
```

---

## ⚠️ Important Notes

* OpenWeather API free tier has **limited data** (UV index, AQI etc. are mocked) 
* For production:

  * Use backend to hide API key
  * Enable proper CORS handling

---

## 📱 Screenshots 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/18c04f19-9373-4c0b-9335-6ae07d6b0feb" />


👉 You can add screenshots like:

* Home UI
* Weather Details
* Forecast Section

---

## 💡 Future Improvements

* 🌍 Auto-detect location (Geolocation API)
* 🌙 Dark/Light mode toggle
* 📊 Charts for temperature trends
* 🔔 Weather alerts & notifications
* 🌐 Multi-language support

---

## 👨‍💻 Author

**Saurabh Yadav**
Full Stack Developer 🚀

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it


