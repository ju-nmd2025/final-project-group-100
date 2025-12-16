export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Horizontal movement
    this.vx = 0;
    this.ax = 0.9;
    this.friction = 0.85;
    this.maxSpeed = 10;

    // Vertical movement
    this.vy = 0;
    this.gravity = 0.6;
    this.jumpForce = -17;

    this.prevY = y;
  }

  update() {
    // storing pervious position
    this.prevY = this.y;

    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Horizontal motion
    this.x += this.vx;

    // Friction
    this.vx *= this.friction;

    // Clamp speed
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

  // landing detection
  isLandingOn(platform) {
    if (this.vy <= 0) return false;

    let withinX =
      this.x + this.w > platform.x && this.x < platform.x + platform.w;

    let wasAbove = this.prevY + this.h <= platform.y;
    let isBelow = this.y + this.h >= platform.y;

    return withinX && wasAbove && isBelow;
  }
}
