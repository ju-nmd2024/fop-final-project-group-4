// variables for images
let alien, img, dunk, tool, wheel, start;

// game elements
let platforms = []; // array for platforms
let collectibles = []; // array for collectibles

// character
let faceDirection = 1;
let alienX = 100;
let alienY = 600;
let alienVelocity = 0;
let onGround = false;

// Gravity
let gravity= 0.5;
let jumpStrength = 15;

// Game state
let gameState = "start";


function preload() {
  alien = loadImage("alien.png");
  img = loadImage("game.png");
  dunk = loadImage("dunk.png");
  tool = loadImage("tool.png");
  wheel = loadImage("wheel.png");
  start = loadImage("screen.png");
  elevator = loadImage("elevator.png");
  lava = loadImage("lava.png");
}

function setup() {
  createCanvas(900, 680);
  imageMode(CENTER);
  for (let i=0;i<1;i++)
  {
    blaPlatform[i] = new Platform(100,100);
  }
  
}


function startScreen() {
  push();
  image(start, width / 2, height / 2, width, height);
  fill(255, 255, 190);
  textSize(40);
  textAlign(CENTER);
  text("START GAME", 440, 300);
  text("Click or press enter to play", 440, 450);

  pop();
}

function gameScreen() {
  image(img, width / 2, height / 2, width, height);
  image(elevator, 145, 320, 225, 30);
  image(dunk, 820, 400, 60, 60);
  image(wheel, 490, 250, 40, 40);
  image(tool, 280, 100, 70, 40);

// Platform in an array
  for (let i=0;i<1;i++)
    {
      blaPlatform[i].draw();
    }
    image(alien, alienX, alienY + 500, 70, 70);
    
}

function winScreen() {
  push();
  image(start, width / 2, height / 2, width, height);
  textSize(40);
  textAlign(CENTER);
  text("WELL DONE!", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}

function loseScreen() {
  push();
  image(start, width / 2, height / 2, width, height);
  textSize(40);
  textAlign(CENTER);
  text("GAME OVER", 330, 300);
  text("click on the screen to restart", 350, 400);
  pop();
}

function draw() {
  //Handle keyboard input for movement
  if (keyIsDown(RIGHT_ARROW)) {
    faceDirection = 1;
    alienX += 3;
  }
  if (keyIsDown(LEFT_ARROW)) {
    alienX -= 3;
    faceDirection = -1;
  }
  push();
  translate(alienX, alienY + 440);
  scale(faceDirection, 1);
 image(alien, 0, 0, 70, 70); //lägg in denna i gamestate
  pop();
  if (keyIsDown(UP_ARROW)) {
    alienY -= 3; // Move upwards by reducing velocity
    jump = true;
    alienVelocity = 5;
  } else {
    jump = false;
  }
  // Alien velocityY
  alienY -= alienVelocity;

  if (alienY < 100) {
    alienVelocity -= 2;
  }

  if (alienY >= 100) {
    alienVelocity = 0;
    alienY = 100;
  }
  if (gameState === "Start"){
    startScreen();
  } else if(gameState === "Play"){
    gameScreen();
  } else if(gameState === "win"){
    winScreen();
  } else if (gameState === "lose"){
    loseScreen();
  }
}

function collisions() {
  soil = false;
}

class Platform {
  constructor(x, y){
      this.x = x;
      this.y = y;
      
  }

  draw(){
      // platforms
      fill(4, 4, 153);
      noStroke();
      rect(this.x - 100, this.y + 40, this.x + 505, this.y -60); // box top
      rect(this.x + 157, this.y + 200, this.x + 535, this.y - 60); // box middle
      rect(this.x - 100, this.y + 360, this.x + 499, this.y - 60); // box bottom
      rect(this.x + 660, this.y + 400, this.x + 25, this.y -60); // side box1
      rect(this.x + 660, this.y + 76, this.x + 25, this.y -  60); //side box2


      // walls 
      rect(this.x - 110, this.y + 530, this.x + 800, this.y - 50); // bottom 
      rect(this.x - 110, this.y -100, this.x + 800, this.y - 80); // top 
      rect(this.x - 100, this.y - 100, this.x - 70, this.y + 550); // left wall
      rect(this.x + 780 , this.y - 100, this.x - 60, this.y + 580); // right wall

  }
}