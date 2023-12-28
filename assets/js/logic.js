

// click the start button
//   !landing page goes away
//   !timer starts
//   !first question appears (with its answers)

// for each question:
//   !user clicks and answer
//   !their choice is compared to the correct answer as stored in the question's object
//   !if corret, tell them
//   !if incorrect, tell them AND subtract ime from timer
//   optional: play a sound for correct or incorrect 
//   !either way, the question dissapears after a few seconds and the next question appears

// for the last question:
//   !timer stops
//   !question disappears
//   !form appears for user to enter their initials
//   !display their score

// user submits form 
//   !initials and score gets scored in local storage 
//   !user is taken to the high scores page 
//   high scored are listed, sorted highest to lowest
//   USER HAS OPTION TO TAKE THE QUIZ AGAIN-->

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
let allUsers;

// this is for the timer at the top right corner
function startTimer() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    displayTimeLeft.textContent = `Time: ${secondsLeft}`;

    if(secondsLeft == 0) {
      // Stops execution of action
      clearInterval(timerInterval);
      endQuiz();
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


// Event to start quiz 
startButton.addEventListener("click", function() {
  startTimer();

  // hide the landing page
  landingPage.className = "hide";

  displayQuestion()
})

function displayQuestion() {
  // set questions class attribute to start (so question displays)
  questionsSection.className = "start";

  // display question
  let question = quizQuestions[questionNumber].question;
  questionTitle.textContent = `Question ${questionNumber + 1}: ${question}`;

  displayChoices();
}

// display choices
function displayChoices() {
  let choices = quizQuestions[questionNumber].choices;

  for (let i = 0; i < choices.length; i++) {

    let choiceButton = document.createElement("button");
    choiceButton.textContent = choices[i];
    choicesSection.appendChild(choiceButton);

    // user's choice
    choiceButton.addEventListener("click", function() {
    userChoice = choices[i]; 
    console.log("User selected: " + userChoice);
      // compare answer
      if (userChoice == quizQuestions[questionNumber].correctAnswer) {
          let displayResult = document.createElement("p");
          displayResult.textContent = "Correct!";
          document.body.appendChild(displayResult);
          setTimeout(function() {
            displayResult.textContent = ""; // Clear the text
          }, 3000);
          nextQuestion()
        } else {
          secondsLeft -= 10;
          let displayResult = document.createElement("p");
          displayResult.textContent = "Wrong!";
          document.body.appendChild(displayResult);
          setTimeout(function() {
            displayResult.textContent = ""; // Clear the text
          }, 3000);
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

function endQuiz() {
  stopTimer();
  // test to see if userScore was saved properly
  // console.log(userScore);

  // hide the questions section 
  questionsSection.className = "hide";
  displayEndScreen();
}

function displayEndScreen() {
  // unhide end screen section
  endScreenSection.className = "start";

  // display final score
  finalScore.textContent = (userScore);

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
      // store initials and final score in local storage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log(userDetails);

      // button to view high scores
      let viewHighscoresButton = document.createElement("button");
      viewHighscoresButton.textContent = "View Highscores";
      endScreenSection.appendChild(viewHighscoresButton);
      // when clicked, brings user to high scores section
      viewHighscoresButton.addEventListener("click", function() {
        window.location.href = "/highscores.html"
      })
    }

    // merge to all user details
    allUsers = { ...userDetails, ...allUsers} 
    console.log(allUsers);
    
  })
}

