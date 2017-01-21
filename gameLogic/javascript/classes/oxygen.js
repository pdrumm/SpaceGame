class Oxygen extends Base {
  constructor(centerX, centerY, width, height) {
    super(centerX, centerY, width, height, 0, 0, "astronaut");
    this.oxygen = 100;
  }

  update() {
    this.oxygen = this.oxygen - (Date.now() - this.lastTime) / 100;
    this.lastTime = Date.now();
    return this.oxygen <= 0;
  }

  draw(canvas) {
    //canvas.fillStyle = "#ff0000"; // make oxygen pure red
    canvas.fillStyle = "rgba(255, 0, 0, 0.5)"; // make oxygen transparent
    canvas.fillRect(0, this.centerY - this.height / 2, this.width * this.oxygen / 100, this.height);
    canvas.fillStyle = "#000000";
    canvas.textAlign = "center";
    canvas.font = "18px serif";
    canvas.fillText("Oxygen", this.centerX, this.centerY);
  }
}
