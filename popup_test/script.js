console.log('popup running');


// let label = 'temp label';

// let isActive;
// // let SoundLoop;

// // function looping(timeFromNow) {
// //   looper.interval = 1;
// //   myAudio.play(timeFromNow)
// // }

// function setup() {
//   createCanvas(300, 300);
//   colorMode(HSB, 360, 100, 100);
//   noStroke();

//   //looper.start();
//   isActive = true;
// }

// function draw() {
//   background(95);
//   fill(240, 40, 75);
//   ellipse(width/2, height/2, 100);

//   text(label, 100, 250);
// }

//retrieves label 'Touching' or 'Not' from TM in content script
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
  //     console.log(response.label);
  //     label = response.label;
  //   });
  // });

let capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(255);
  // scale(-1.0,1.0);
  image(capture, 0, 0, width, height);
}
