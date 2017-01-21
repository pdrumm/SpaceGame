class Base {

  constructor(centerX, centerY, width, height, canvasWidth, canvasHeight, img) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lastTime = Date.now();
    this.speedX = 0;
    this.speedY = 0;
    this.img = document.getElementById(img);
  }

  draw(canvas) {
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
