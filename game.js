/* CODE IS FROM P5JS WEBSITE*/
//1- Declare variable for your image
let img;

//2- Preload the image (replace the name and path with your own)
// preload() runs once before setup
function preload() {
  img = loadImage("game1.png");
  }
  
function setup() {
createCanvas(900,600);
}
function draw() {
//3- Displays the image at its actual size at point (0,0)
//image(img, 0, 0);
//You can also resize the image
// Displays the image at point (0, height/2) at half size
  imageMode(CENTER);
  image(img, width/2, height/2, width, height);
  
  


}
