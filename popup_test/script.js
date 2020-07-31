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
let label = 'temp label popup';
// let isActive = false;

let button = document.getElementById("button");


// changes state every time button is clicked
button.onclick = function() {
  console.log('button clicked');
  // isActive = !isActive;
  // console.log(button.checked);
  chrome.storage.sync.set({state: button.checked}, function() {
    console.log('State is set to ' + button.checked);
    // console.log(button.checked);
  });
  chrome.runtime.sendMessage({greeting: "hi"}, function(response) {
    console.log('button click sent to bg');
  });
};

// sets button state to stored state
chrome.storage.sync.get(['state'], function(result) {
  console.log('State currently is ' + result.state);
  if (result.state) {
    button.checked = true;
  }
  else {
    button.checked = false;
  }
});

// syntax for chrome.storage
// let value = 'test value';
// chrome.storage.sync.set({key: value}, function() {
//   console.log('Value is set to ' + value);
// });
// chrome.storage.sync.get(['key'], function(result) {
//   console.log('Value currently is ' + result.key);
// });


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



//ask background for label, and set label
function getLabel() {
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    // console.log('got response');
    // console.log(response);
    label = response.label;
  });
}

function setup() {
  createCanvas(260, 260);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(0);
  getLabel();
  console.log(label);

  push();
  translate(width, 0);
  scale(-1.0,1.0);
  image(capture, 0, 0);
  pop();

  if (!button.checked){
    label = 'Face-touching detection is OFF';
  }

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}
