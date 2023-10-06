// Box = charater which is jumping.
// Block = obsticle which is moving.
var gameOn = false;
var score = 0;
var blockLeft;

$("body").click(function () {
  // when user click on body game will going to start and on another box will jump.
  if (gameOn === true) {
    jump();
    scoreIncr();
  }
  gameStart();
});
$(document).keydown(function (event) {
  // it will check if space is pressed then start the game.
  if (gameOn === true) {
    if (event.keyCode === 32 || event.which === 32) {
      jump();
    }
    scoreIncr();
  }

  gameStart();
});

function scoreIncr() {
  // This will increament score on every Succefull jump
  // it will increase score after some delay for smootness

  setTimeout(function () {
    if (blockLeft <= 1) {
      score++;
    }
    setTimeout(() => $(".score").text("Score:" + score), 300);
  }, 500);
}

function jump() {
  $(".box").addClass("jumpAn");
  setTimeout(() => $(".box").removeClass("jumpAn"), 900);
  let jumpSound = new Audio("audio/jump.mp3");
  jumpSound.play();
  // changing Color based on score on every jump
  changeColor();
}

function checkPosition() {
  var boxBottom = parseInt($(".box").css("bottom"));
  blockLeft = parseInt($(".block").css("left"));

  if (boxBottom < 43 && blockLeft < 1 && blockLeft > -90) {
    gameOver();
  }
}

function gameOver() {
  setTimeout(() => $(".block").removeClass("blockAn"), 100);
  $(".container").css("background-color", "red");
  setTimeout(
    () => $(".container").css("background-color", "rgb(64, 58, 58)"),
    1500
  );
  let audio = new Audio("audio/gameover.mp3");
  audio.play();
  gameOn = false;
  $(".score").text(`Game over your score: ${score} click to start`);
  score = 0;
}

function gameStart() {
  $(".block").addClass("blockAn");
  gameOn = true;
  $(".score").text("Score:" + score);
}

function changeColor() {
  const newScore = score;
  if ((newScore !== 0) & (newScore % 5 === 0)) {
    $(".container").css("background-color", getRandomColor());
  }
}

// checking the position of box in every 0.1s so when block is near the box user not press jump game will over.
setInterval(checkPosition, 100);


function getRandomColor() {
  // Generate random values for red, green, and blue (0-255)
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Create a CSS color string in the format "rgb(r, g, b)"
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
} 
