let circle1 = {
    x: 100,
    y: 100,
    r: 300,
  };
  
  let circle2 = {
    x: 300,
    y: 300,
    r: 60,
  };
  
  function draw() {
    clear();
    // draw circle1
    fill(255, 0, 0);
    ellipse(circle1.x, circle1.y, circle1.r * 2);
  
    // draw circle2
    fill(0, 255, 0);
    ellipse(circle2.x, circle2.y, circle2.r * 2);
  
    circle2.x = mouseX;
    circle2.y = mouseY;
  
    // console.log(dist(circle1.x, circle1.y, circle2.x, circle2.y));
    if (
      dist(circle1.x, circle1.y, circle2.x, circle2.y) <
      circle1.r + circle2.r
    ) {
      console.log("Collision");
    } else {
      console.log("FREE!");
    }
  }