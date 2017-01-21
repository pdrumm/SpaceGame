class Hammer {

  constructor(centerX, centerY, speedX, speedY, canvasWidth, canvasHeight) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = 20;
    this.height = 20;
    this.color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);;
    this.angle = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lastTime = Date.now();
    this.speedX = speedX;
    this.speedY = speedY;
    this.img = document.getElementById("hammer");
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

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.translate(this.centerX, this.centerY);
    canvas.rotate(this.angle * Math.PI / 180);
    canvas.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    canvas.rotate(- this.angle * Math.PI / 180);
    canvas.translate(- this.centerX, - this.centerY);

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
