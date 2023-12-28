// query selectors
const highscoresList = document.querySelector("#highscores");
const clearHighScores = document.querySelector("#clear");

// retrive data from local storage 
let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
// test to see data was retrieved correctly
console.log(userDetails.initials);
// console.log('userDetails:', userDetails);


function addNewScore() {
  let highScoresItem = document.createElement("li");
  console.log(`Initials: ${userDetails.initials}, Score: ${userDetails.score}`)
  highScoresItem.textContent = `${userDetails.initials}, Score: ${userDetails.score}`;
  highscoresList.appendChild(highScoresItem);
}

addNewScore();

clearHighScores.addEventListener("click", function() {

})