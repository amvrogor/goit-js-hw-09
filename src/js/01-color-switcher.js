const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopButton.disabled = true;

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function onStop() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
