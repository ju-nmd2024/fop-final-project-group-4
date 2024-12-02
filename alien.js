export default class Alien{
    constructor(alien){
        this.size = 70;
        this.alien = alien;
        this.x = 100;
        this.y = 540;
    }
    show(){
        image(this.alien, this.x, this.y, 70, 70);

    }

movement(){
    // Handle keyboard input for movement
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
  image(alien, 0, 0, 70, 70);
  pop();
  if (keyIsDown(UP_ARROW)) {
    alienY -= 5; // Move upwards by reducing velocity
    jump = true;
    alienVelocity = 5;
    //if (alienY <= 100);
  } else {
    jump = false;
  }

}

}