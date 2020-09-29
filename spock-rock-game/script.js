import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".far");

const selected = "selected";

const hands = ["rock", "paper", "scissors", "lizard", "spock"];

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let computerChoice;
let playerScoreNumber = 0;
let computerScoreNumber = 0;

const resetSelected = () => {
  for (const icon of allGameIcons) {
    icon.classList.remove(selected);
  }
  stopConfetti();
  removeConfetti();
};

const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  resultText.textContent = "";
  resetSelected();
};
window.resetAll = resetAll;

const computerRandomChoice = () => {
  const computerChoiceIndex = Math.floor(
    Math.random() * Object.keys(choices).length
  );
  computerChoice = hands[computerChoiceIndex];
};

const displayComputerChoice = () => {
  let choicedElement;
  switch (computerChoice) {
    case "rock":
      choicedElement = computerRock;
      break;
    case "paper":
      choicedElement = computerPaper;
      break;
    case "scissors":
      choicedElement = computerScissors;
      break;
    case "lizard":
      choicedElement = computerLizard;
      break;
    case "spock":
      choicedElement = computerSpock;
      break;
  }
  choicedElement.classList.add(selected);
  computerChoiceEl.textContent = ` --- ${choices[computerChoice].name}`;
};

const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
    return;
  }
  if (choices[playerChoice].defeats.includes(computerChoice)) {
    resultText.textContent = "You Won!";
    playerScoreNumber++;
    playerScoreEl.textContent = playerScoreNumber;
    startConfetti();
  } else {
    resultText.textContent = "You Lost!";
    computerScoreNumber++;
    computerScoreEl.textContent = computerScoreNumber;
  }
};

const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

const select = (playerChoice) => {
  checkResult(playerChoice);
  let choicedElement;
  switch (playerChoice) {
    case "rock":
      choicedElement = playerRock;
      break;
    case "paper":
      choicedElement = playerPaper;
      break;
    case "scissors":
      choicedElement = playerScissors;
      break;
    case "lizard":
      choicedElement = playerLizard;
      break;
    case "spock":
      choicedElement = playerSpock;
      break;
  }
  choicedElement.classList.add(selected);
  playerChoiceEl.textContent = ` --- ${choices[playerChoice].name}`;
};
window.select = select;

resetAll();
