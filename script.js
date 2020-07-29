// this was in background in the json file-- json doesn't support comments rip
// "scripts": ["libraries/p5.js", "background.js"],


console.log('my new cssi extension!');


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log('received');
        console.log(message);
    }
);

let label;

let control;
let isActive;


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

// let isNewWindow = false;
// // Classifier Variable
// let classifier;
// // Model URL
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/CJ7DXQnyz/';

// // Video
// let video;
// let flippedVideo;
// // To store the classification
// let label = "";

// // Load the model first
// function preload() {
// classifier = ml5.imageClassifier(imageModelURL + 'model.json');
// }

// function setup() {
// createCanvas(320, 260);
// // Create the video
// video = createCapture(VIDEO);
// video.size(320, 240);
// video.hide();

// flippedVideo = ml5.flipImage(video);
// // Start classifying
// classifyVideo();
// }

var myAudio = new Audio();

function setup() {
    myAudio.src = chrome.runtime.getURL("song.mp3");
    control = new Control();
    //looper.start();
    isActive = true;

    if (isActive) {
        checkCondition();
        control.display();
    }
}   

function checkCondition() {
    //modify this to check if touching face
    // if (collidePointCircle(mouseX, mouseY, width/2, height/2, 100)) { 
    if (updateLabel()) {
      control.setTrue();
    }
    else {
      control.setFalse();
      
    }
}

function updateLabel() {
    return label == 'Touching';
}


function draw() {
background(0);
// Draw the video
image(flippedVideo, 0, 0);

// Draw the label
fill(255);
textSize(16);
textAlign(CENTER);
text(label, width / 2, height - 4);
}


// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
// If there is an error
if (error) {
    console.error(error);
    return;
}
// The results are in an array ordered by confidence.
console.log(results[0]);
label = results[0].label;
// Classify again!
classifyVideo();
}


//if label is 'Touching', popup opens.

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello") {
            sendResponse({label: label});
        }   
        else if (request.greeting == 'background') {
            isNewWindow = true;
            console.log('window opened');
            sendResponse({msg: 'hola'});
        }
            
    });


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
