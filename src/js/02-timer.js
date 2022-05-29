import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStartEl: document.querySelector('[data-start]'),

  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.btnStartEl.addEventListener('click', onBtnStartEl);

refs.btnStartEl.disabled = true;

let selectedDateMs = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStartEl.disabled = true;

      return;
    }

    selectedDateMs = selectedDates[0].getTime();
    refs.btnStartEl.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

function onBtnStartEl() {
  const deltaTime = selectedDateMs - Date.now();
  const resultTime = convertMs(deltaTime);

  updateTimer(resultTime);

  const intervalId = setInterval(() => {
    if (String(Date.now()).slice(0, 10) === String(selectedDateMs).slice(0, 10)) {
      clearInterval(intervalId);

      return;
    }

    const deltaTime = selectedDateMs - Date.now();
    const resultTime = convertMs(deltaTime);

    updateTimer(resultTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(date) {
  refs.daysEl.textContent = addLeadingZero(date.days);
  refs.hoursEl.textContent = addLeadingZero(date.hours);
  refs.minutesEl.textContent = addLeadingZero(date.minutes);
  refs.secondsEl.textContent = addLeadingZero(date.seconds);
}
