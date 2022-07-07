document.querySelector("#getCity").addEventListener("click", apiRequest);

async function apiRequest() {
  const cityName = document.querySelector("#city").value;

  try {
    // const response = await fetch(
    //   `https://city-travel-api.herokuapp.com/api/${cityName}`
    // );
    // const data = await response.json();

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
    };

    if (cityName === "vietnam") {
      document.querySelector("#cityPlace").textContent =
        cities["vietnam"].title;
      document.querySelector("#cityCaption").innerHTML =
        cities["vietnam"].caption;
      document.querySelector("#bg").style.visibility = "visible";
    } else {
      document.querySelector("#cityPlace").textContent = cities["sapa"].title;
      document.querySelector("#cityCaption").innerHTML = cities["sapa"].caption;
      document.querySelector("#bg").style.visibility = "hidden";

      const bodyEl = document.body;
      bodyEl.style.backgroundPosition = "center";
      bodyEl.style.backgroundRepeat = "no-repeat";
      bodyEl.style.backgroundSize = "cover";
      bodyEl.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),${cities["sapa"].image}`;
    }
  } catch (err) {
    console.error("Error", err);
  }
}
