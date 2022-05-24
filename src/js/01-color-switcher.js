const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', onStartBtnEl);
stopBtnEl.addEventListener('click', onStopBtnEl);

let timerId = null;

function onStartBtnEl() {
  bodyEl.style.backgroundColor = setBackgroundColor();
  timerId = setInterval(setBackgroundColor, 1000);

  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
}

function onStopBtnEl() {
  clearInterval(timerId);

  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBackgroundColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
