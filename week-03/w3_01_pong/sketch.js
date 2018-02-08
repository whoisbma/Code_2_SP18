// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 3
// pong

var ball;
var p1, p2;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(900, 500);
  centerCanvas();
  ball = new Ball();
  p1 = new Paddle(0);
  p2 = new Paddle(1);
}

function draw() {
  background(0);
  drawField();
  ball.update();
  ball.display();

  p1.move(p1Up, p1Down);
  p1.update();
  p1.display();

  p2.move(p2Up, p2Down);
  p2.update();
  p2.display();

  // this could be done in a loop, with all the objects that the students make.
  checkCollision(ball, p1);
  checkCollision(ball, p2);
}

// should this be global? 
function checkCollision(b, p) {
  if (b.pos.x + b.size/2 > p.pos.x && b.pos.x + b.size/2 < p.pos.x + p.width ||
      b.pos.x - b.size/2 > p.pos.x && b.pos.x - b.size/2 < p.pos.x + p.width) {
    if (b.pos.y > p.pos.y && b.pos.y < p.pos.y + p.height) {
      var angle;
      var diff = (b.pos.y + b.size/2) - p.pos.y;
      if (p.num === 0) {
        angle = map(diff, 0, p.height, -PI/3, PI/3);
      }
      if (p.num === 1) {
        angle = map(diff, p.height, 0, 4*PI/6, 8*PI/6);
      }
      b.vel.set(cos(angle) * b.speed, sin(angle) * b.speed);
    } 

  }
}

function windowResized() {
  centerCanvas();
}

function drawField() {
  stroke(255);
  noFill();
  line(0, margin, width, margin);
  line(0, height - margin, width, height - margin);
  for (var i = margin; i < height - margin - 15; i += 35) {
    var start = i;
    var finish = start + 15;
    line(width/2, start, width/2, finish);
  }
}

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  var angle = random(TWO_PI);
  this.speed = 7;
  this.vel.x = cos(angle) * this.speed;
  this.vel.y = sin(angle) * this.speed;
  this.size = 15;

  this.update = function() {
    if (this.pos.x < 0 - this.size/2) {
      this.resetAfterPoint(0);
    } else if (this.pos.x > width + this.size/2) {
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin + this.size/2 || 
        this.pos.y > height - margin - this.size/2) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  this.resetAfterPoint = function(whichPlayer) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    if (whichPlayer === 1) {
      this.resetAngle(4 * PI/6, 8 * PI/6);
    } else if (whichPlayer === 0) {
      this.resetAngle(-PI/3, PI/3);
    }
  }

  this.resetAngle = function(angleLow, angleHigh) {  
    var angle = random(angleLow, angleHigh);
    this.vel.x = cos(angle) * this.speed;
    this.vel.y = sin(angle) * this.speed;
  }


  // good for using simple approach
  this.checkCollision = function(paddle) {

  }

  // good for arbitrary collisions.
  // make everybody make an object that has a collided method
  this.checkCollision = function(something) {
    // if collided:
    // something.collided();
  }

  // different kinds of collision checking
  this.checkCollision = function(circleDist) {

  }

};

function Paddle(num) {
  this.num = num;
  this.width = 15;
  this.height = 80;
  if (num == 0) {
    this.pos = createVector(margin, height/2);
  } else {
    this.pos = createVector(width-this.width-margin, height/2);
  }
  this.vel = createVector(0, 0);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.move = function(up, down) {
    this.vel.y = 0;
    if (up) {
      if (this.pos.y > margin) {
        this.vel.y = -5;
      } else {
        this.pos.y = margin;
      } 
    }
    if (down) {
      if (this.pos.y + this.height < height - margin) {
        this.vel.y = 5;
      } else {
        this.pos.y = height - this.height - margin;
      }
    } 
  }

  // this only makes sense if the paddle does something really specific to the ball? or to itself?
  // what makes more sense? the thing that is doing the brunt of the action?
  this.checkCollision = function(ball) {

  }

  // this could be called from the ball's function, or from a global function
  this.collided = function(ball) {

  }

  // maybe we get a type, and then do something based on it? 
  this.collided = function(somethingElse) {
    // if somethingElse.id ==
  }
}


// some students make something colliders...
// other students make other kinds of balls?  or some students make the balls' functions, some students make the colliders?
// both have access to each other. 
// do something visual!
// 
function studentColliders(x, y, angle, speed, size) {
  this.id = 0;
  this.pos = createVector(x, y);
  this.speed = speed;
  this.vel = createVector(cos(angle) * speed, sin(angle) * speed);
  this.size = 10;

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.display = function() {
    // draw something here
  }

  this.collided = function(other) {
    // do something cool here! do something to yourself,
    // and also something to the other thing?
  }
}

function keyPressed() {
  if (key === 'W') {
    p1Up = true;
  }
  if (key === 'S') {
    p1Down = true;
  }

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