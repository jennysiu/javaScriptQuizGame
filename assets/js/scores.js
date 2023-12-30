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
  let highscoresWithSpaces = highscores.join(" ")
  
  for (let i = 0; i < highscores.length; i++) {

    let highscoreItem = document.createElement("li");
    highscoreItem.textContent = `${highscores[i].initials}, Score: ${highscores[i].score}`
    highscoresList.appendChild(highscoreItem)
  }
}


clearHighScoresButton.addEventListener("click", function() {
  highscores = [];
  // Update the local storage
  localStorage.setItem('highscores', JSON.stringify(highscores));

})

