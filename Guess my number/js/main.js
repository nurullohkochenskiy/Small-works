const checkBtnEl = $(".check");
const newRoundBtnEl = $(".newRound");
const secretnumberEl = $(".number");
const guessEl = $(".guess");
const messageEl = $(".message");
const scoreEl = $(".score");
const highscoreEl = $(".highscore");

const gameSettings = {
  secretnumber: null,
  score: 20,
  highscore: 0,
};

console.log(gameSettings.secretnumber);

let lastPickedNumber = null;

function pickRandomSecretNumber() {
  let newNumber;
  do {
    newNumber = Math.floor(Math.random() * 20) + 1;
  } while (newNumber === lastPickedNumber);

  lastPickedNumber = newNumber;
  return newNumber;
}

(function () {
  gameSettings.secretnumber = pickRandomSecretNumber();
  secretnumberEl.textContent = gameSettings.secretnumber;
  scoreEl.textContent = gameSettings.score;
})();

checkBtnEl.addEventListener("click", checker);

function checker() {
  if (guessEl.value == gameSettings.secretnumber) {
    win();
  } else {
    wrong();
  }
}

function win() {
  messageEl.textContent = "You won";
  document.body.style.background = "green";
  checkBtnEl.removeAttribute("disabled", "true");
  if (gameSettings.score > highscoreEl.textContent) {
    highscoreEl.textContent = gameSettings.score;
  }
  newRoundBtnEl.removeAttribute("disabled");
}

function wrong() {
  const messege =
    guessEl.value > gameSettings.secretnumber ? "too high" : "too low";
  messageEl.textContent = messege;
  document.body.style.background = "crimson";
  gameSettings.score -= 1;
  scoreEl.textContent = gameSettings.score;
  checkBtnEl.setAttribute("disabled", "true");
  setTimeout(() => {
    document.body.style.background = "#222";
    checkBtnEl.removeAttribute("disabled");
  }, 2000);
}

newRoundBtnEl.addEventListener("click", () => {
  newRoundBtnEl.setAttribute("disabled", "true");
  checkBtnEl.removeAttribute("disabled");
  document.body.style.background = "#222";
  gameSettings.secretnumber = pickRandomSecretNumber();
  secretnumberEl.textContent = gameSettings.secretnumber; //! remove later
});
