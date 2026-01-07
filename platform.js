const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

export default class Platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;

    this.used = false;

    this.speed = type === "moving" ? random(1, 2) : 0;
    this.direction = 1;
  }

  update() {
    if (this.type === "moving") {
      this.x += this.speed * this.direction;

      // Bounce off walls
      if (this.x <= 0 || this.x + this.w >= 400) {
        this.direction *= -1;
      }
    }
  }

  draw() {
    push();

    if (this.type === "normal") fill("blue");
    if (this.type === "break") fill("brown");
    if (this.type === "moving") fill("purple");

    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
