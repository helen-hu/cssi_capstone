// this was in background in the json file-- json doesn't support comments rip
// "scripts": ["libraries/p5.js", "background.js"],


console.log('content script start');


var myAudio = new Audio();


let label = '';

let control;
let isActive;


function setup() {
    myAudio.src = chrome.runtime.getURL("song.mp3");
    control = new Control();
    //looper.start();
    isActive = true;

    getLabel();
}   


function draw() {
    background(0);

    //test circle
    fill(0);
    ellipse(100, 100, 50);
    
    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, 100, 100);

    if (isActive) {
        setCondition();
        control.display();
    }
}


function getLabel() {
    //ask background for label
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log('got response');
        console.log(response);
    });
}


function checkCondition() {
    // return collidePointCircle(mouseX, mouseY, width/2, height/2, 100)
    return label == 'Touching';
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
