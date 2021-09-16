// All colors in the game
var buttonColors = ["red", "blue", "green", "yellow"];

// User input when playing the game
var userClickedPattern = [];

// Patterns that the player needs to input correctly
var gamePattern = [];

// Game level displayed in the h1
var level = 0;

// Has the game been started?
var started = false;

/*
  Advance the user to 1 level up from the current level
    1) Empty userClickedPattern
    2) Increase gameLevel by 1
    3) Change the h1 according to the current Level
    4) Generate a random color from all colors
    5) Add that generated color to the gamePattern array
    6) Play the animation and sound of that randomly generated color
*/
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(function() {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }, 1000);
}

/*
  Play the corresponding sound according to a given color
*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*
  Play the button pressed animation when the button is pressed
*/
function animatePress(currentColor) {
  var delayInMilliseconds = 100;
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, delayInMilliseconds);
}

/*
  Check the answer from every user input
  against the correct answer

  if the answer is correct
    1) call nextSequence to go up 1 Level
  if the answer is wrong
    1) play the wrong audio sounds
    2) change the background color and remove it after 200 delayInMilliseconds
    3) change the h1 text to "Game Over, press any key to restart"
*/
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        var audio = new Audio("sounds/correct.wav");
        audio.play();
      }, 1000);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to Restart");
    started = false
  }
}

/*
  Reset the variables when the player loses
*/
function startOver() {
  level = 0;
  gamePattern = []
}

/*
  Add a click eventListener to all buttons
    1) Store the html id of the clicked button
    2) Add that clicked button to the userClickedPattern array
    3) Animate and play the button sound as clicked
    4) Check if the clicked button is correct against gamePattern array
*/
$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  var currentClickingLevel = userClickedPattern.length;
  checkAnswer(currentClickingLevel);
});

/*
  Add a keyboard eventListener to the entire document
    if the game hasn't started and the player pressed "a"
      1) advance 1 level to start the game
      2) change started to true
*/
$(document).on("keydown", function(event) {
  if ((!started) && (event.key.toLowerCase() === "a")) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started = true;
  } else if(!started) {
    startOver();
    nextSequence();
  }
});
