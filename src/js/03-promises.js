import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');
const label = document.querySelectorAll('label');
// const submit = document.querySelector('button[type="submit"]');

form.style.display = 'flex';
form.style.gap = '10px';
form.style.alignItems = 'flex-end';
label.forEach(e => {
  e.style.display = 'flex';
  e.style.flexDirection = 'column';
});

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
    delayValue += stepValue;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
