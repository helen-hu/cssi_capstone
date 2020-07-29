// this was in background in the json file-- json doesn't support comments rip
// "scripts": ["libraries/p5.js", "background.js"],


console.log('my new cssi extension!');


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log('received');
        console.log(message);
    }
);


let capture;

function setup() {
  createCanvas(300, 300);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 300, 300, 320, 240);
}

let isNewWindow = false;
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/CJ7DXQnyz/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
createCanvas(320, 260);
// Create the video
video = createCapture(VIDEO);
video.size(320, 240);
video.hide();

flippedVideo = ml5.flipImage(video);
// Start classifying
classifyVideo();
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

