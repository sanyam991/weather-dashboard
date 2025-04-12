const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      current: {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      }
    });

  } catch (error) {
    res.status(500).json({ error: "City not found or API error" });
  }
});

module.exports = router;
