const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(1000, 2000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => timeUp = true, 20000);
}

function bonk(e) {
  console.log("Mole clicked!");
  if (!e.isTrusted) return; // Prevent cheating
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

// Add event listeners to moles
moles.forEach(mole => mole.addEventListener('click', bonk));
