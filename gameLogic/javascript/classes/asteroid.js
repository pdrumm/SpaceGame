class Asteroid {

  constructor(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.size = size;
    this.width = size * 20;
    this.height = size * 20;
    this.color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);;
    this.angle = angle;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lastTime = Date.now();
    this.speedX = speedX;
    this.speedY = speedY;
    this.img = document.getElementById("asteroid");
  }

  update() {
    this.centerX += this.speedX;
    this.centerY += this.speedY;

    // detect whether asteroid goes off the screen
    if (this.canvasWidth < this.centerX - this.width) {
      return true;
    } else if (0 > this.centerX + this.width) {
      return true;
    } else if (this.canvasHeight < this.centerY - this.height) {
      return true;
    } else if (0 > this.centerY + this.height) {
      return true;
    }

    this.lastTime = Date.now();
    return false;
  }

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.translate(this.centerX, this.centerY);
    canvas.rotate(this.angle * Math.PI / 180);
    canvas.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    canvas.rotate(- this.angle * Math.PI / 180);
    canvas.translate(- this.centerX, - this.centerY);

  }

  collideWithHammer(hammers) {
    for (var i = 0; i < hammers.length; i++) {
      var hammer = hammers[i];
      if (this.intersects(this.centerX - this.width / 2, this.centerX + this.width / 2, hammer.getCenterX() - hammer.getWidth() / 2, hammer.getCenterX() + hammer.getWidth() / 2)) {
        if (this.intersects(this.centerY - this.height / 2, this.centerY + this.height / 2, hammer.getCenterY() - hammer.getHeight() / 2, hammer.getCenterY() + hammer.getHeight() / 2)) {
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
