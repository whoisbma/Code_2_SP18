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
  float angle;
  float speed = 5;
  float s = 15;

  Ball() {
    pos = new PVector(width/2, height/2);
    vel = new PVector(0, 0);
    angle = random(TWO_PI);
    vel.x = cos(angle) * speed;
    vel.y = sin(angle) * speed;
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