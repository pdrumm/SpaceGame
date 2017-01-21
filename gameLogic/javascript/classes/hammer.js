class Hammer extends Base{

  constructor(centerX, centerY, speedX, speedY, canvasWidth, canvasHeight) {
    super(centerX, centerY, 20, 20, canvasWidth, canvasHeight, "hammer");
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;

    this.angle = (this.angle + 90 * (Date.now() - this.lastTime) / 250) % 360;
    this.lastTime = Date.now();
    return HelperFunctions.leaveScreen(this, this.canvasWidth, this.canvasHeight);
  }

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }
}
