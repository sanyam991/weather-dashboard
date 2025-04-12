import React from "react";
import "./Highlights.css";

const Highlights = ({ data }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="highlights-container">
      <h3>Today's Highlights</h3>
      <div className="highlight-cards">
        <div className="highlight-card">
          <p>🌡️ Temperature</p>
          <h4>{Math.round(data.temperature)}°C</h4>
        </div>
        <div className="highlight-card">
          <p>💨 Wind</p>
          <h4>{data.wind} m/s</h4>
        </div>
        <div className="highlight-card">
          <p>💧 Humidity</p>
          <h4>{data.humidity}%</h4>
        </div>
        <div className="highlight-card">
          <p>🔆 UV Index</p>
          <h4>3 (Moderate)</h4> {/* Placeholder unless we fetch real UV */}
        </div>
        <div className="highlight-card">
          <p>🌅 Sunrise</p>
          <h4>{formatTime(data.sunrise)}</h4>
        </div>
        <div className="highlight-card">
          <p>🌇 Sunset</p>
          <h4>{formatTime(data.sunset)}</h4>
        </div>
        <div className="highlight-card">
          <p>🥵 Feels Like</p>
          <h4>{Math.round(data.feels_like)}°C</h4>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
