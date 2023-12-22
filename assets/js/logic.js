

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

// Query selectors
const displayTimeLeft = document.querySelector(".timer")
const startButton = document.querySelector("#start");

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
  console.log(secondsLeft);
})

