class Space {

  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imgSpaceBack = document.getElementById("space_back");
    this.imgSpaceLgStars = document.getElementById("space_lgStars");
    this.imgSpaceSmStars = document.getElementById("space_smStars");
    this.originTime = Date.now();
    this.left = 0;
  }

  update() {
    var pixelsPerSecond = 30;
    this.left = (-pixelsPerSecond * (Date.now() - this.originTime) / 1000) % (this.canvasWidth * 2);
  }

  draw(canvas) {
    canvas.drawImage(this.imgSpaceBack, this.left, 0, this.canvasWidth * 2, this.canvasHeight);
    canvas.drawImage(this.imgSpaceBack, this.left + this.canvasWidth * 2, 0, this.canvasWidth * 2, this.canvasHeight);
  }
}
