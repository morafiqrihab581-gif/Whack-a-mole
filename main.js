const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.querySelector("#score");
const TimesLeftDisplay = document.querySelector("#time-left");
const startButton = document.querySelector("#start-btn");

let score = 0;
let timerId = null;
let moleTimer = null;
let currentTime = 30;
let gameRunning = false;

const animals = [
  "🐹",
  "🐭",
  "🐰",
  "🐿️",
  "🦫",
  "🐻"
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clearHoles() {
  holes.forEach(hole => {
    hole.innerHTML = "";
    hole.onclick = null;
  });
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTimeDisplay(time) {
  TimesLeftDisplay.textContent = time;
}

function disableStartButton() {
  startButton.disabled = true;
  startButton.classList.add("disabled");
}

function enableStartButton() {
  startButton.disabled = false;
  startButton.classList.remove("disabled");
}

// Handle click
function handleAnimalClick(hole, animal) {
  score++;
  updateScore();

  hole.innerHTML = "";
  hole.onclick = null;
}

// Game Logic
function showAnimalInRandomHole() {
  clearHoles();

  const hole = getRandomItem([...holes]);
  const animal = getRandomItem(animals);

  hole.innerHTML = `<span>${animal}</span>`;

  hole.onclick = () => handleAnimalClick(hole, animal);
}

function startMoleMovement() {
  moleTimer = setInterval(showAnimalInRandomHole, 700);
}

function stopMoleMovement() {
  clearInterval(moleTimer);
  clearHoles();
}

function startCountdown() {
  timerId = setInterval(() => {
    currentTime--;
    updateTimeDisplay(currentTime);

    if (currentTime <= 0) {
      endGame();
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(timerId);
}

function resetGame() {
  score = 0;
  updateScore();

  currentTime = 30;
  updateTimeDisplay(currentTime);
}

function startGame() {
  if (gameRunning) return;

  gameRunning = true;

  disableStartButton();

  resetGame();
  startMoleMovement();
  startCountdown();
}

function endGame() {
  gameRunning = false;

  stopMoleMovement();
  stopCountdown();

  enableStartButton();

  alert("Game Over! Your final score is: " + score);
}

// Start button
startButton.addEventListener("click", startGame);
