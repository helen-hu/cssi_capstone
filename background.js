console.log('background running');



// bruh this works!
// Do first-time setup to gain access to webcam, if necessary.
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason.search(/install/g) === -1) {
    return;
  }
  chrome.tabs.create({
  url: chrome.extension.getURL('welcome.html'),
  active: true
  });
});


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
    console.log('background setup');
    // createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    console.log(video)
    console.log('before flipped');
    flippedVideo = ml5.flipImage(video);
    console.log('got video');
    // console.log(flippedVideo);
    // Start classifying
    classifyVideo();
}

function draw() {
    console.log('drawing');
// background(0);
// // Draw the video
// image(flippedVideo, 0, 0);

// // Draw the label
// fill(255);
// textSize(16);
// textAlign(CENTER);
// text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    console.log('classifying');
    // flippedVideo = ml5.flipImage(video)
    classifier.classify(video, gotResult);
    // flippedVideo.remove();
    // console.log(flippedVideo);
    console.log(gotResult);
    console.log(video);
    console.log('done classifying');
}

// When we get a result
function gotResult(error, results) {
    console.log('getting results');
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    console.log(results[0]);
    label = results[0].label;
    console.log(label);
    // Classify again!
    classifyVideo();
}


//listens to message from content script; responds with label
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      console.log('sending response');
      sendResponse({label: label});
  });




// don't delete this bc i might use the format later
// tries to send message to current tab when a new window is opened. doesn't get received by the tab.
// chrome.windows.onCreated.addListener(newWindow);

// function newWindow(window) {
//     console.log('new window');
//     console.log(window);


//     chrome.tabs.query({
//         active: true, 
//         currentWindow: true 
//         },
//         function (tabs) {
//             console.log(tabs);
//             console.log(tabs[0].id);
            
//             chrome.tabs.sendMessage(tabs[0].id, {greeting: 'background'}, function(response) {
//                 console.log(response.msg);
//             });
//         });
// }




// test to see if the video itself works.
// let capture;

// function setup() {
//     console.log('setting up');
//   createCanvas(300, 300);
//   capture = createCapture(VIDEO);
//   capture.size(320, 240);
//   //capture.hide();

//   console.log(capture);
// }

// function draw() {

// //   background(255);
// //   image(capture, 300, 300, 320, 240);
// }



