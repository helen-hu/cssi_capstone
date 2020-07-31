console.log('popup running');


// let label = 'temp label';

// let isActive;
// // let SoundLoop;

// // function looping(timeFromNow) {
// //   looper.interval = 1;
// //   myAudio.play(timeFromNow)
// // }

// function setup() {
  // createCanvas(300, 300);
  // colorMode(HSB, 360, 100, 100);
  // noStroke();

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
let label = '';
let isActive = false;



let button = document.getElementById("button");




button.onclick = function() {
  console.log('button clicked');
  isActive = !isActive;
  console.log(isActive);
  chrome.storage.sync.set({state: isActive}, function() {
    console.log('State is set to ' + isActive);
    console.log(button.checked);
  });
  // chrome.runtime.sendMessage({greeting: "hi", active: isActive}, function(response) {
  //   console.log(response.farewell);
  // });
};

chrome.storage.sync.get(['state'], function(result) {
  //console.log('State currently is ' + result.state);
  if (result.state) {
    console.log('here');
    button.checked = true;
  }
  else {
    console.log('else');
    button.checked = false;
  }
});


// document.addEventListener("DOMContentLoaded", () => {
//   const button = document.getElementById("button");
//   button.addEventListener('change', toggleState, false);
//   // get current state and set approriately
//   chrome.storage.sync.get(null, (storage) => {
//       if (storage.isEnabled) {
//           button.checked = true;
//       }
//       else {
//           button.checked = false;
//       }
//   });
// });

// message background
// function toggleState(e) {
//   const port = chrome.runtime.connect({ name: "toggleState" });
//   if (e.target.checked) {
//       port.postMessage({ state: true });
//   }
//   else {
//       port.postMessage({ state: false });
//   }
// }


//ask background for label
function getLabel() {
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    // console.log('got response');
    // console.log(response);
    label = response.label;
  });
}

console.log(label);

function setup() {
  createCanvas(260, 260);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(0);
  getLabel();

  push();
  translate(width, 0);
  scale(-1.0,1.0);
  image(capture, 0, 0);
  pop();

  if (!isActive){
    label = ""
  }

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}
