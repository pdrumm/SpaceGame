class Rocket extends Base {

  constructor(centerX, centerY, width, height) {
    super(centerX, centerY, width, height, 0, 0, "rocket");
    this.angle = 90;
    this.flame1 = document.getElementById("flame1");
    this.flame2 = document.getElementById("flame2");
    this.flame3 = document.getElementById("flame3");
  }

  draw(canvas) {
    // this is kinda sloppy, but it works so I'm gonna keep it for now
    canvas.translate(this.centerX - this.width / 2, this.centerY);
    canvas.rotate(this.angle * Math.PI / 180);
    //canvas.drawImage(this.flame1, -this.centerX, -this.centerY, this.width / 2, this.height / 2);
    var flameTime = Math.floor(Date.now() / 100) % 4;
    var currFlame = this.flame1;
    if (flameTime == 0) {
      currFlame = this.flame2;
    } else if (flameTime == 1) {
      currFlame = this.flame3;
    } else if (flameTime == 2) {
      currFlame = this.flame2;
    }
    canvas.drawImage(currFlame, -this.width / 4, 10, this.width / 2, this.height / 2);
    canvas.rotate(- this.angle * Math.PI / 180);
    canvas.translate(- this.centerX + this.width / 2, - this.centerY);
    super.draw(canvas);
  }

  collideWithAsteroid(asteroids) {
    //return HelperFunctions.collideWithAsteroid(this, asteroids);
    for (var i = 0; i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      if (HelperFunctions.rectIntersects(this.centerX, this.centerY, this.height, this.width, asteroid.getCenterX(), asteroid.getCenterY(), asteroid.getWidth(), asteroid.getHeight())) {
        return i;
      }
    }
    return -1;
  }
}
