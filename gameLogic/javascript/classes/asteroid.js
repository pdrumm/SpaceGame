class Asteroid extends Base{

  constructor(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight) {
    super(centerX, centerY, size * 20, size * 20, canvasWidth, canvasHeight, "asteroid");
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;
    this.angle = (this.angle + 90 * (Date.now() - this.lastTime) / 1000) % 360;
    this.lastTime = Date.now();

    return HelperFunctions.leaveScreen(this, this.canvasWidth, this.canvasHeight);
  }
}
