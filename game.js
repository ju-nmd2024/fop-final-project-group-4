// variables for images
let alien, img, dunk, tool, wheel, start, hammer, enemy;
astroX = 90;
astroY = 90;
// game elements
let platforms = []; // array for platforms
let collectibles = []; // array for collectibles
let lavaObjects = [];
// character
let faceDirection = 1;
let alienX = 350;
let alienY = 602;
let alienVelocity = 0;
let onGround = false;
let timer = 20;

// enemy 
let enemyX = 600;
let enemyY = 600;
let enemyHeight = 70;


let direction = "forward";

// Gravity
let gravity = 0.5;
let jumpStrength = 13;

// Game state
let gameState = "start";

function preload() {
  alien = loadImage("alien.png");
  img = loadImage("game.png");
  dunk = loadImage("dunk.png");
  tool = loadImage("tool.png");
  wheel = loadImage("wheel.png");
  start = loadImage("screen.png");
  lava = loadImage("lava.png");
  astro = loadImage("astro.png");
  hammer = loadImage("hammer.png");
  enemy = loadImage("enemy.png");
}

function setup() {
  createCanvas(900, 640);
  imageMode(CENTER);
  // Assistance from student in our class, Oumaima Bouzidi
  lavaObjects.push(new Lava(700, 283, lava, 90, 20)); // top lava
  lavaObjects.push(new Lava(190, 600, lava, 70, 20)); //botten lava 1
  lavaObjects.push(new Lava(490, 600, lava, 70, 20)); // botten lava 2
  lavaObjects.push(new Lava(75, 420, lava, 100, 20)); //middle lava

  // Create platforms
  platforms.push(new Platform(0, 130, 605, 20)); // Top platform
  platforms.push(new Platform(207, 283, 675, 20)); // Middle platform
  platforms.push(new Platform(0, 420, 599, 20)); // Bottom platform
  platforms.push(new Platform(760, 456, 125, 20)); // Side platform 1
  platforms.push(new Platform(760, 176, 125, 20)); // Side platform 2
  platforms.push(new Platform(0, 600, 900, 40)); // Ground platform
  platforms.push(new Platform(0, 0, 30, 640)); // testar vänster vägg
  platforms.push(new Platform(870, 9, 50, 640)); // testar höger vägg
  platforms.push(new Platform(0, 0, 900, 20)); // testar topp vägg
  // Add collectibles
  collectibles.push(new Collectible(820, 400, dunk, 60, 60));
  collectibles.push(new Collectible(280, 100, tool, 70, 40));
  collectibles.push(new Collectible(490, 250, wheel, 30, 30));
  collectibles.push(new Collectible(60, 520, hammer, 50, 50));
  collectibles.push(new Collectible(490, 490, wheel, 30, 30));
  collectibles.push(new Collectible(820, 120, dunk, 60, 60));
}

function startScreen() {
  image(start, width / 2, height / 2, width, height);
  fill(255, 255, 190);
  textSize(60);
  textAlign(CENTER);
  textStyle(BOLD);
  text("START GAME", width / 2, height / 2);
  textSize(20);
  text("Press ENTER to play", width / 2, 370);
}

function gameScreen() {
  image(img, width / 2, height / 2, width, height);
  image(astro, 90, 90, 50, 90);
  
  // draw platforms
  frameRate(30);
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
  fill(255);
  textSize(30);
  textAlign(RIGHT);
  text("Time: " + timer + "s", 570, 48);
  for (let platform of platforms) {
    platform.draw();
  }
  // draw collectibles
  for (let item of collectibles) {
    item.draw();
  }
  for (let lavas of lavaObjects) {
    lavas.draw();
  }
  image(enemy, enemyX, enemyY, 50 ,enemyHeight);
  
  // Handle alien movement
  handlePlayerMovement();

  // Draw alien
  drawAlien();
  
  // moving enemy 
  enemyMove();

  // Check collisions
  checkCollisions();

  // Check if all collectibles are collected
  if (collectibles.every((item) => item.collected)) {
    if (alienX < 112 && alienY === 95) {
      gameState = "win";
    }
  } else if (timer === 0) {
    gameState = "lose";
  }
}

function winScreen() {
  image(start, width / 2, height / 2, width, height);
  fill(0, 128, 0);

  textSize(40);
  textAlign(CENTER);
  text("WELL DONE!", width / 2, height / 2);
  textSize(20);
  text("Press SPACEBAR to restart", width / 2, 370);
}

