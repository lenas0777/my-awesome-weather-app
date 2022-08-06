let now = new Date();
let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let dateDisplay = document.querySelector("#currentDate");
dateDisplay.innerHTML = `${day}, ${date} ${month}, ${year}`;

function showTemperature(response) {
  let cityTemperature = document.querySelector("#number");
  console.log(cityTemperature);
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = `${temperature}`;
}

function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let showCity = document.querySelector("#currentCity");
  showCity.innerHTML = `${cityInput.value}`;
  let apiKey = "7644cf0e41cb2d8fdabc6b0808cee422";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityDisplay);

function localTemperature(response) {
  let localTemp = document.querySelector("#number");
  console.log(localTemp);
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  localTemp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#currentCity");
  cityName.innerHTML = `${response.data.name}`;
}
function handlePosition(position) {
  let apiKey = "7644cf0e41cb2d8fdabc6b0808cee422";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemperature);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationBtn = document.querySelector("#locationBtn");
locationBtn.addEventListener("click", currentPosition);
