class Stats {
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  update() {
  }

  getColor(oxygen) {
    // green for first half
    if (oxygen > 50) {
      return "#32CD32";
    } else if (oxygen > 30) {
      return "#ffff00";
    } else {
      return "#ff0000";
    }
  }

  draw(canvas, oxygen) {
    // make oxygen background black
    canvas.fillStyle = "#000000";
    canvas.fillRect(this.left, this.top, this.width, this.height);
    // draw
    canvas.fillStyle = this.getColor(oxygen); // make oxygen pure red
    canvas.fillRect(this.left, this.top, this.width * oxygen / 100, this.height);
    if (oxygen < 30) {
      canvas.fillStyle = "rgba(255, 255, 255, " + (oxygen % 2) / 2 + ")";
      canvas.fillRect(this.left, this.top, this.width * oxygen / 100, this.height);
    }
    // write oxygen
    canvas.fillStyle = "#ffffff";
    canvas.textAlign = "center";
    canvas.font = "18px serif";
    canvas.fillText("Oxygen", this.left + this.width / 2, this.top + this.height / 2);
  }
}
