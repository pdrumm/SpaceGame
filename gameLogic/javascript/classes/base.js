class Base {

  constructor(centerX, centerY, width, height, img, angle=0) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
    this.img = document.getElementById(img);
    this.angle = angle;

    this.lastTime = Date.now();
    this.speedX = 0;
    this.speedY = 0;
  }

  draw(canvas) {
    canvas.translate(this.centerX, this.centerY);
    canvas.rotate(this.angle * Math.PI / 180);
    canvas.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    canvas.rotate(-this.angle * Math.PI / 180);
    canvas.translate(-this.centerX, - this.centerY);
  }
}
