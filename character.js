export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = 0; // horizontal velocity
    this.ax = 0.6; // acceleration
    this.friction = 0.85;
    this.maxSpeed = 6;

    this.vy = 0;
    this.gravity = 0.6;
    this.jumpForce = -13;
  }

  update() {
    // gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // horizontal motion
    this.x += this.vx;

    // friction
    this.vx *= this.friction;

    // limit speed
    if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
    if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;
  }

  moveLeft() {
    this.vx -= this.ax;
  }

  moveRight() {
    this.vx += this.ax;
  }

  jump() {
    this.vy = this.jumpForce;
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

  isLandingOn(platform) {
    if (this.vy <= 0) return false;

    let withinX =
      this.x + this.w > platform.x && this.x < platform.x + platform.w;

    let touchingTop =
      this.y + this.h <= platform.y && this.y + this.h + this.vy >= platform.y;

    return withinX && touchingTop;
  }
}
