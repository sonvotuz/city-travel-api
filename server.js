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
  vungtau: {
    title: "VUNG TAU",
    caption: `The pretty seaside town of Vung Tau is the Vietnamese equivalent of fish n’ chips and a few days by the sea. In short, it's where locals go to relax, soak up the sea breeze, and indulge in seafood feasts. Vung Tau may not have Con Dao's paradisiacal white-sand beaches, but just two hours from Ho Chi Minh City, it's perfect for a quick getaway. Here is the perfect guide to your Vung Tau holiday.`,
    image:
      "url('https://images.unsplash.com/photo-1628996634660-a0355b928063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4030&q=80')",
  },
  binhthuan: {
    title: "BINH THUAN",
    caption: `Binh Thuan has long been something of a best-kept secret for local travelers. But, thanks to its picturesque beauty and diverse topography, more travelers seeking unique experiences in nature are increasingly drawn here. Think gorgeous lakes. Gurgling streams. Dreamy, desert-like spaces. Rocky beaches and windswept seas … Binh Thuan has them all. As it was once part of the Cham principality of Panduranga, Binh Thuan is also archaeologically significant. Want to climb some dunes, learn to surf, go camping or see Cham relics? Give Binh Thuan a go…`,
    image:
      "url('https://images.unsplash.com/photo-1587890799275-ba5614bf3d2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80')",
  },
  cantho: {
    title: "CAN THO",
    caption: `At first glance, Can Tho seems to be a bustling city, with a stream of commerce flowing continuously down the Hau River. But treat yourself to a room on its leafy banks, dine on its sun-ripened fruits and fresh river fish, glide on sampans through its sultry canals, and you’ll soon realise Can Tho’s big city facade is just half the story. The other half? Misty sunrises over the water, lazy afternoons swaying in a hammock, and balmy evenings announced by a chorus of insects. Under the Mekong Delta’s blazing blue skies, Can Tho leaves a vivid impression.`,
    image:
      "url('https://images.unsplash.com/photo-1638684524566-51ada6e1c0e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80')",
  },
  danang: {
    title: "DA NANG",
    caption: `With broad beaches, fantastic street food, the fabled Hai Van Pass, and a growing collection of cafes, restaurants, and bars, it’s no wonder the residents of Da Nang sport some of the broadest smiles in the country. The warm sands of My Khe Beach sweep south from the mountainous Son Tra Peninsula. Da Nang hosts some of Vietnam's top luxury resorts, but much of the beach still belongs to the people who make it their playground, gym, and source of livelihood.`,
    image:
      "url('https://images.unsplash.com/photo-1558002890-c0b30998d1e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=80')",
  },
  hagiang: {
    title: "HA GIANG",
    caption: `A border province and official Frontier Area, Ha Giang lies in the remote far northern region of the country. To visit this province is to journey back in time and encounter some of Vietnam’s most rugged and grand landscapes. Ha Giang is best experienced as a road trip on two wheels, soaking up the majesty of the landscape and the atmosphere of the remote towns and minority villages.`,
    image:
      "url('https://images.unsplash.com/photo-1591815595153-ace4f4f5464c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80')",
  },
  hanoi: {
    title: "HA NOI Capital",
    caption: `Founded over 1000 years ago, Vietnam’s capital city is rich in history, with the streets of its rambling Old Quarter dating back to the 14th century. Wandering these tree-lined lanes past crumbling colonial facades will transport you back in time. However, today's Hanoi is about much more than the past. The ancient city is being invigorated with modern cafes, world-class restaurants, and cool art galleries. When the sun goes down, you have your pick of watering holes, from sophisticated rooftop bars to buzzing bia hơi.`,
    image:
      "url('https://images.unsplash.com/photo-1605552667079-ef6a8fb8d0b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2969&q=80')",
  },
  nhatrang: {
    title: "NHA TRANG - KHANH HOA",
    caption: `Perched on a pristine stretch of the southern coast, Nha Trang is a playground for sunseekers. Days here are spent dining on delicious seafood, snorkelling around stunning islands, and partying on the sand after dark. Nha Trang lays claim to some of the country's finest luxury resorts and thrilling watersports. Despite the development boom, colourful fishing villages and serene riverside restaurants are just a stone's throw away.`,
    image:
      "url('https://images.unsplash.com/photo-1533002832-1721d16b4bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3384&q=80')",
  },
  dalat: {
    title: "DA LAT - LAM DONG",
    caption: `Da Lat. The name conjures visions of luxuriant forests, mirror-like lakes, and cottony clouds. A century after French colonialists founded this resort centre in the Lam Dong highlands, Da Lat’s natural beauty and temperate weather remain as soothing as ever. Wondering what’s the best way to see the best of Da Lat? Read on for eight insider ideas to put on your itinerary.`,
    image:
      "url('https://images.unsplash.com/photo-1552310065-aad9ebece999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2962&q=80')",
  },
  ninhbinh: {
    title: "NINH BINH",
    caption: `Far too few travellers make it to Ninh Binh, a mesmerizing area known locally as ‘Ha Long Bay on Land’ thanks to its magical riverine landscape, with sheer limestone mountains rising up from the paddies. The best way to get a sense of this UNESCO-protected site is by taking a paddleboat tour along its shimmering rivers, and climbing to the top of its fabled peaks.`,
    image:
      "url('https://images.unsplash.com/photo-1656692197297-cb1340b4d538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80')",
  },
  hoian: {
    title: "HOI AN - QUANG NAM",
    caption: `Hoi An is a place where the bold march of progress peters into a leisurely amble. In this one-time trading port, the Thu Bon River meanders past crumbling shop houses and weathered pagodas, while sampans come and go from the old ferry quay. Outside the Old Town, two-lane roads slice through waving rice fields and emerge at a frothy coastline. Stay a couple of days, and Hoi An's easygoing beauty and lantern-lit nights may leave you hopelessly beguiled.`,
    image:
      "url('https://images.unsplash.com/photo-1580666619455-20e015edb501?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80')",
  },
  halong: {
    title: "HA LONG - QUANG NINH",
    caption: `For many, the seascape of Ha Long Bay is synonymous with Vietnam. Cruises sail emerald green waters among thousands of rugged islands and islets, stopping at spectacular caves through which visitors can wander, viewing impressive, centuries-old formations. Ha Long Bay's mystical beauty has made it a bucket list attraction within the country, but it's still possible to find secluded corners to call your own.`,
    image:
      "url('https://images.unsplash.com/photo-1625396836163-80c0d3d7eb86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80')",
  },
  hue: {
    title: "HUE",
    caption: `Hue is a city chock-full of stories. The Kings of the Nguyen Dynasty built their feudal capital along Hue’s fertile riverbanks and atop its forested hills, but their imperial legacy is just one of many reasons to visit. Hue’s refined cuisine is the stuff of legend, and its leafy streets are lined with mossy pagodas, art déco mansions, and eye-popping markets. Through the whole scene flows the Perfume River, setting a languid pace the rest of the city is happy to follow.`,
    image:
      "url('https://images.unsplash.com/photo-1603963005972-48153f99da20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80')",
  },
  phuquoc: {
    title: "PHU QUOC - KIEN GIANG",
    caption: `Phu Quoc's gleaming white sand beaches have earned it the nickname "Pearl Island", but the island's environmental conservation efforts and cultural heritage deserve as much attention as its picturesque sand and surf. Fishing and agriculture remain primary industries, and more than half the laid-back island has been protected by a UNESCO Biosphere Reserve since 2006.
    Home to fish sauce, pepper, and pearls, Phu Quoc offers both luxury and local life, with clean water by day and clear skies at night.`,
    image:
      "url('https://images.unsplash.com/photo-1572572216428-91def7b78278?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4112&q=80')",
  },
  sapa: {
    title: "SAPA - LAO CAI",
    caption: `Sapa town stands at the head of a deep valley of magnificent rice terraces that are still farmed today as they have been for centuries. Backdrops don’t get much more spectacular. Enticing ribbons of road lead the eye down to the valley floor, white-water rivers rush among rice fields, and lush green mountains stretch into the distance as far as the eye can see. The highest peak in the region, Mount Fansipan, crowns the ragged ridge line high above town.`,
    image:
      "url('https://images.unsplash.com/photo-1570366583862-f91883984fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=80')",
  },
  hochiminh: {
    title: "HO CHI MINH CITY",
    caption: `Vibrating with energy, innovation and traffic – lots of traffic – Ho Chi Minh City, formerly known as Saigon, is the economic heart of Vietnam and the main hub of the southern region. A freewheeling, cosmopolitan metropolis, HCMC's dynamic cityscape draws together old and new Vietnam in the most compact of spaces, representing the city’s past as well as its future.`,
    image:
      "url('https://images.unsplash.com/photo-1583428605672-d7d6dd66d1bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2968&q=80')",
  },
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
