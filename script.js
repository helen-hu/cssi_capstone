// this was in background in the json file-- json doesn't support comments rip
// "scripts": ["libraries/p5.js", "background.js"],


console.log('content script start');


var myAudio = new Audio();


let label;

let control;
let isActive;


function setLabel() {
    //ask background for label
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    label = response.label;
    });
}

function setup() {
    
    myAudio.src = chrome.runtime.getURL("song.mp3");
    control = new Control();
    //myAudio.play();
    //looper.start();
    isActive = true;

    // getLabel();
    console.log(label);

    createCanvas(300, 300);
    colorMode(HSB, 360, 100, 100);
    noStroke();
}   


function draw() {
    background(0);
    setLabel();

    //test circle
    fill(50);
    ellipse(width/2, height/2, 50, 50);
    
    // Draw the label
    fill(100);
    textSize(16);
    textAlign(CENTER);
    text(label, 100, 100);

    if (isActive) {
        setCondition();
        control.display();
    }
    
}


function checkCondition() {
    return collidePointCircle(mouseX, mouseY, width/2, height/2, 100);
    // return label == 'Touching';
}

function setCondition() {
    if (checkCondition()) {
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
        myAudio.play();
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
        myAudio.pause();
        myAudio.currentTime = 0;
    }
}

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
//     });

