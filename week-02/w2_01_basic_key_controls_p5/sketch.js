// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 2
// basic key controls approach for p5js

var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200);
  if (p1Up) {
    rect(50, 50, 100, 100);
  }
  if (p1Down) {
    rect(50, 250, 100, 100);
  }
  if (p2Up) {
    rect(250, 50, 100, 100);
  }
  if (p2Down) {
    rect(250, 250, 100, 100);
  }
}

function keyPressed() {
  if (key === 'W') {
    p1Up = true;
  }
  if (key === 'S') {
    p1Down = true;
  }

  // note - we aren't checking for keyCode anymore.
  if (keyCode === UP_ARROW) {
    p2Up = true;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = true;
  }
}

function keyReleased() {
  if (key === 'W') {
    p1Up = false;
  }
  if (key === 'S') {
    p1Down = false;
  }

  if (keyCode === UP_ARROW) {
    p2Up = false;
  }
  if (keyCode === DOWN_ARROW) {
    p2Down = false;
  }
}