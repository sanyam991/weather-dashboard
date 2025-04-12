import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;

  const {
    city,
    country,
    temperature,
    feelsLike,
    condition,
    icon,
    humidity,
    wind,
    sunrise,
    sunset,
  } = weatherData.current;

  return (
    <div className="glass-card weather-main">
      <div className="weather-header">
        <div>
          <h2 className="location">{city}, {country}</h2>
          <p className="condition">{condition}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={condition}
          className="weather-icon"
        />
      </div>
      <div className="temperature">{Math.round(temperature)}°C</div>
      <div className="weather-details">
        <div className="detail-item">💧 Humidity: {humidity}%</div>
        <div className="detail-item">💨 Wind: {wind} m/s</div>
        <div className="detail-item">🌡️ Feels Like: {Math.round(feelsLike)}°C</div>
        <div className="detail-item">
          🌅 Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}
        </div>
        <div className="detail-item">
          🌇 Sunset: {new Date(sunset * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
