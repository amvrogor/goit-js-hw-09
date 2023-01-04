import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const head = document.querySelector('head');
const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');
const label = document.querySelectorAll('.label');
const daysText = document.querySelector('span[data-days]');
const hoursText = document.querySelector('span[data-hours]');
const minutesText = document.querySelector('span[data-minutes]');
const secondsText = document.querySelector('span[data-seconds]');

const orbitron = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet"> `;
head.insertAdjacentHTML('beforeend', orbitron);

input.style.marginBottom = '20px';
input.style.fontFamily = 'Orbitron';
input.style.fontSize = '20px';

startButton.style.fontFamily = 'Orbitron';
startButton.style.fontSize = '20px';
startButton.style.textTransform = 'uppercase';

timer.style.display = 'flex';
timer.style.gap = '20px';
timer.style.fontFamily = 'Orbitron';
timer.style.paddingLeft = '10px';

field.forEach(e => {
  e.style.display = 'flex';
  e.style.flexDirection = 'column';
  e.style.alignItems = 'center';
});

value.forEach(e => {
  e.style.fontSize = '40px';
});

label.forEach(e => {
  e.style.textTransform = 'uppercase';
});

startButton.disabled = true;
startButton.addEventListener('click', onStart);

const options = {
  enableTime: true,
  //   minDate: 'today',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
      //   window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      startButton.removeEventListener('click', reloadWarning);
    }
  },
};

const fp = flatpickr(input, options);

function onStart() {
  startButton.disabled = true;
  input.disabled = true;
  const timerId = setInterval(() => {
    const ms = fp.selectedDates[0].getTime() - new Date().getTime();
    if (ms <= 0) {
      onStop();
      clearInterval(timerId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(ms);
      daysText.textContent = addLeadingZero(days);
      hoursText.textContent = addLeadingZero(hours);
      minutesText.textContent = addLeadingZero(minutes);
      secondsText.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

function onStop() {
  // startButton.removeEventListener('click', onStart);
  startButton.disabled = false;
  input.disabled = false;
  startButton.addEventListener('click', reloadWarning);
}

function reloadWarning() {
  Notiflix.Notify.warning('Please reload the page to start the timer');
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
