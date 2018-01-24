// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 1
// basic key controls

// this is a fairly reliable approach to managing your input in Processing.
// there's a boolean for every key you want to track
// the keypressed and keyreleased functions update them accordingly.
// there is a potential issue with mac os sierra for keypressed generally, keep an eye out for it:
// https://github.com/processing/processing/wiki/Troubleshooting#key-repeat-on-macos-sierra

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