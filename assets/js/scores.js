//   high scored are listed, sorted highest to lowest
//   USER HAS OPTION TO TAKE THE QUIZ AGAIN-->

// query selectors
const highscoresList = document.querySelector("#highscores");
const clearHighScoresButton = document.querySelector("#clear");

// assign global variables 
let highscores = [];

renderHighscores();

// render highscores
function renderHighscores() {
  // retrieve from local storage 
  highscores = JSON.parse(localStorage.getItem("localHighscores"));

  console.log(highscores);

}


clearHighScoresButton.addEventListener("click", function() {
  highscores = [];
  // Update the local storage
  localStorage.setItem('highscores', JSON.stringify(highscores));

})

