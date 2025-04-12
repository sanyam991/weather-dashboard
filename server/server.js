// server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const weatherRoute = require("./routes/weather");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Weather route
app.use("/weather", weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Weather API");
});

