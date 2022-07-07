const express = require("express");
const cors = require("cors");
const util = require("./util/remove-vietnamese-character");
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

// Source: https://vietnam.travel/
const cities = {
  vietnam: {
    title: "VIETNAM",
    caption: `Plan your next trip in Vietnam to fully get <span class="banhmi">#banhmi</span> badge!`,
  },
  sapa: {
    title: "SAPA",
    caption: `Sapa town stands at the head of a deep valley of magnificent rice terraces that are still farmed today as they have been for centuries. Backdrops don’t get much more spectacular. Enticing ribbons of road lead the eye down to the valley floor, white-water rivers rush among rice fields, and lush green mountains stretch into the distance as far as the eye can see. The highest peak in the region, Mount Fansipan, crowns the ragged ridge line high above town.
          `,
    image:
      "url('https://images.unsplash.com/photo-1570366583862-f91883984fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=80')",
  },
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
