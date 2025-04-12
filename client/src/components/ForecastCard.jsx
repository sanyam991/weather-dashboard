import React from "react";
import "./ForecastCard.css";

const ForecastCard = ({ day, icon, temp, condition }) => {
  return (
    <div className="forecast-card">
      <h4>{day}</h4>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={condition}
      />
      <p>{temp}°C</p>
      <small>{condition}</small>
    </div>
  );
};

export default ForecastCard;
