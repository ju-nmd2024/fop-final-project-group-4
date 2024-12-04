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
 
 // create platforms 
 platforms.push(new Platform(0, 140, 605, 40));   // Top platform
 platforms.push(new Platform(207, 279, 675, 40)); // middle platform
 platforms.push(new Platform(0, 420, 599, 40));   // bottom platform
 platforms.push(new Platform(760, 456, 125, 40)); // side platform 1
 platforms.push(new Platform(760, 176, 125, 40)); // side platform 2
 platforms.push(new Platform(0, 600, 900, 40));   // ground platform 
 platforms.push(new Platform(0, 0, 30, 640));     // left wall 
 platforms.push(new Platform(870, 9, 50, 640));   // right wall 
 platforms.push(new Platform(0, 0, 900, 20));     // roof 
// add collectibles
collectibles.push(new Collectible(820,400,dunk,60,60));
collectibles.push(new Collectible(280,100,tool,70,40));
collectibles.push(new Collectible(490,250,wheel,40,40));
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
  // draw platforms
  for (let platform of platforms){
    platform.draw();
  }

  // draw collectibles
  for(let item of collectibles) {
    item.draw();
  }
  // check if all the items are collected
  if (collectibles.every(item=> item.collected)){
    gameState= "win";
  } // lägga in time stamp här??


  /*image(elevator, 145, 320, 225, 30);
  image(dunk, 820, 400, 60, 60);
  image(wheel, 490, 250, 40, 40);
  image(tool, 280, 100, 70, 40);*/
  

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

// Blue platforms class
class Platform {
  constructor(x, y, w, h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      
  }

  draw(){
      // platforms
      fill(4, 4, 153);
      noStroke();
      rect(this.x, this.y, this.w, this.h);

  }
}

// class for collectibles
class Collectible{
  constructor(x,y,img,width=60,height = 60){
    this.x=x;
    this.y= y;
    this.img=img;
    this.width= width;
    this.height= height;
    this.collected= false; // to know if they are collected
  }
  draw(){
    if(!this.collected){
      image(this.img,this.x,this.y,this.width,this.height);
    }
  }
}