function loseScreen() {
  image(start, width / 2, height / 2, width, height);
  fill(255, 0, 0);
  textSize(60);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press SPACEBAR to restart", 450, 370);
}
// class for lava
class Lava {
  constructor(x, y, img, width, height) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = width;
    this.height = height;
  }
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
  aliencollision(alienX, alienY) {
    let alienLeft = alienX - 25;
    let alienRight = alienX + 25;
    let alienTop = alienY - 25;
    let alienBottom = alienY + 25;

    // lava image boundaries
    let lavaLeft = this.x - this.width / 2;
    let lavaRight = this.x + this.width / 2;
    let lavaTop = this.y - this.height / 2;
    let lavaBottom = this.y + this.height / 2;
    // kolla om alien är i närheten av lavan

    if (
      alienRight > lavaLeft &&
      alienLeft < lavaRight &&
      alienBottom > lavaTop &&
      alienTop < lavaBottom
    ) {
      return true; // att alien rör lavan
    }
    return false;
  }
}

function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "play") {
    gameScreen();
  } else if (gameState === "win") {
    winScreen();
  } else if (gameState === "lose") {
    loseScreen();
  }
}

function checkCollisions() {
  onGround = false;
  // collision with platforms
  for (let platform of platforms) {
    if (
      alienY + 35 >= platform.y && // bottom hits top of platform
      alienY + 35 <= platform.y + platform.h && // inside the platform height
      alienX + 35 > platform.x && // right side within platform
      alienX - 35 < platform.x + platform.w // left side within platform
    ) {
      alienY = platform.y - 35;
      alienVelocity = 0;
      onGround = true;
    }
    // huvudet slår mot
    if (
      alienY - 35 <= platform.y + platform.h && // toppen slår botten av platformen
      alienY - 35 >= platform.y && // inutti platformens höjd
      alienX + 35 > platform.x && // höger sida av platformen
      alienX - 35 < platform.x + platform.w // vänster sida av platformen
    ) {
      alienY = platform.y + platform.h + 35; // align below platform
      alienVelocity = 0; // stop upward movement
    }
    for (let lava of lavaObjects) {
      if (lava.aliencollision(alienX, alienY)) {
        gameState = "lose"; // Game over if touching lava
        return;
      }
    }
  }

  for (let item of collectibles) {
    item.checkCollision(alienX, alienY);
  }
  if( alienX + 35 > enemyX  && alienY -35 >= 500 )
   {
    gameState ="lose";
  } 
}

// Blue platforms class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    // platforms
    fill(4, 4, 153);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}

// class for collectibles
class Collectible {
  constructor(x, y, img, width = 60, height = 60) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = width;
    this.height = height;
    this.collected = false; // to know if they are collected
  }
  draw() {
    if (!this.collected) {
      image(this.img, this.x, this.y, this.width, this.height);
    }
  }
  checkCollision(alienX, alienY) {
    if (
      alienX + 35 > this.x - this.width / 2 &&
      alienX - 35 < this.x + this.width / 2 &&
      alienY + 35 > this.y - this.height / 2 &&
      alienY - 35 < this.y + this.height / 2
    ) {
      this.collected = true; // Mark as collected
      return true;
    }
    return false;
  }
}

function handlePlayerMovement() {
  // side movement
  if (keyIsDown(RIGHT_ARROW)) {
    faceDirection = 1;
    alienX += 6;
  }
  if (keyIsDown(LEFT_ARROW)) {
    faceDirection = -1;
    alienX -= 6;
  }
  // jump
  if (keyIsDown(UP_ARROW) && onGround) {
    alienVelocity = -jumpStrength;
    onGround = false;
  }

  // gravity
  alienVelocity += gravity;
  alienY += alienVelocity;
  alienX = constrain(alienX, 70, width - 50 - 25); // got it from P5 website
}
function drawAlien() {
  push();
  translate(alienX, alienY);
  scale(faceDirection, 1.4);
  image(alien, 0, 0, 70, 50);
  pop();
}

function enemyMove(){
  //enemy(enemyX,enemyY);
  if (direction === "forward"){
   if (enemyX < 860){
     enemyX = enemyX + 5;
   } else {
     direction = "backwards";
   }
  } else if (direction === "backwards"){
   if (enemyX >= 600){
     enemyX = enemyX - 5;
   } else {
     direction = "forward";
   }
  }
}


function keyPressed() {
  if (gameState === "start" && (key === "Enter" || key === "13")) {
    gameState = "play";
  } else if ((gameState === "win" || gameState === "lose") && key === " ") {
    gameState = "start";
    resetGame();
  }
}

function resetGame() {
  alienX = 350;
  alienY = 600;
  alienVelocity = 0;
  timer = 20;
  for (let item of collectibles) {
    item.collected = false;
  }
}
