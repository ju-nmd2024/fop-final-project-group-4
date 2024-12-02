class Platform {
    constructor(x, y){
        this.x = x;
        this.y = y;
        
    }

    draw(){
        // platforms
        fill(4, 4, 153);
        noStroke();
        rect(this.x - 100, this.y + 40, this.x + 505, this.y -60); // box längst upp
        rect(this.x + 157, this.y + 200, this.x + 575, this.y - 60); // box mitten
        rect(this.x - 100, this.y + 360, this.x + 499, this.y - 60); // box botten
        rect(this.x + 660, this.y + 400, this.x + 25, this.y -60); // sido box1
        rect(this.x + 660, this.y + 76, this.x + 25, this.y -  60); //sido box2


        // walls 
        rect(this.x - 110, this.y + 530, this.x + 800, this.y - 30); // botten 
        rect(this.x - 100, this.y + 10, this.x - 70, this.y + 20);
    }
}

let platform = new Platform(100, 100);

function draw(){
    platform.draw();
}