// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 2
// simple ball class for p5js

var ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.update();
  ball.display();
}

// Ball class
function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, random(-5, 5));
  var r = random();
  if (r < 0.5) {
    this.vel.x = random(1, 5);
  } else {
    this.vel.x = random(-5, -1);
  }
  this.s = 15;

  this.update = function() {
    if (this.pos.x < this.s/2 || this.pos.x > width - this.s/2) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.s/2 || this.pos.y > height - this.s/2) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.s, this.s);
  }
};