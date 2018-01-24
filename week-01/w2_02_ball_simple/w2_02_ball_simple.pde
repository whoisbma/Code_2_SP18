// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 1
// simple ball class

Ball ball;

void setup() {
  size(400, 400);
  ball = new Ball();
}

void draw() {
  background(0);
  ball.update();
  ball.display();
}

class Ball {
  PVector pos;
  PVector vel;
  float s = 15;

  Ball() {
    pos = new PVector(width/2, height/2);
    vel = new PVector(0, random(-5, 5));
    float r = random(1);
    if (r < 0.5) {
      vel.x = random(1, 5);
    } else {
      vel.x = random(-5, -1);
    }
  }

  void update() {
    if (pos.x < s/2 || pos.x > width - s/2) {
      vel.x *= -1;
    }
    if (pos.y < s/2 || pos.y > height - s/2) {
      vel.y *= -1;
    }

    pos.add(vel);
  }

  void display() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(pos.x, pos.y, s, s);
  }
}