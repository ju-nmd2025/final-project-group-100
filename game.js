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
  platforms.push(new Platform(80, 250, 100, 20));
  platforms.push(new Platform(200, 100, 100, 20));
}

function draw() {
  background(200);

  character.update();

  for (let p of platforms) {
    p.draw();

    if (character.isLandingOn(p)) {
      character.vy = 0;
      character.y = p.y - character.h;
    }
  }

  if (character.y + character.h > height) {
    character.y = height - character.h;
    character.vy = 0;
  }

  character.draw();
}

function keyPressed() {
  character.jump();
}
