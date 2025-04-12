import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Highlights from "./components/Highlights";
import Forecast from "./components/Forecast";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default dark

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) handleSearch(lastCity);
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(response.data);
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("City not found or server error");
    }
    setLoading(false);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <h2>☁️ Weather Forecast App</h2>
        <SearchBar onSearch={handleSearch} />
        <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
  <span className="icon">{darkMode ? "☀️" : "🌙"}</span>
</div>
      </aside>

      <main className="main-content">
        {loading && <div className="spinner"></div>}
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <>
            <WeatherCard weatherData={weatherData.current} />
            <Forecast forecast={weatherData.forecast} />
            <Highlights data={{
       temperature: weatherData.current.temperature,
       humidity: weatherData.current.humidity,
       wind: weatherData.current.wind,
       uvIndex: weatherData.current.uvIndex,
       sunrise: weatherData.current.sunrise,
       sunset: weatherData.current.sunset,
       feels_like: weatherData.current.feels_like,
    }} />
          </>
        )}
      </main>
    </div>
  );
};
// {/* <SearchBar onSearch={handleSearch} darkMode={darkMode} /> */}

export default App;
