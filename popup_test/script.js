console.log('script running');

let control;
let isActive;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  control = new Control();

  isActive = true;
}

function draw() {
  background(95);
  fill(240, 40, 75);
  circle(width/2, height/2, 100);

  if (isActive) {
    checkCondition();
    control.display();
  }
}

function checkCondition() {
  //modify this to check if touching face
  if (collidePointCircle(mouseX, mouseY, width/2, height/2, 100)) { 
    control.setTrue();
  }
  else {
    control.setFalse();
  }
}

class Control {
  constructor() {
    this.isTouched = false;
  }
  getBool() {
    return this.isTouched;
  }
  setTrue() {
    this.isTouched = true;
  }
  setFalse() {
    this.isTouched = false;
  }
  display() {
    if (this.isTouched) {
      this.displayTrue();
    }
    else {
      this.displayFalse();
    }
  }
  //modify these methods
  displayTrue() {
    text('stop touching face!', 50, 50);
  }
  displayFalse() {
    text('nice job :)', 50, 50);
  }
}
