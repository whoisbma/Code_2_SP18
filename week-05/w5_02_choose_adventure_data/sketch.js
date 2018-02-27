// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// choose your own adventure data

// scene data model: 

// {
//   sceneText: '', //the scene text
//   options: [], // the text options to choose
//   results: []  // the target scene based on the previous options
// }


var currentScene = 0;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
}

function Scene(sceneText, options, results) {
  this.sceneText = sceneText;
  this.options = options;
  this.results = results;

  this.display = function() {
    fill(0);
    text(this.sceneText, 100, 100);
    for (var i = 0; i < options.length; i++) {
      text((i + 1) + ': ' + this.options[i], 150, 200 + i * 50);
    }
  }
}

// function loadPaintData() {
//   loadJSON(scenetDataFile, parseSceneData);
// }

// function parseSceneData(data) {
  
// }