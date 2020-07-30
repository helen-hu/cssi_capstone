console.log('background running');


// bruh this works!
// Do first-time setup to gain access to webcam, if necessary.
// chrome.runtime.onInstalled.addListener((details) => {
//   if (details.reason.search(/install/g) === -1) {
//     return;
//   }
//   chrome.tabs.create({
//   url: chrome.extension.getURL('welcome.html'),
//   active: true
//   });
// });

// chrome.storage.local.get('camAccess', items => {
//   if (!!items['camAccess']) {
//     console.log('cam access already exists');
//     setupCam();
//   }
// });

// // If cam acecss gets granted to this extension, setup webcam.
// chrome.storage.onChanged.addListener((changes, namespace) => {
//   if ('camAccess' in changes) {
//     console.log('cam access granted');
//     setupCam();
//   }
// });

// code from github project
// Setup webcam, initialize the KNN classifier model and start the work loop.
// async function setupCam() {
//   navigator.mediaDevices.getUserMedia({
//     video: true
//   }).then(mediaStream => {
//     vid.srcObject = mediaStream;
//   }).catch((error) => {
//     console.warn(error);
//   });
//   await classifier.load();
//   setTimeout(loop, 50);
// }




// // Classifier Variable
// let classifier;
// // Model URL
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/CJ7DXQnyz/';


// // Video
// let video;
// let flippedVideo;
// // To store the classification
// let label = 'temp label from background';

// var v = document.getElementById('webcamVideo');

// // Load the model first
// function preload() {
//   console.log('preloading');
//   classifier = ml5.imageClassifier(imageModelURL + 'model.json');
//   //console.log(classifier);
// }
// //const vid = document.querySelector('#webcamVideo');

// function setup() {
//     console.log('background setup');
//     // createCanvas(320, 260);
//     // Create the video


//     navigator.mediaDevices.getUserMedia({
//       video: true
//     }).then(mediaStream => {
//       v.srcObject = mediaStream;
//       console.log('before flipped');
//     console.log(v);
//     //flippedVideo = ml5.flipImage(video);
//     console.log('got video');
//     console.log(v);
//     // console.log(flippedVideo);
//     // Start classifying
//     classifyVideo(v);
//     }).catch((error) => {
//       console.warn(error);
//     });


    // createCapture(VIDEO, (video) =>
    // {//video.hide();
    // v.srcObject = video;
    // console.log('before flipped');
    // console.log(v);
    // //flippedVideo = ml5.flipImage(video);
    // console.log('got video');
    // console.log(v);
    // // console.log(flippedVideo);
    // // Start classifying
    // classifyVideo(v);});

    // video = mediaStream;
    //video.size(320, 240);

    //console.log(video)
    // console.log('before flipped');
    // flippedVideo = ml5.flipImage(video);
    // console.log('got video');
    // // console.log(flippedVideo);
    // // Start classifying
    // classifyVideo();
// }

//code from createCapture reference page
// function setup() {
//   createCanvas(10, 10);
//   let constraints = {
//     video: {
//       mandatory: {
//         minWidth: 10,
//         minHeight: 10
//       },
//       optional: [{ maxFrameRate: 10 }]
//     },
//     audio: true
//   };
//   createCapture(constraints, function(stream) {
//     console.log(stream);
//   });
// }

// function draw() {
//     console.log('drawing');
// // background(0);
// // // Draw the video
// // image(flippedVideo, 0, 0);

// // // Draw the label
// // fill(255);
// // textSize(16);
// // textAlign(CENTER);
// // text(label, width / 2, height - 4);
// }


// // When we get a result
// function gotResult(error, results) {
//   console.log('getting results');
//   // If there is an error
//   if (error) {
//       console.error(error);
//       return;
//   }
//   // The results are in an array ordered by confidence.
//   console.log(results[0]);
//   label = results[0].label;
//   // Classify again!
//   classifyVideo();
// }


// // Get a prediction for the current video frame

// function classifyVideo() {
//     console.log('classifying');
//     console.log(v);
//     //flippedVideo = ml5.flipImage(video)
//     window.requestAnimationFrame(() => {
//       classifier.classify(v, gotResults);
//     });
//     console.log('classifier running');
//     //flippedVideo.remove();
//     //console.log(flippedVideo);
//     //console.log(gotResult);
//     //console.log(video);
//     //console.log('done classifying');
//     //console.log(label);
// }



// // When we get a result
// function gotResult(error, results) {
//     console.log('getting results');
//     console.log(v);
//     // If there is an error
//     if (error) {
//         console.error(error);
//         return;
//     }
//     // The results are in an array ordered by confidence.
//     console.log(results[0]);
//     label = results[0].label;
//     // Classify again!
//     classifyVideo(v);
// }


// //listens to message from content script; responds with label
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello"){
      console.log('sending response');
      sendResponse({label: label});}
      // console.log(label);
    // if (request.greeting == "hi"){
    //   isActive = request.active;
    //   console.log(isActive);
    // }
  });

  // console.log(isActive);





  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
  //     console.log(response.farewell);
  //   });
  // });


  







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




    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = 'https://teachablemachine.withgoogle.com/models/CJ7DXQnyz/';

    let model, webcam, labelContainer, maxPredictions;
    let label;
    let myAudio = new Audio();
    let openWindow = false;

    // Load the image model and setup the webcam
    async function init() {
      console.log('init start');
      myAudio.src = chrome.runtime.getURL("song.mp3");
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip

        console.log(webcam);
        await webcam.setup(); // request access to the webcam
        console.log('done setup');
        await webcam.play();
        console.log('done play');
        setTimeout(loop, 50);
        //window.requestAnimationFrame(loop);
        console.log('done loop');
        //console.log(isActive);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
      // if (isActive){
        console.log('looping');
          webcam.update(); // update the webcam frame
          await predict();
          setTimeout(loop, 50);
      //}
    }

    // run the webcam image through the image model
    async function predict() {
      console.log('predict start');
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        let max = prediction[0].probability;
        label = prediction[0].className;
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            console.log(classPrediction);
            labelContainer.childNodes[i].innerHTML = classPrediction;
            if (prediction[i].probability > 0.7){
              max = prediction[i].probability;
              label = prediction[i].className;
            }
        }
        if (label == "Touching"){
          if (!openWindow){
            chrome.windows.create({url: "https://www.google.com/"})
            openWindow = true;
          }
          myAudio.play();
        }
        if (label == "Not"){
          myAudio.pause();
          myAudio.currentTime = 0;
        }
    }

    init();


