class Stats {
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  update() {
  }

  draw(canvas, oxygen) {
    canvas.fillStyle = "#000000"; // make oxygen pure red
    canvas.fillRect(this.left, this.top, this.width, this.height);
    canvas.fillStyle = "#ff0000"; // make oxygen pure red
    canvas.fillRect(this.left, this.top, this.width * oxygen / 100, this.height);
    canvas.fillStyle = "#ffffff";
    canvas.textAlign = "center";
    canvas.font = "18px serif";
    canvas.fillText("Oxygen", this.left + this.width / 2, this.top + this.height / 2);
  }
}
