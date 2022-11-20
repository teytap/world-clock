let locationDate = document.querySelector(".location-date");
let row = document.querySelector(".row");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
let cities = [
  "America/New_York",
  "America/Toronto",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Istanbul",
  "Europe/Bucharest",
  "Africa/Johannesburg",
  "Europe/Madrid",
  "Europe/Oslo",
  "Australia/Sydney",
  "Asia/Seoul",
  "Africa/Nairobi",
];
let now = new Date();
function display_c() {
  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout("display_ct()", refresh);
}

function display_ct() {
  var x = new Date();
  var hour = x.getHours();
  var minute = x.getMinutes();
  var second = x.getSeconds();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  var x1 = hour + ":" + minute + ":" + second;
  document.getElementById("ct").innerHTML = x1;
  display_c();
}

locationDate.innerHTML = `${days[now.getDay()]},${now.getDate()} ${
  months[now.getMonth()]
} ${now.getFullYear()}`;

function showTime(response) {
  console.log(response.data);
  const now = new Date(response.data.datetime.slice(0, -6));
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  cityName = response.data.timezone.toString().split("/")[1];

  if (cityName.includes("_")) {
    cityName = cityName.replace("_", " ");
  }

  return (row.innerHTML += `<div class="col-md-3 mb-5">
          <h4>${cityName}</h4>
          <div class="city-clock">${hours}:${minutes}</div>
          <div class="city-day">${days[response.data.day_of_week]}</div>
        </div>`);
}
function getCity(city) {
  let apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
  const res = axios
    .get(
      apiUrl,
      {
        crossdomain: true,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      }
    )
    .then(showTime);
}

cities.forEach((city) => {
  getCity(city);
});
