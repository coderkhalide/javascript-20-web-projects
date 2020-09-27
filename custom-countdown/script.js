const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const compelteEl = document.getElementById("complete");
const compelteInfoEl = document.getElementById("complete-info");
const compelteBtn = document.getElementById("complete-button");

const localStorageKey = "countdown-item";

let countdownTitle = "";
let countdownDate = "";
let countdownValue = 0;
let countdownActive = 0;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

const setCountdownInfo = (title, date) => {
  countdownTitle = title;
  countdownDate = date;
};

const setCountdownValue = () => {
  if (countdownDate) {
    countdownValue = new Date(countdownDate).getTime();
  }
};

const showDisplay = (type) => {
  const [showForm, showCountdown, showComplete] =
    type === "form"
      ? [true, false, false]
      : type === "countdown"
      ? [false, true, false]
      : type === "complete"
      ? [false, false, true]
      : [true, false, false];
  inputContainer.hidden = !showForm;
  countdownEl.hidden = !showCountdown;
  compelteEl.hidden = !showComplete;
};

const updateDom = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    if (distance < 0) {
      clearInterval(countdownActive);
      showDisplay("complete");
      compelteInfoEl.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      return;
    }

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    showDisplay("countdown");
  }, second);
};

const updateCountdown = (event) => {
  event.preventDefault();
  setCountdownInfo(event.srcElement[0].value, event.srcElement[1].value);
  if (!countdownDate) {
    alert("Please select a date.");
    return;
  }
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      title: countdownTitle,
      date: countdownDate,
    })
  );
  setCountdownValue();
  updateDom();
};

const reset = () => {
  clearInterval(countdownActive);
  showDisplay("form");
  setCountdownInfo("", "");
};

const renderFromLocalStorage = () => {
  const restoredItem = JSON.parse(localStorage.getItem(localStorageKey));
  if (!restoredItem) return;
  setCountdownInfo(restoredItem.title, restoredItem.date);
  setCountdownValue();
  updateDom();
};

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
compelteBtn.addEventListener("click", reset);

renderFromLocalStorage();
