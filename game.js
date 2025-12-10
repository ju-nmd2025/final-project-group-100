import Platform from "./platform.js";
import Character from "./character.js";

let canvasWidth = 400;
let canvasHeight = 600;

let character;
let platforms = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character(200, 300, 40, 40);

  platforms.push(new Platform(150, 400, 100, 20));
  platforms.push(new Platform(80, 300, 100, 20));
  platforms.push(new Platform(200, 200, 100, 20));
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

  character.draw();
}

function keyPressed() {
  if (key === "A" || key === "a") {
    character.moveLeft();
  } else if (key === "D" || key === "d") {
    character.moveRight();
  }
}
