class Astronaut {

  constructor(centerX, centerY, width, height, canvasWidth, canvasHeight) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);;
    this.angle = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lastTime = Date.now();

    this.boost = .2;
    this.speedX = 0;
    this.speedY = 0;
    this.img = document.getElementById("astronaut");
  }

  update(keys) {
    var timeStep = Date.now() - this.lastTime;
    if (keys.includes("a")) {
      this.angle += (timeStep / 1000) * -90;
    } else if (keys.includes("d")) {
      this.angle += (timeStep / 1000) * 90;
    }

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

    this.lastTime = Date.now();
  }

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.translate(this.centerX, this.centerY);
    canvas.rotate(this.angle * Math.PI / 180);
    canvas.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    canvas.rotate(- this.angle * Math.PI / 180);
    canvas.translate(- this.centerX, - this.centerY);

    canvas.fillRect(this.centerX - 5, this.centerY - 5, 10, 10);

  }
  
  collideWithAsteroid(asteroids) {
    for (var i = 0; i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      if (this.intersects(this.centerX - this.width / 2, this.centerX + this.width / 2, asteroid.getCenterX() - asteroid.getWidth() / 2, asteroid.getCenterX() + asteroid.getWidth() / 2)) {
        if (this.intersects(this.centerY - this.height / 2, this.centerY + this.height / 2, asteroid.getCenterY() - asteroid.getHeight() / 2, asteroid.getCenterY() + asteroid.getHeight() / 2)) {
          return i;
        }
      }
    }
    return -1;
  }

  intersects(a1, a2, b1, b2) {
    if (a2 < b1) {
      return false;
    }
    if (a1 > b2) {
      return false;
    }

    return true;
  }

  getCenterX() {
    return this.centerX;
  }

  getCenterY() {
    return this.centerY;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
