console.log('script running');

let c, bColor;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  bColor = 100;
  c = 0;
}

function draw() {
  background(bColor);

  fill(c, 40, 75);
  circle(width/2, height/2, 100);
  c = (c+1)%360;

  if (collidePointCircle(mouseX, mouseY, width/2, height/2, 100)) {
    console.log('hit');
    bColor = 10;
  }
  else {
    bColor = 90;
  }
}
