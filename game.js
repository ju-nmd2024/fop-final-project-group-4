/* CODE IS FROM P5JS WEBSITE*/
//1- Declare variable for your image
let img;
let alien;



//2- Preload the image (replace the name and path with your own)
// preload() runs once before setup

// game logic
let velocityY= 0.2;
let accelaration = 0.2;

// Game state
let gameState = false;
function preload() {
  alien =loadImage('alien.png');
  img = loadImage("game1.png");
}

function setup() {
  createCanvas(900, 600);
  imageMode(CENTER);
}

function startScreen() {
  push();
  background(245, 132, 66);
  fill(255, 255, 190);
  textSize(40);
  textAlign(CENTER);
  text("START GAME", 440, 300);
  text("Click or press enter to play", 440, 450);
  pop();
}
 
function gamestate() {
  background(135, 206, 235);
  // the character
  // elements
}

function winScreen() {
  push();
  background(57, 166, 45);
  textSize(40);
  textAlign(CENTER);
  text("WELL DONE!", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}
function loseScreen() {
  push();
  background(255, 0, 0);
  textSize(40);
  textAlign(CENTER);
  text("GAME OVER", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}
 
function draw() {
 /* startScreen();
gamescreen();
winScreen();
loseScreen();*/
  image(img, width / 2, height / 2, width, height);
  image (alien,450,300,70,70);

// garvity
alienY =alienY + velocityY;
velocityY = velocityY + accelaration;


// keys
if (keyIsDown(RIGHT_ARROW)){
  alienX = alienX + 10;
  } else if 
  (keyIsDown(LEFT_ARROW)){
    alienX = alienX - 10;
  } else if 
  (keyIsDown(UP_ARROW)){
    velocitY = velocityY - 0.9;
  }

}
 