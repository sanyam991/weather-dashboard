import React from "react";
import "./Forecast.css";

const Forecast = ({ forecast }) => {
    if (!forecast || !Array.isArray(forecast)) return null; // Prevent crash
  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-scroll">
        {forecast.map((day, index) => (
          <div className="forecast-card" key={index}>
            <p>{new Date(day.date).toLocaleDateString("en-IN", { weekday: 'short' })}</p>
            <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.condition} />
            <p>{day.temperature}°C</p>
            <p>{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
