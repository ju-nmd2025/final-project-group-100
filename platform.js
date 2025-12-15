const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

export default class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.color = random(colors); // Assign a random color from the array
  }

  draw() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
