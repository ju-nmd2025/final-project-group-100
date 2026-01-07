import Platform from "./platform.js";
import Character from "./character.js";

let gameState = "start";

let canvasWidth = 400;
let canvasHeight = 600;

let character;
let platforms = [];
let score = 0;

const CAMERA_Y = 250;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character(200, 300, 40, 40);

  platforms.push(new Platform(150, 400, 100, 20));
  platforms.push(new Platform(80, 200, 100, 20));
  platforms.push(new Platform(200, 0, 100, 20));
}

function draw() {
  background(200);

  if (gameState === "start") {
    startMenu();
    return;
  }

  if (gameState === "over") {
    gameOver();
    return;
  }

  /*INPUT */
  if (keyIsDown(65)) character.moveLeft(); // A
  if (keyIsDown(68)) character.moveRight(); // D

  character.update();

  /*PLATFORM COLLISIONS */
  for (let p of platforms) {
    p.update();

    if (character.isLandingOn(p)) {
      character.vy = 0;
      character.y = p.y - character.h;

      if (p.type === "break") {
        p.used = true;
      }

      character.jump();
    }
  }

  if (character.y < CAMERA_Y) {
    let dy = CAMERA_Y - character.y;
    character.y = CAMERA_Y;

    for (let p of platforms) {
      p.y += dy;
    }

    score += dy * 0.1;
  }

  platformGeneration();

  if (character.x + character.w < 0) {
    character.x = width;
  } else if (character.x > width) {
    character.x = -character.w;
  }

  if (character.y > height) {
    gameState = "over";
  }

  for (let p of platforms) {
    p.draw();
  }

  character.draw();
  scoreCounter();
}

function platformGeneration() {
  // Remove unnecesary platforms
  platforms = platforms.filter((p) => p.y < canvasHeight + 50 && !p.used);

  // Find highest platform
  let highestY = Infinity;
  for (let p of platforms) {
    if (p.y < highestY) highestY = p.y;
  }

  while (highestY > -200) {
    let spacing = random(180, 210); // safe jump distance
    let newY = highestY - spacing;
    let newX = random(0, canvasWidth - 100);

    let r = random(1);
    let type = "normal";
    if (r < 0.25) type = "break";
    else if (r < 0.45) type = "moving";

    platforms.push(new Platform(newX, newY, 100, 20, type));
    highestY = newY;
  }
}

function scoreCounter() {
  fill(0);
  textSize(16);
  text("Score: " + floor(score), 40, 20);
}

function resetGame() {
  score = 0;
  platforms = [];

  character = new Character(200, 300, 40, 40);

  platforms.push(new Platform(150, 400, 100, 20));
  platforms.push(new Platform(80, 200, 100, 20));
  platforms.push(new Platform(200, 0, 100, 20));

  gameState = "play";
}

function startMenu() {
  buttonStart();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Start", canvasWidth / 2, canvasHeight / 2);
}

function buttonStart() {
  fill(0, 200, 0);
  rect(160, 275, 83, 50);
}

function buttonEnd() {
  fill(0, 200, 0);
  rect(150, 350, 100, 50);
}

function mousePressed() {
  if (gameState === "start") {
    if (mouseX >= 160 && mouseX <= 243 && mouseY >= 275 && mouseY <= 325) {
      gameState = "play";
    }
  } else if (gameState === "over") {
    if (mouseX >= 150 && mouseX <= 250 && mouseY >= 350 && mouseY <= 400) {
      resetGame();
    }
  }
}

function gameOver() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(48);
  text("Game Over", canvasWidth / 2, canvasHeight / 2 - 100);
  textSize(24);
  text("Final Score: " + floor(score), canvasWidth / 2, canvasHeight / 2 - 40);
  buttonEnd();
  textSize(20);
  fill(0);
  text("Restart", canvasWidth / 2, 375);
}

// All your other code is above!
window.setup = setup;

window.draw = draw;

window.addEventListener("click", function (event) {
  mousePressed();
});
