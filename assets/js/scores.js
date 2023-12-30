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
  // sort arrar descending 
  highscores.sort((a, b) => b.score - a.score);
  console.log(highscores);
  
  for (let i = 0; i < highscores.length; i++) {
    let highscoreItem = document.createElement("li");
    highscoreItem.textContent = `${highscores[i].initials}, Score: ${highscores[i].score}`
    highscoresList.appendChild(highscoreItem)
  }
}

clearHighScoresButton.addEventListener("click", function() {
  highscores = [];
  // Update the local storage
  localStorage.setItem('localHighscores', JSON.stringify(highscores));

  // clear existing items appended on page
  const highscoreItems = document.querySelectorAll("li");
  for (const item of highscoreItems) {
    item.remove(); // Remove all buttons
    }
  
})

