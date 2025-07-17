let hours = 0;
let minutes = 0;
let seconds = 0;
let hundredths = 0; 
let tInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// hands
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
  if (!running) {
    running = true;
    tInterval = setInterval(updateTime, 10); 
    startStopBtn.textContent = 'Pause';
  } else {
    running = false;
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
  }
}

function reset() {
  running = false;
  clearInterval(tInterval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  hundredths = 0;
  updateDisplay();
  startStopBtn.textContent = 'Start';
  lapsList.innerHTML = '';

  hourHand.style.transform = 'rotate(0deg)';
  minuteHand.style.transform = 'rotate(0deg)';
  secondHand.style.transform = 'rotate(0deg)';
}

function recordLap() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    lapsList.appendChild(li);
  }
}

function updateTime() {
  hundredths++;
  if (hundredths > 99) {
    hundredths = 0;
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
      if (minutes > 59) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateDisplay();
}

function updateDisplay() {
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  const hs = hundredths.toString().padStart(2, '0');
  display.textContent = `${hh}:${mm}:${ss}:${hs}`;

  // === Continuous second-hand angle calculation ===
  const totalHundredths = (hours * 360000) + (minutes * 6000) + (seconds * 100) + hundredths;
  // 100 hundredths = 1 second, 60 seconds = full circle
  const secondAngle = (totalHundredths / 100) * 6; // each second = 6 degrees

  // minute and hour hands (using smooth interpolation)
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds + hundredths / 100;
  const minuteAngle = (totalSeconds / 60) * 6;      // each minute = 6 degrees
  const hourAngle = (totalSeconds / 3600) * 30;     // each hour = 30 degrees

  secondHand.style.transform = `rotate(${secondAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
}
