/* CODE IS FROM P5JS WEBSITE*/
//1- Declare variable for your image
let img;

//2- Preload the image (replace the name and path with your own)
// preload() runs once before setup

function preload() {
  img = loadImage("game1.png");
}

function setup() {
  createCanvas(900, 600);
}

function startScreen() {
  push();
  background(245, 132, 66);
  fill(255, 255, 190);
  textSize(40);
  textAlign(CENTER);
  text("START GAME", 270, 300);
  text("Press enter to play", 270, 450);
  pop();
}

function gameScreen() {
  background(135, 206, 235);
  // the character
  // elements
}

function goodjobscreen() {
  push();
  background(57, 166, 45);
  textSize(40);
  textAlign(CENTER);
  text("WELL DONE!", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}
function badjobscreen() {
  push();
  background(255, 0, 0);
  textSize(40);
  textAlign(CENTER);
  text("GAME OVER", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}

function draw() {
  startScreen();
  gamescreen();
  goodjobscreen();
  badjobscreen();
  imageMode(CENTER);
  image(img, width / 2, height / 2, width, height);
}
