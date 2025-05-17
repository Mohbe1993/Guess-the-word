let gameName = "Guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.getElementById(
  "fotter"
).innerHTML = `${gameName} Game Created with <3`;

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numOfHints = 2;

let wordToGuess = "";

const words = [
  "BANANA",
  "CHERRY",
  "ORANGE",
  "PAPAYA",
  "GUAVAS",
  "MELONS",
  "TOMATO",
  "FIGURE",
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numOfHints;
const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", getHint);

function genInput() {
  const inputCont = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) {
      tryDiv.classList.add("dis-input");
    }
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputCont.appendChild(tryDiv);
  }

  inputCont.children[0].children[1].focus();

  const inputsInDIsDiv = document.querySelectorAll(".dis-input input");
  inputsInDIsDiv.forEach((input) => {
    input.disabled = true;

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();

        const nextInput = inputs[index + 1];

        if (nextInput) {
          nextInput.focus();
        }
      });
      input.addEventListener("keydown", function (event) {
        const currentIndex = Array.from(inputs).indexOf(this);
        if (event.key === "ArrowRight") {
          const nextInput = currentIndex + 1;
          if (nextInput < inputs.length) {
            inputs[nextInput].focus();
          }
        }
        if (event.key === "ArrowLeft") {
          const prevInput = currentIndex - 1;
          if (prevInput >= 0) {
            inputs[prevInput].focus();
          }
        }
      });
    });
  });
}

const guessBtn = document.querySelector(".check");

guessBtn.addEventListener("click", handleGuess);

function handleGuess() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.getElementById(
      `guess-${currentTry}-letter-${i}`
    );
    const Letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (Letter === actualLetter) {
      inputField.classList.add("key-1-y");
    } else if (wordToGuess.includes(Letter) && Letter !== "") {
      inputField.classList.add("key-2-n");
      successGuess = false;
    } else {
      inputField.classList.add("key-3-n");
      successGuess = false;
    }
  }

  if (successGuess) {
    messageArea.innerHTML = "You guessed the word!";

    if (numOfHints === 2) {
      messageArea.innerHTML = `<p> You guessed the word! With no hints</p>`;
    }
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("dis-input");
    });
    guessBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("dis-input");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);

    nextTryInputs.forEach((input) => {
      input.disabled = false;
    });
    let el = document.querySelector(`.try-${currentTry} `);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("dis-input");
      el.children[1].focus();
    } else {
      guessBtn.disabled = true;
      hintBtn.disabled = true;
      messageArea.innerHTML = `You lost! The word was <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }

  if (numOfHints === 0) {
    hintBtn.disabled = true;
  }

  const enableInputs = document.querySelectorAll(" input:not([disabled])");

  const emptyInputs = Array.from(enableInputs).filter(
    (input) => input.value === ""
  );

  if (emptyInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyInputs.length);
    const randomInput = emptyInputs[randomIndex];
    const indexToFill = Array.from(enableInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toLowerCase();
    }
  }
}

function handleBachSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];

      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBachSpace);

window.onload = function () {
  genInput();
};
