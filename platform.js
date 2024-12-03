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

let platform = new Platform(100, 100);

function draw(){
    platform.draw();
} 