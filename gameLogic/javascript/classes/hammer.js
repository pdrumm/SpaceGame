class Hammer extends Base{

  constructor(centerX, centerY, direction, astronautId, startTime, hammerId) {
    super(centerX, centerY, Hammer.WIDTH, Hammer.HEIGHT, Hammer.IMAGE);
    this.direction = direction;
    this.originX = centerX;
    this.originY = centerY;
    this.originTime = Date.now();
    this.hammerId = hammerId;
  }

  update() {

    var pixelsPerSecond = 200;
    this.centerX = this.originX + HelperFunctions.getDirectionX(this.direction) * pixelsPerSecond * (Date.now() - this.originTime) / 1000;
    this.centerY = this.originY + HelperFunctions.getDirectionY(this.direction) * pixelsPerSecond * (Date.now() - this.originTime) / 1000;
    // update rotation
    this.angle = (this.angle + 90 * (Date.now() - this.lastTime) / 250) % 360;
    this.lastTime = Date.now();
    return HelperFunctions.leaveScreen(this, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }

  getHammerId() {
    return this.hammerId;
  }
}

Hammer.WIDTH = 20;
Hammer.HEIGHT = 40;
Hammer.IMAGE = "hammer";
