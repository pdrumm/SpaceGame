class Asteroid extends Base{

  constructor(centerX, centerY, size, speed, canvasWidth, canvasHeight, direction) {
    console.log("asteroid" + Math.floor(Math.random() * 3) + 1);
    super(centerX, centerY, size * 20, size * 20, canvasWidth, canvasHeight, "asteroid" + (Math.floor(Math.random() * 3) + 1));
    this.size = size;
    this.speed = speed;

    this.direction = direction;
    this.originX = centerX;
    this.originY = centerY;
    this.originTime = Date.now();
  }

  update() {
    var pixelsPerSecond = this.speed;
    this.centerX = this.originX + HelperFunctions.getDirectionX(this.direction) * pixelsPerSecond * (Date.now() - this.originTime) / 1000;
    this.centerY = this.originY + HelperFunctions.getDirectionY(this.direction) * pixelsPerSecond * (Date.now() - this.originTime) / 1000;
    this.angle = (this.angle + 90 * (Date.now() - this.lastTime) / 1000) % 360;
    this.lastTime = Date.now();
    return HelperFunctions.leaveScreen(this, this.canvasWidth, this.canvasHeight);
  }
}
