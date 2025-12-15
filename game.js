import Platform from "./platform.js";
import Character from "./character.js";

let canvasWidth = 400;
let canvasHeight = 600;

let character;
let platforms = [];
let score = 0;

function platformGeneration() {
  platforms = platforms.filter((p) => p.y < canvasHeight);

  while (platforms.length < 4) {
    let newX = random(0, canvasWidth - 100);
    let newY = -200;

    platforms.push(new Platform(newX, newY, 100, 20));
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character(200, 300, 40, 40);

  platforms.push(new Platform(150, 400, 100, 20));
  platforms.push(new Platform(80, 200, 100, 20));
  platforms.push(new Platform(200, 0, 100, 20));
}

function draw() {
  background(200);

  if (keyIsDown(65)) {
    // A key
    character.moveLeft();
  }
  if (keyIsDown(68)) {
    // D key
    character.moveRight();
  }
  //

  let camera = 250;
  if (character.y < camera) {
    let dy = camera - character.y;

    character.y = camera;

    for (let p of platforms) {
      p.y += dy;
    }
  }

  character.update();

  // Screen wrap (left ↔ right)
  if (character.x + character.w < 0) {
    // off the left edge
    character.x = width;
  } else if (character.x > width) {
    // off the right edge
    character.x = -character.w;
  }
  //makes it so the character wraps around the screen horizontally

  platformGeneration();

  for (let p of platforms) {
    p.draw();

    if (character.isLandingOn(p)) {
      character.vy = 0;
      character.y = p.y - character.h;
      character.jump();
    }
  }

  if (character.y + character.h > height) {
    character.y = height - character.h;
    character.vy = 0;
  }

  score = character.y < camera ? score + (camera - character.y) * 0.1 : score;

  scoreCounter();
  character.draw();
  startMenu();
  gameOver();
}

function keyPressed() {
  if (key === "A" || key === "a") {
    character.moveLeft();
  } else if (key === "D" || key === "d") {
    character.moveRight();
  }
}

function scoreCounter() {
  push();
  fill(0);
  textSize(16);
  stroke(0);
  text("Score: " + floor(score), 10, 20);
  pop();
}
// The score increases as the character ascends
//if (character.y < canvasHeight / 2) {
//score += (canvasHeight / 2 - character.y) * 0.1;
//}

function startMenu() {
  push();
  buttonStart();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Start", canvasWidth / 2, canvasHeight / 2);

  mousePressed();
  pop();
}

function buttonStart() {
  fill(0, 250, 0);
  rect(160, 275, 83, 50);
}

function mousePressed() {
  if (mouseX >= 150 && mouseX <= 250 && mouseY >= 280 && mouseY <= 320);
}

function gameOver() {
  push();
  buttonEnd();
  fill(255, 0, 0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over", canvasWidth / 2, canvasHeight / 2);
  pop();
}

function buttonEnd() {
  fill(250, 0, 0);
  rect(150, 350, 100, 50);
}
