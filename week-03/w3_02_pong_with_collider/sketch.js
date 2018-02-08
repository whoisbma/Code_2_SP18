// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 3
// pong with collider

var ball;
var p1, p2;
var p1Up = false;
var p1Down = false;
var p2Up = false;
var p2Down = false;
var margin = 20;
var cnv;

var collider;

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
  collider = new Collider();
}

function draw() {
  background(0);
  drawField();
  ball.update();
  ball.display();

  p1.move(p1Up, p1Down);
  p2.move(p2Up, p2Down);




  p1.update();
  p2.update();
  // collider.update();
  checkCollision(ball, p1);
  checkCollision(ball, p2);
  // checkCollision(ball, collider);
  p1.display();
  p2.display();
  // collider.display();

}


function checkCollision(ball, other) {

  if (ball.pos.x + ball.width/2 > other.pos.x && 
      ball.pos.x + ball.width/2 < other.pos.x + other.width && 
      ball.pos.y + ball.height/2 > other.pos.y &&
      ball.pos.y + ball.height/2 < other.pos.y + other.height) {
    ball.collided(other);
    other.collided(ball);
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
  this.angle = random(TWO_PI);
  this.speed = 7;
  this.vel.x = cos(this.angle) * this.speed;
  this.vel.y = sin(this.angle) * this.speed;
  this.width = 15;
  this.height = 15;

  this.update = function() {
    if (this.pos.x < -this.width) {
      this.resetAfterPoint(0);
    } else if (this.pos.x > width) {
      this.resetAfterPoint(1);
    }

    if (this.pos.y < margin || 
        this.pos.y > height - margin - this.height) {
      this.vel.y *= -1;
    }

    this.pos.add(this.vel);
  };

  this.display = function() {
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.resetAfterPoint = function(whichPlayer) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.speed = 7;
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

  this.collided = function(other) {
    console.log('ball.collided()');
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

  this.collided = function(other) {
    console.log('paddle collided');
    var diff = other.pos.y - this.pos.y;
    if (this.num === 0) {
      angle = map(diff, 0, this.height, -PI/3, PI/3);
    }
    if (this.num === 1) {
      angle = map(diff, this.height, 0, 4*PI/6, 8*PI/6);
    }
    other.vel.set(cos(other.angle) * other.speed, sin(other.angle) * other.speed);
    other.pos.add(other.vel);
  }
}

function Collider() {
  this.pos = createVector(width/2, height/2);
  this.speed = 5;
  this.angle = 0;
  this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  this.width = 100;
  this.height = 100;

  this.update = function() {
    this.angle = (this.angle + 0.05) % TWO_PI;
    this.vel.x = cos(this.angle) * this.speed;
    this.vel.y = sin(this.angle) * this.speed;
    this.pos.add(this.vel);
  }

  this.display = function() {
    fill(color(map(sin(this.angle), -1, 1, 0, 255), map(cos(this.angle), -1, 1, 0, 255), 1));
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.collided = function(other) {
    // this.width++;
    // this.height++;
    // other.speed *= 2;
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