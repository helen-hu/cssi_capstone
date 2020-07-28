console.log('popup running');


let label;

let control;
let isActive;
var myAudio = new Audio();
// let SoundLoop;

// function looping(timeFromNow) {
//   looper.interval = 1;
//   myAudio.play(timeFromNow)
// }

function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  control = new Control();
  myAudio.src = chrome.runtime.getURL("song.mp3");
  //looper.start();
  isActive = true;
}

function draw() {
  background(95);
  fill(240, 40, 75);
  ellipse(width/2, height/2, 100);

  if (isActive) {
    checkCondition();
    control.display();
  }

  //retrieves label 'Touching' or 'Not' from TM in content script
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.label);
      label = response.label;
    });
  });

  text(label, 100, 250);
}

function checkCondition() {
  //modify this to check if touching face
  // if (collidePointCircle(mouseX, mouseY, width/2, height/2, 100)) { 
  if (label == 'Touching') {
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
      // myAudio.play();
    }
    else {
      this.displayFalse();
    }
  }
  //modify these methods
  displayTrue() {
    text('stop touching face!', 50, 50);
    myAudio.play();
  }
  displayFalse() {
    text('nice job :)', 50, 50);
    myAudio.pause();
    myAudio.currentTime = 0;
  }
}

//
// let capture;

// function setup() {
//   createCanvas(300, 300);
//   capture = createCapture(VIDEO);
//   capture.size(320, 240);
//   //capture.hide();
// }

// function draw() {
//   background(255);
//   image(capture, 300, 300, 320, 240);
// }
