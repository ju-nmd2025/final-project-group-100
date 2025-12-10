export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vy = 0;
    this.gravity = 0.6;
    this.jumpForce = -12;
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
  }

  draw() {
    fill("green");
    rect(this.x, this.y, this.w, this.h);

    fill("black");
    ellipse(this.x + this.w * 0.3, this.y + this.h * 0.3, 15, 15);
    ellipse(this.x + this.w * 0.7, this.y + this.h * 0.3, 15, 7.5);

    noFill();
    stroke(0);
    arc(this.x + this.w * 0.5, this.y + this.h * 0.7, 40, 10, 0, PI);
  }

  jump() {
    this.vy = this.jumpForce;
  }

  isLandingOn(platform) {
    if (this.vy <= 0) return false;

    let withinX =
      this.x + this.w > platform.x && this.x < platform.x + platform.w;

    let touchingTop =
      this.y + this.h <= platform.y && this.y + this.h + this.vy >= platform.y;

    return withinX && touchingTop;
  }
}
