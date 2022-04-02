var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var level = 0
var started = false

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level)
    nextSequence()
    started = true
  }
})
$(".start").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level)
    nextSequence()
    started = true
  }
})

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatedPress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    $("#level-title").html("Game Over, Press Any Key to Restart")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 700)
    startOver()
  }
}

function nextSequence() {
  userClickedPattern = []
  level++
  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColour)
}

function animatedPress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3")
  audio.play()
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
