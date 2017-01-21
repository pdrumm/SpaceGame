class Astronaut extends Base {

  constructor(centerX, centerY, width, height, canvasWidth, canvasHeight) {
    super(centerX, centerY, width, height, canvasWidth, canvasHeight, "astronaut");
    this.boost = .2;
  }

  update(keys) {
    // handle all keys that affect the astronaut
    this.handleKeys(keys);
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

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }
}
