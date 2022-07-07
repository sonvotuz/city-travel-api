const express = require("express");
const cors = require("cors");
const util = require("./util/remove-vietnamese-character");
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

const cities = {
  vietnam: {},
  sapa: {},
  hanoi: {},
  quangninh: {},
  hue: {},
  danang: {},
  nhatrang: {},
  hochiminh: {},
  phuquoc: {},
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:city", (req, res) => {
  let cityName = util.removeVietnameseCharacter(
    req.params.city.toLowerCase().split(" ").join("")
  );
  if (cityName === "saigon") cityName = "hochiminh";
  if (cities[cityName]) {
    res.json(cities[cityName]);
  } else {
    res.json(cities["vietnam"]);
  }
});

app.get("*", (req, res) => {
  res.send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`The server is now running on port ${PORT}.`);
});
