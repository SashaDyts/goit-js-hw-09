import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
    } else {
      reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    }
  });
}

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayEl: document.querySelector('[name="delay"]'),
  delayStepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  btn: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', formElSubmit);
refs.firstDelayEl.addEventListener('input', onFirstDelayElInput);
refs.delayStepEl.addEventListener('input', onDelayStepElInput);
refs.amountEl.addEventListener('input', onAmountElInput);

let promiseCount = 0;
let firstdelayMs = 0;
let delayStep = 0;
let amount = 0;

refs.formEl.disabled = true;

function formElSubmit(evt) {
  evt.preventDefault();

  refs.btn.disabled = true;

  let timeoutId = null;
  let intervalId = null;

  timeoutId = setTimeout(() => {
    promiseCount += 1;

    createPromise(promiseCount, firstdelayMs)
      .then(result => result)
      .catch(err => err);

    intervalId = setInterval(() => {
      if (promiseCount === amount) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        promiseCount = 0;
        refs.btn.disabled = false;

        return;
      }
      promiseCount += 1;

      createPromise(promiseCount, delayStep * (promiseCount - 1) + firstdelayMs)
        .then(result => result)
        .catch(err => err);
    }, delayStep);
  }, firstdelayMs);
}

function onFirstDelayElInput(evt) {
  firstdelayMs = Number(evt.target.value);
}

function onDelayStepElInput(evt) {
  delayStep = Number(evt.currentTarget.value);
}

function onAmountElInput(evt) {
  amount = Number(evt.currentTarget.value);
}
