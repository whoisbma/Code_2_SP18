boolean p1Up;
boolean p1Down;
boolean p2Up;
boolean p2Down;

void setup() {}

void draw() {
  println("p1Up: " + p1Up + 
    "\np1Down: " + p1Down + 
    "\np2Up: " + p2Up + 
    "\np2Down: " + p2Down + "\n");
}

void keyPressed() {
  if (key == 'w') {
    p1Up = true;
  }
  if (key == 's') {
    p1Down = true;
  }

  if (key == CODED) {
    if (keyCode == UP) {
      p2Up = true;
    }
    if (keyCode == DOWN) {
      p2Down = true;
    }
  }
}

void keyReleased() {
  if (key == 'w') {
    p1Up = false;
  }
  if (key == 's') {
    p1Down = false;
  }

  if (key == CODED) {
    if (keyCode == UP) {
      p2Up = false;
    }
    if (keyCode == DOWN) {
      p2Down = false;
    }
  }
}