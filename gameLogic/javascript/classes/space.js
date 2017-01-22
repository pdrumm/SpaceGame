class Space {

  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imgSpaceBack = document.getElementById("space_back");
    this.imgSpaceLgStars = document.getElementById("space_lgStars");
    this.imgSpaceSmStars = document.getElementById("space_smStars");
    this.originTime = Date.now();
    this.left = 0;
    this.leftLgStars = 0;
    this.leftSmStars = 0;
  }

  // this is really ugly right now, but it works, so I'm gonna keep it as is for now
  update() {
    var pixelsPerSecond = 30;
    console.log(this.imgSpaceBack.naturalWidth);
    this.left = (-pixelsPerSecond * (Date.now() - this.originTime) / 1000) % (this.imgSpaceBack.naturalWidth * 2);
    var lgStarsWidth = this.imgSpaceLgStars.naturalWidth * this.canvasHeight / this.imgSpaceLgStars.naturalHeight;
    this.leftLgStars = (-100 * (Date.now() - this.originTime) / 1000) % (lgStarsWidth);
    var smStarsWidth = this.imgSpaceSmStars.naturalWidth * this.canvasHeight / this.imgSpaceSmStars.naturalHeight;
    this.leftSmStars = (-70 * (Date.now() - this.originTime) / 1000) % (smStarsWidth);
  }

  draw(canvas) {
    canvas.drawImage(this.imgSpaceBack, this.left, 0, this.imgSpaceBack.naturalWidth * 2, this.canvasHeight);
    canvas.drawImage(this.imgSpaceBack, this.left + this.imgSpaceBack.naturalWidth * 2 - 5, 0, this.imgSpaceBack.naturalWidth, this.canvasHeight);
    var lgStarsWidth = this.imgSpaceLgStars.naturalWidth * this.canvasHeight / this.imgSpaceLgStars.naturalHeight;
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars, 0, lgStarsWidth, this.canvasHeight);
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars + lgStarsWidth, 0, lgStarsWidth, this.canvasHeight);
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars + lgStarsWidth * 2, 0, lgStarsWidth, this.canvasHeight);
    var smStarsWidth = this.imgSpaceSmStars.naturalWidth * this.canvasHeight / this.imgSpaceSmStars.naturalHeight;
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars, 0, smStarsWidth, this.canvasHeight);
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars + smStarsWidth, 0, smStarsWidth, this.canvasHeight);
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars + smStarsWidth * 2, 0, smStarsWidth, this.canvasHeight);
  }
}
