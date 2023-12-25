

// click the start button
//   landing page goes away
//   timer starts
//   first question appears (with its answers)

// for each question:
//   user clicks and answer
//   their choice is compared to the correct answer as stored in the question's object
//   if corret, tell them
//   if incorrect, tell them AND subtract ime from timer
//   optional: play a sound for correct or incorrect 
//   either way, the question dissapears after a few seconds and the next question appears

// for the last question:
//   timer stops
//   question disappears
//   form appears for user to enter their initials
//   display their score

// user submits form 
//   initials and score gets scored in local storage 
//   user is taken to the high scores page 
//   high scored are listed, sorted highest to lowest
//   USER HAS OPTION TO TAKE THE QUIZ AGAIN-->

import { quizQuestions } from './questions.js';

// Query selectors
const displayTimeLeft = document.querySelector(".timer")

// start screen
const startButton = document.querySelector("#start");
const landingPage = document.querySelector("#start-screen");

// questions
const questionsSection = document.querySelector("#questions")
const questionTitle = document.querySelector("#question-title")

let secondsLeft = 60;

// this is for the timer at the top right corner
function startTimer() {
  // Sets interval in variable
  const timerInterval = setInterval(function() {
    secondsLeft--;
    displayTimeLeft.textContent = `Time: ${secondsLeft}`;

    if(secondsLeft == 0) {
      // Stops execution of action
      clearInterval(timerInterval);
      // Calls to end quiz
      return;
    }
  }, 1000);
}

// Event to start quiz 
startButton.addEventListener("click", function() {
  startTimer();

  // hide the landing page
  landingPage.className = "hide";

  startQuiz()
})

function startQuiz() {
  // set questions class attribute to start (so question show)
  questionsSection.className = "start";
  
  
  // for loop to go through each question
  for (let i = 0; i < quizQuestions.length; i++) {
  
  let question = quizQuestions[i].question;
  questionTitle.textContent = `Question 1: ${question}`;
  
    // generate choices
    let choices = quizQuestions[i].choices;
    generateChoices(choices);
    
    // add logic for correct answer
    if (userChoice == quizQuestions[i].correctAnswer) {
      
    }

    }
}


function generateChoices(choices) {
  
  for (let i = 0; i < choices.length; i++) {
    let choicesEl = document.createElement("li");
    choicesEl.textContent = choices[i];
    document.body.appendChild(choicesEl);

    const selectButton = document.createElement("button");
    selectButton.textContent = "Select";
    choicesEl.appendChild(selectButton);

    selectButton.addEventListener("click", function() {
      let userChoice = choices[i];
      return userChoice;
    })
  }

  
}