import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./SearchBar.css"; // Make sure to create this file

const SearchBar = ({ onSearch }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchedCity, setSearchedCity] = useState(""); // State to store the searched city name
  const [forecast, setForecast] = useState([]); // State to store the 5-day forecast

  const fetchCities = async (input) => {
    if (!input) return;

    try {
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: {
            namePrefix: input,
            limit: 10,
            types: "CITY",
            sort: "-population", // No country filter now, will return cities globally
          },
          headers: {
            "X-RapidAPI-Key": "f11adbd6c5msh02279e4dd1018c1p16ef34jsncea922468b44", // Make sure your API key is valid
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      const cityOptions = response.data.data.map((city) => ({
        label: `${city.city}, ${city.countryCode}`,
        value: city.city,
      }));

      setOptions(cityOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    fetchCities(inputValue);
    return inputValue;
  };

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const handleSearchClick = async () => {
    if (selectedOption) {
      const cityName = selectedOption.value;
      setSearchedCity(cityName); // Set the searched city name
      onSearch(cityName);

      // Fetch the 5-day weather forecast for the city
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: cityName,
              units: "metric", // Use "imperial" for Fahrenheit
              appid: "485122398b6c99b05476ce6d504cf0fb", // Replace with your API key
            },
          }
        );

        // Filter and group the forecast by date, picking one entry per day
        const forecastData = weatherResponse.data.list;
        const uniqueDays = [];
        const seenDates = new Set();

        forecastData.forEach((entry) => {
          const forecastDate = new Date(entry.dt_txt).toLocaleDateString();

          if (!seenDates.has(forecastDate)) {
            seenDates.add(forecastDate);
            uniqueDays.push(entry); // Pick one entry per day
          }
        });

        setForecast(uniqueDays.slice(0, 5)); // Ensure only the first 5 days are shown
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    }
  };

  return (
    <div className="searchbar-container">
      <Select
        classNamePrefix="react-select"
        className="search-select"
        options={options}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder="Enter city name..."
        noOptionsMessage={() => "Start typing..."}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "var(--input-bg)",
            color: "var(--text)",
            borderColor: state.isFocused ? "var(--highlight)" : "var(--border)",
            boxShadow: "none",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--input-bg)",
            zIndex: 99999,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "var(--highlight)" : "var(--input-bg)",
            color: "var(--text)",
            cursor: "pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--text)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "var(--text)",
          }),
        }}
      />

      <button className="search-button" onClick={handleSearchClick}>
        🔍 Search
      </button>

      {/* Display the searched city name at the top center */}
      {searchedCity && (
        <div className="searched-city">
          <strong>{searchedCity}</strong>
        </div>
      )}

      {/* Display the 5-day forecast */}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-days">
            {forecast.map((day, index) => (
              <div className="forecast-day" key={index}>
                <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
                <p>Temperature: {day.main.temp}°C</p>
                <p>Weather: {day.weather[0].description}</p>
                <p>Wind Speed: {day.wind.speed} m/s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
