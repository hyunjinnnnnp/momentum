const clockContainer = document.querySelector(".js-clock"),
  dateTitle = clockContainer.querySelector(".date-title"),
  clockTitle = clockContainer.querySelector(".clock-title");

function getDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateToday = date.getDate();
  const day = new Array();
  day[0] = "Sun";
  day[1] = "Mon";
  day[2] = "Tue";
  day[3] = "Wed";
  day[4] = "Thu";
  day[5] = "Fri";
  day[6] = "Sat";
  dateTitle.innerHTML = `${year}.${month}.${dateToday}.${day[date.getDay()]}`;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getDay();
  getTime();

  setInterval(getDay, 1000);
  setInterval(getTime, 1000);
}
init();
