const weather = document.querySelector(".js-weather");

const API_KEY = "93414c84efd5f471c5ba845163afab12";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = Math.round(json.main.temp);
      const place = json.name;
      const country = json.sys.country;
      weather.innerText = `${temperature}℃ @ ${place} - ${country}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("cant access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    //getWeather
  }
}

function init() {
  loadCoords();
}
init();
