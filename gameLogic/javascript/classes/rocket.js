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
