export default class Character {
  constructor(player, x, y, w, h) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //		this.isOnPlatForm = false;
  }

  draw() {
    image(this.player, this.x, this.y, this.w, this.h);
    // Body
    fill("green");
    rect(this.x, this.y, this.w, this.h);

    // Eyes
    fill("black");
    ellipse(this.x + this.w * 0.3, this.y + this.h * 0.3, 15, 15);
    ellipse(this.x + this.w * 0.7, this.y + this.h * 0.3, 15, 7.5);

    // Mouth
    noFill();
    stroke(0);
    arc(this.x + this.w * 0.5, this.y + this.h * 0.7, 40, 10, 0, PI);
  }

  isColliding(character, platform) {
    if (
      platform.y === character.y + character.w &&
      platform.x <= character.x + character.w
    ) {
      return true;
    } else {
      return false;
    }
  }
}
