class Rocket {

  constructor(centerX, centerY, width, height) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);;
  }

  update() {

  }

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.centerX - this.width / 2, this.centerY - this.height / 2, this.width, this.height);
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
