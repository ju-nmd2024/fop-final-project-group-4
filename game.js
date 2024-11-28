/* CODE IS FROM P5JS WEBSITE*/
//1- Declare variable for your image
let img;
let alien;


// Character variables
/*let x = 100;
let y = 100;*/
let alienX = 100;
let alienY = 100;

// Blue platform blockers
let platForm1X = 200;
let platForm1Y = 540;

// Gravity 
let jump = false;
let alienVelocity = 0;

// game logic
let velocityY = 0.2;
let accelaration = 0.2;
// Game state
let gameState = "start";
function preload() {
  alien = loadImage("alien.png");
  img = loadImage("game.png");
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
  image(img, width / 2, height / 2, width, height);
  image(alien, alienX, alienY, 70, 70);
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

function platform(){
fill(4,4,153);
noStroke();
rect(0,140,605,40); // box längst upp
rect(207,279,675,40); // box mitten
rect(0,420,599,40); // box botten
rect(760,456,125,40); // sido box1
rect(760,176,125,40); //sido box2
}
 
function draw() {
  /* startScreen();
gamescreen();
winScreen();
loseScreen();*/

image(img, width / 2, height / 2, width, height); // Background
image(alien, alienX, alienY + 440, 70, 70); // Character alien

platform(); // blue platforms 
  // Handle keyboard input for movement
  if (keyIsDown(RIGHT_ARROW)) {
    push();
    alienX += 3;
    scale(-1,1);
    image(alien, -alienX, alienY + 440, 70, 70);
    pop();
    
  } 
if (keyIsDown(LEFT_ARROW)) {
    alienX -= 3;
    image(alien, alienX, alienY + 440, 70, 70);
  }
  if (keyIsDown(UP_ARROW)) {
    alienY -= 5; // Move upwards by reducing velocity
    jump = true;
    alienVelocity = 5;
    //if (alienY <= 100);
  } else {
    jump = false;
  }
// tutorial: P5Js jump animation (bradlee crockett)
  // Alien velocityY
  alienY -= alienVelocity;

  if (alienY < 100){
    alienVelocity -= 2;
  }

  if (alienY >= 100){
    alienVelocity = 0;
    alienY = 100;

  }
  
  // Prevent alien from falling off the canvas
  if (alienY > height) {
    gameState = "lose"; // Switch to lose screen
  }
}
 