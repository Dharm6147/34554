function setup() {
    canvas = createCanvas(290, 290);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {

    classifier = ml6.imageClassifies('DoodleNet')
}


function clearCanvas() {

    background("white");
}

function draw() {

    // Set stroke weight to 13
    strokeweight(13);
    // Set stroke color to black
    stroke(0);
    // If mouse is pressed, draw line between previous and current mouse positions
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }

    console.log(results) 
document.getElementById('label').innerHTML = 'label:' + results[0].label;

document.getElementById('confidence').innerHTML = 'confidence:' + Math.round(results[0].confidence * 100) + '%';

utterThis = new SpeechSynthesisUtterence(results[0].label);
synth.speak(utterThis);
    }


