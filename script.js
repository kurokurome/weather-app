// Hide the info before search

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".location-info").style.display = "none";
  document.querySelector(".current-info").style.display = "none";
});

const APIKey = ""; //Place your own weatherapi.com API key
const searchInput = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

// Simplify displayed text
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

async function weather(cityLocation) {
  try {
    // Init
    const weatherAPI = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${cityLocation}&aqi=no`);
    const data = await weatherAPI.json();
    const locationData = data.location;
    const currentData = data.current;

    const conditionImg = document.getElementById("conditionImg");

    const dayOrNight = currentData.is_day === 1 ? "Day" : "Night";

    // Change background to light if the searched location is day and dark if night
    if (dayOrNight === "Day") {
      document.querySelector("body").style.backgroundColor = "#fffbfa";
      document.querySelector("h1").style.color = "#000000";
    } else {
      document.querySelector("body").style.backgroundColor = "#2b2b2b";
      document.querySelector("h1").style.color = "#fffbfa";
    }

    // Displaying info to the screen
    setText("country", `Country: ${locationData.country}`);
    setText("city", `City: ${locationData.name}`);
    setText("localTime", `Local time: ${locationData.localtime} (${locationData.tz_id})`);
    setText("temp", `${currentData.temp_c}°C | ${currentData.temp_f}°F`);
    setText("feelsLike", `${currentData.feelslike_c}°C | ${currentData.feelslike_f}°F`);
    setText("cloudCondition", `${currentData.condition.text} (${dayOrNight})`);
    conditionImg.src = currentData.condition.icon;
    setText("humidity", `Humidity: ${currentData.humidity}%`);
    setText("windSpeed", `Wind Speed: ${currentData.wind_kph} KPH | ${currentData.wind_mph} MPH`);
    setText("lastUpdatedTime", `Last updated: ${currentData.last_updated}`);

    // Show the info after search
    document.querySelector(".location-info").style.display = "flex";
    document.querySelector(".current-info").style.display = "flex";
  } catch (error) {
    // Catching the error, displaying to screen
    setText("lastUpdatedTime", `Error fetching data`);
    console.log("API Error:", error);
  }
}

// Search when press Enter
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = searchInput.value.trim();
    if (!input) {
      alert("Search bar empty!");
      return;
    } else {
      weather(input);
    }
  }
});

searchBtn.addEventListener("click", () => {
  const input = searchInput.value.trim();
  if (!input) {
    alert("Search bar empty!");
    return;
  } else {
    weather(input);
  }
});
