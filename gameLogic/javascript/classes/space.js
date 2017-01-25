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
    this.leftPlanets = CANVAS_WIDTH;
    this.imgPlanets = new Array();
    this.imgPlanets.push(document.getElementById("planet1"));
    this.imgPlanets.push(document.getElementById("planet2"));
    this.imgPlanets.push(document.getElementById("planet3"));
    this.imgPlanets.push(document.getElementById("planet4"));
    this.imgPlanets.push(document.getElementById("planet5"));
    this.imgPlanets.push(document.getElementById("planet6"));
    this.planetTime = Date.now();
    this.currPlanet = 0;
  }

  // this is really ugly right now, but it works, so I'm gonna keep it as is for now
  update() {
    var pixelsPerSecond = 30;
    this.left = (-15 * (Date.now() - this.originTime) / 1000) % (this.imgSpaceBack.naturalWidth * 2);
    var lgStarsWidth = this.imgSpaceLgStars.naturalWidth * CANVAS_HEIGHT / this.imgSpaceLgStars.naturalHeight;
    this.leftLgStars = (-100 * (Date.now() - this.originTime) / 1000) % (lgStarsWidth);
    var smStarsWidth = this.imgSpaceSmStars.naturalWidth * CANVAS_HEIGHT / this.imgSpaceSmStars.naturalHeight;
    this.leftSmStars = (-70 * (Date.now() - this.originTime) / 1000) % (smStarsWidth);
    this.leftPlanets = CANVAS_WIDTH + (-25 * (Date.now() - this.planetTime) / 1000);
    if (this.leftPlanets < -CANVAS_WIDTH) {
      this.leftPlanets = CANVAS_WIDTH;
      this.planetTime = Date.now();
      this.currPlanet += 1;
    }
  }

  draw(canvas) {
    canvas.drawImage(this.imgSpaceBack, this.left, 0, this.imgSpaceBack.naturalWidth * 2, CANVAS_HEIGHT);
    canvas.drawImage(this.imgSpaceBack, this.left + this.imgSpaceBack.naturalWidth * 2 - 5, 0, this.imgSpaceBack.naturalWidth, CANVAS_HEIGHT);
    var planetsHeight = CANVAS_HEIGHT / 4 * 3;
    canvas.drawImage(this.imgPlanets[this.currPlanet], this.leftPlanets, CANVAS_HEIGHT / 2, planetsHeight, planetsHeight * (Math.pow(-1, this.currPlanet)));
    var lgStarsWidth = this.imgSpaceLgStars.naturalWidth * CANVAS_HEIGHT / this.imgSpaceLgStars.naturalHeight;
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars, 0, lgStarsWidth, CANVAS_HEIGHT);
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars + lgStarsWidth, 0, lgStarsWidth, CANVAS_HEIGHT);
    canvas.drawImage(this.imgSpaceLgStars, this.leftLgStars + lgStarsWidth * 2, 0, lgStarsWidth, CANVAS_HEIGHT);
    var smStarsWidth = this.imgSpaceSmStars.naturalWidth * CANVAS_HEIGHT / this.imgSpaceSmStars.naturalHeight;
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars, 0, smStarsWidth, CANVAS_HEIGHT);
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars + smStarsWidth, 0, smStarsWidth, CANVAS_HEIGHT);
    canvas.drawImage(this.imgSpaceSmStars, this.leftSmStars + smStarsWidth * 2, 0, smStarsWidth, CANVAS_HEIGHT);

    // var planetsWidth = this.imgSpaceSmStars.naturalWidth * this.canvasHeight / this.imgSpaceSmStars.naturalHeight;

  }
}
