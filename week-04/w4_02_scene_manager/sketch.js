// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 4
// simple scene state machine

var sceneState = {
  INTRO: 0,
  TUTORIAL: 1,
  GAME: 2,
  WIN: 3,
  LOSE: 4
};

var currentState = sceneState.INTRO;

var keyOn = false;
var tutorialTimer;
var gameTimer;
var gameTimePressed;
const timeForTutorial = 3000;
const timeForGame = 5000;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  drawScene(currentState);
  checkTransition(currentState);
  keyOn = false;
}

function drawScene(whichScene) {
  switch (currentState) {
    case sceneState.INTRO:
      background(100 + sin(frameCount * 0.05) * 50, 100 + sin(frameCount * 0.06) * 50, 100 + sin(frameCount * 0.07) * 50);
      fill(255);
      textSize(80);
      textAlign(CENTER, CENTER);
      text("welcome to the\nPUSH BUTTON\n\"game\"", width/2, height/2);
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        background(150, 200, 200);
        fill(0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("try to hit a key exactly when\nthe counter hits zero", width/2, height/2);

        textSize(24);
        text("notice that this screen progresses\nwhen hitting a key only after a\ntimer has been completed", width/2, height/2 + 120);
        text("OK now you can hit a key", width/2, height/2 + 190);
      } else {
        background(150, 200, 250);
        fill(0);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("HOW TO PLAY...", width/2, height/2 - 100);
        textSize(32);
        text("try to hit a key exactly when\nthe counter hits zero", width/2, height/2);

        textSize(24);
        text("notice that this screen progresses\nwhen hitting a key only after a\ntimer has been completed", width/2, height/2 + 120);
      }
      break;
    case sceneState.GAME:
      var timeLeft = (timeForGame - (millis() - gameTimer))/1000;
      background(map(timeLeft, 5, 0, 255, 0), 250, 150);
      fill(0);
      textSize(164);
      textAlign(CENTER, CENTER);
      text(timeLeft.toFixed(1), width/2, height/2);
      break;
    case sceneState.WIN:
      background(127 + sin(frameCount * 0.05) * 127, 127 + sin(frameCount * 0.06) * 127, 127 + sin(frameCount * 0.07) * 127);
      fill(0);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("You WIN!\n" + "result: " + gameTimePressed, width/2, height/2 - 70);
      textSize(24);
      text("Press any key to return to title", width/2, height - 100);
      fill(255);
      textSize(64);
      text("You WIN!\n" + "result: " + gameTimePressed, width/2 + 5, height/2 - 75);
      textSize(24);
      text("Press any key to return to title", width/2 + 2, height - 102);
      break; 
    case sceneState.LOSE:
      background(10, 10, 10);
      fill(255);
      textSize(64);
      textAlign(CENTER, CENTER);
      text("You lose...\n" + "result: " + gameTimePressed, width/2, height/2);
      textSize(24);
      text("Press any key to try again", width/2, height - 100);
    default:
      break;
  }
}

function checkTransition(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      if (keyOn) {
        currentState++;
        setUpScene(currentState);
      }
      break;
    case sceneState.TUTORIAL:
      if (millis() > tutorialTimer + timeForTutorial) {
        if (keyOn) {
          currentState++;
          setUpScene(currentState);      
        }
      }
      break;
    case sceneState.GAME:
      if (keyOn) {
        gameTimePressed = (timeForGame - (millis() - gameTimer))/1000;
        gameTimePressed = gameTimePressed.toFixed(3);

        if (gameTimePressed < 0.1 && gameTimePressed > -0.1) {
          currentState = sceneState.WIN;      
        } else {
          currentState = sceneState.LOSE;
        }
        setUpScene(currentState);
      }
      break;
    case sceneState.WIN:
      if (keyOn) {
        currentState = sceneState.INTRO;
        setUpScene(currentState);
      }
      break;
    case sceneState.LOSE:
      if (keyOn) {
        currentState = sceneState.GAME;
        setUpScene(currentState);
      }
      break;
    default:
      break;
  }
}

function setUpScene(whichScene) {
  switch (whichScene) {
    case sceneState.INTRO:
      break;
    case sceneState.TUTORIAL:
      tutorialTimer = millis();
      break;
    case sceneState.GAME:
      gameTimer = millis();
      break;
    case sceneState.END:
      break;
    default:
      break;
  }
}

function keyPressed() {
  keyOn = true;
}