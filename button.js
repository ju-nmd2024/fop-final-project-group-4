class Button{
    constructor(x, y, width, height, text){
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.text = text; 


    }

    draw(){
        push();
        translate(this.x, this.y);
        stroke(289);
        strokeWeight(4);
        fill(105,230, 195);
        rect(0,0, this.width, this.height, this.height / 2);
    // define text
    noStroke();
    fill(255);
    textSize(this.height / 2);
    textAlign(CENTER);
    text(this.text, 0, this.height/ 4, this.width);
    pop();
    }



}
const myButton = new Button( 100, 100, 200, 50, "Play");


function draw(){
    myButton.draw();
}

function mousePressed(){

    if(mouseX > 100 && mouseX < 100 + 200 && mouseY > 100)
        buttonIsClicked = true;
    console.log = "play";


} 
