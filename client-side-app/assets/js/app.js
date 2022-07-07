document.querySelector("#getCity").addEventListener("click", apiRequest);

async function apiRequest() {
  const cityName = document.querySelector("#city").value.trim();

  try {
    const response = await fetch(
      `https://city-travel-api.herokuapp.com/api/${cityName}`
    );
    const data = await response.json();

    if (cityName === "vietnam") {
      document.querySelector("#cityPlace").textContent = data.title;
      document.querySelector("#cityCaption").innerHTML = data.caption;
      document.querySelector("#bg").style.visibility = "visible";
    } else {
      document.querySelector("#bg").style.visibility = "hidden";
      document.querySelector("#cityPlace").textContent = data.title;
      document.querySelector("#cityCaption").innerHTML = data.caption;

      const bodyEl = document.body;
      bodyEl.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),${data.image} no-repeat center center`;
    }
  } catch (err) {
    console.error("Error", err);
  }
}
