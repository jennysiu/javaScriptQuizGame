// import { addNewScore } from './scores.js';
import { quizQuestions } from './questions.js';

// *** Query selectors
const displayTimeLeft = document.querySelector(".timer");

// start screen section
const startButton = document.querySelector("#start");
const landingPage = document.querySelector("#start-screen");

// questions section
const questionsSection = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesSection = document.querySelector("#choices");

// end screen section 
const endScreenSection = document.querySelector("#end-screen");
const endScreenH2 = document.querySelector("#end-screen h2");
const endScreenP = document.querySelectorAll("#end-screen p")
const finalScore = document.querySelector("#final-score");
const userInitials = document.querySelector("#initials");
const messageDiv = document.querySelector("#message");
const submitButton = document.querySelector("#submit");

// *** assign global variables
let secondsLeft = 60;
let questionNumber = 0;
let userChoice;
let timerInterval;
let userScore;
let userDetails;
let highscores = [];

// this is to start the timer at the top right corner
function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    displayTimeLeft.textContent = `Time: ${secondsLeft}`;

    if(secondsLeft <= 0) {
      // Stops execution of action
      clearInterval(timerInterval);
      randOutOfTime();

      return;
    }
  }, 1000);
}

// to stop the timer at any point
function stopTimer() {
  clearInterval(timerInterval);
  console.log(`Timer stopped with ${secondsLeft} seconds left`);
  userScore = secondsLeft;
}

// displays message - setting a type so that I can style later depending on class type
function displayMessage(type, message) {
  messageDiv.textContent = message;
  messageDiv.setAttribute("class", type);
}

function displayResult(message) {
  // create a temporary divider
  const divider = document.createElement("div");
  divider.className = "divider";
  document.body.appendChild(divider);
  
  let displayResult = document.createElement("p");
  displayResult.className = "displayResult";
  displayResult.textContent = message;
  document.body.appendChild(displayResult);
  // remove after 1 second
  setTimeout(function() {
    displayResult.textContent = ""; // Clear the text
    divider.remove();
  }, 5000);
  console.log(secondsLeft)
}

// Event to start quiz 
startButton.addEventListener("click", function() {
  // hide the landing page
  landingPage.className = "hide";
  startQuiz();
})

function startQuiz() {
  secondsLeft = 60;
  questionNumber = 0;
  startTimer();
  displayQuestion()
}

function displayQuestion() {
  // set questions class attribute to start (so question displays)
  questionsSection.className = "start";
  // display question
  let question = quizQuestions[questionNumber].question;
  questionTitle.innerHTML = `Question ${questionNumber + 1} <br> ${question}`;
  displayChoices();
}

function displayChoices() {
  let choices = quizQuestions[questionNumber].choices;
  // clear any existing buttons
  clearChoiceButtons();

  for (let i = 0; i < choices.length; i++) {
    let choiceButton = document.createElement("button");
    choiceButton.textContent = `${i + 1}. ${choices[i]}`
    choicesSection.appendChild(choiceButton);

    // user's choice
    choiceButton.addEventListener("click", function() {
    userChoice = choices[i]; 
    console.log("User selected: " + userChoice);
      // compare answer
      if (userChoice == quizQuestions[questionNumber].correctAnswer) {
          displayResult("correct!");
          nextQuestion()
        } else {
          secondsLeft -= 10;
          displayResult("wrong!")
          nextQuestion();
        }
    })
  }
}

function nextQuestion() {
  if (questionNumber < 4) {
    questionNumber++;
    clearChoiceButtons();
    displayQuestion();
  } else {
    endQuiz();
  }
}

function clearChoiceButtons() {
  // remove any existing choice buttons
  const choiceButtons = document.querySelectorAll(".choices button");
  for (const button of choiceButtons) {
    button.remove(); // Remove all buttons
  }
}

function randOutOfTime() {
  endQuiz();
  endScreenH2.textContent = "Ran out of time!"
  
  // hide section to enter initials
  endScreenP.forEach(p => {
    p.className = "hide";
  }); 
  // show option to play again
  playAgain();

}

function endQuiz() {
  // hide the questions section & display end screen
  questionsSection.className = "hide";
  displayEndScreen();

}

function displayEndScreen() {
  // unhide end screen section
  endScreenSection.className = "start";

  stopTimer();
  // display time left (as there's a time lag between timer and actual time deducted)
  displayTimeLeft.textContent = `Time: ${secondsLeft}`;
  // display final score
  finalScore.textContent = (userScore);
  
  // test to see if userScore was saved properly
  // console.log(userScore);
}

// submit user initials
submitButton.addEventListener("click", function() {
  userDetails = {
    initials: userInitials.value.trim(),
    score: userScore
  }

  // validate user input
  if (userDetails.initials === "") {
    displayMessage("error", "Initials cannot be blank");
  } else {
    displayMessage("success", "Initials and final score recorded successfully")
    saveUserDetails(userDetails);
    // clear initials from textbox
    userInitials.value = "";
    playAgain();
  }
})

function saveUserDetails(userDetails) {
  // retrieve storedHighscores from localstorage (if not empty) 
  let storedHighscores = JSON.parse(localStorage.getItem("localHighscores"));
  // If localHighscores were retrieved from localStorage, update the highscores array to it
  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }

  // add userDetails to highscores array
  highscores.push(userDetails);
  // test to see if added correctly
  console.log(highscores);

  storeHighscores(storedHighscores)
}

function storeHighscores(storedHighscores) {
  storedHighscores = localStorage.setItem("localHighscores", JSON.stringify(highscores));
  console.log(storeHighscores)
}

function playAgain() {
  // create button to play again
  let playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play again";
  endScreenSection.appendChild(playAgainButton);
  // when clicked, hides end screen and preps to starts new game
  playAgainButton.addEventListener("click", function() {
    endScreenSection.className = "hide";
    // clear play again button
    playAgainButton.remove();
    startQuiz();
  })  
}