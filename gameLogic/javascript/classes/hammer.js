class Hammer extends Base{

  constructor(centerX, centerY, speedX, speedY, canvasWidth, canvasHeight) {
    super(centerX, centerY, 20, 20, canvasWidth, canvasHeight, "hammer");
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;

    // detect whether hammer is off the screen
    if (this.canvasWidth < this.centerX - this.width) {
      return true;
    } else if (0 > this.centerX + this.width) {
      return true;
    } else if (this.canvasHeight < this.centerY - this.height) {
      return true;
    } else if (0 > this.centerY + this.height) {
      return true;
    }

    this.angle = (this.angle + 90 * (Date.now() - this.lastTime) / 250) % 360;
    this.lastTime = Date.now();
    return false;
  }

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }
}
