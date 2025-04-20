let timer;
let timeLeft = 1500; // Default: 25 minutes (Pomodoro)
let isRunning = false;

const display = document.querySelector(".timer-display");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const stopBtn = document.getElementById("stop");
const shortBreakBtn = document.getElementById("short-break");
const longBreakBtn = document.getElementById("long-break");
const alarm = document.getElementById("alarm");

function updateDisplay() {
  let hrs = Math.floor(timeLeft / 3600);
  let mins = Math.floor((timeLeft % 3600) / 60);
  let secs = timeLeft % 60;

  display.textContent =
    `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning && timeLeft > 0) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alarm.play();
        isRunning = false;
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 1500;
  updateDisplay();
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateDisplay();
}

function setMode(minutes) {
  clearInterval(timer);
  isRunning = false;
  timeLeft = minutes * 60;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
stopBtn.addEventListener("click", stopTimer);
shortBreakBtn.addEventListener("click", () => setMode(5));
longBreakBtn.addEventListener("click", () => setMode(15));

updateDisplay();
