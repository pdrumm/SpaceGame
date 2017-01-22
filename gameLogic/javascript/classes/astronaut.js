class Astronaut extends Base {

  constructor(centerX, centerY, width, height, canvasWidth, canvasHeight) {
    super(centerX, centerY, width, height, canvasWidth, canvasHeight, "astronaut");
    this.boost = .2;
    this.gettingOxygen = false;
    this.oxygenTime = Date.now();
    this.oxygenX = centerX;
    this.oxygenY = centerY;
    this.oxygen = 100;
  }

  update(keys) {
    if (this.gettingOxygen) {
      if (this.centerX != this.canvasWidth / 2 && this.centerY != this.canvasHeight / 2) {
        // decrease oxygen
        this.oxygen = this.oxygen - (Date.now() - this.lastTime) / 400;
        // this.centerX = this.oxygenX + (this.canvasWidth / 2 - this.centerX) / 100;
        // this.centerY = this.oxygenY + (this.canvasHeight / 2 - this.centerY) / 100;
        var pixelsPerSecond = 100;
        var direction = 180 + Math.atan2(this.oxygenY - this.canvasHeight / 2, this.oxygenX - this.canvasWidth / 2) * 180 / Math.PI;
        this.centerX = this.oxygenX + HelperFunctions.getDirectionX(direction) * pixelsPerSecond * (Date.now() - this.oxygenTime) / 1000;
        this.centerY = this.oxygenY + HelperFunctions.getDirectionY(direction) * pixelsPerSecond * (Date.now() - this.oxygenTime) / 1000;
        if (this.oxygenX < this.canvasWidth / 2 && this.centerX > this.canvasWidth / 2) {
          this.centerX = this.canvasWidth / 2;
          this.centerY = this.canvasHeight / 2;
        } else if (this.oxygenX > this.canvasWidth / 2 && this.centerX < this.canvasWidth / 2) {
          this.centerX = this.canvasWidth / 2;
          this.centerY = this.canvasHeight / 2;
        }
      } else {
        // increases oxygen
        this.oxygen = Math.min(this.oxygen + (Date.now() - this.lastTime) / 40, 100);
        if (this.oxygen == 100) {
          this.gettingOxygen = false;
          this.speedX = 0;
          this.speedY = 0;
        }
      }
    } else {
      // handle all keys that affect the astronaut
      this.handleKeys(keys);
      // decrease oxygen
      this.oxygen = this.oxygen - (Date.now() - this.lastTime) / 400;
      // move astronaut
      this.centerX += this.speedX;
      this.centerY += this.speedY;
      // go through left and right of map
      if (this.canvasWidth < this.centerX - this.width) {
        this.centerX = 0 - this.width / 2;
      } else if (0 > this.centerX + this.width) {
        this.centerX = this.canvasWidth + this.width / 2;
      }
      // go through top and bottom of map
      if (this.canvasHeight < this.centerY - this.height) {
        this.centerY = 0 - this.height / 2;
      } else if (0 > this.centerY + this.height) {
        this.centerY = this.canvasHeight + this.height / 2;
      }
    }

    // update update time
    this.lastTime = Date.now();
  }

  handleKeys(keys) {
    // time since last update
    var timeStep = Date.now() - this.lastTime;
    // rotate astronaut
    if (keys.includes("a")) {
      this.angle += (timeStep / 1000) * -90;
    } else if (keys.includes("d")) {
      this.angle += (timeStep / 1000) * 90;
    }
    // change astonaut's speed
    if (keys.includes("w")) {
      var angle = this.angle % 360;
      if (angle < 0) {
        angle += 360;
      }

      var boostX = 0;
      var boostY = 0;
      if (angle < 90) {
        boostX = (angle) / 90 * this.boost;
        boostY = - (90 - angle) / 90 * this.boost;
      } else if (angle < 180) {
        angle = angle - 90;
        boostX = (90 - angle) / 90 * this.boost;
        boostY = (angle) / 90 * this.boost;
      } else if (angle < 270) {
        angle = angle - 180;
        boostX = - (angle) / 90 * this.boost;
        boostY = (90 - angle) / 90 * this.boost;
      } else if (angle < 360) {
        angle = angle - 270;
        boostX = - (90 - angle) / 90 * this.boost;
        boostY = - (angle) / 90 * this.boost;
      }

      this.speedX += boostX;
      this.speedY += boostY;
    }
  }

  startOxygen() {
    this.oxygenTime = Date.now();
    this.gettingOxygen = true;
    this.oxygenX = this.centerX;
    this.oxygenY = this.centerY;
  }

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }

  getOxygen() {
    return this.oxygen;
  }
}
