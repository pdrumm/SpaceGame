class Rocket extends Base {

  constructor(centerX, centerY) {
    super(centerX, centerY, Rocket.WIDTH, Rocket.HEIGHT, Rocket.IMAGE_ROCKET, Rocket.ANGLE);

    let flameCenterX = this.centerX - this.width * 2 / 1.5;
    let flameCenterY = this.centerY;
    let flameWidth = this.width / 2;
    let flameHeight = this.height / 2;
    let flameAngle = this.angle;
    /*
      BUG
      the flames only draw correctly if the rocket is at an angle of 90.
      otherwise, the flames will be drawn in an incorrect position.
    */
    this.flame_1 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME1, flameAngle);
    this.flame_2 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME2, flameAngle);
    this.flame_3 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME3, flameAngle);
  }

  draw(canvas) {
    this.getCurrentFlame().draw(canvas);
    super.draw(canvas);
  }

  getCurrentFlame() {
    let currentFlame;
    let flameTime = Math.floor(Date.now() / 150) % 4;
    switch(flameTime) {
      case 0:
          currentFlame = this.flame_1;
          break;
      case 2:
          currentFlame = this.flame_3;
          break;
      default:
          currentFlame = this.flame_2;
    }
    return currentFlame;
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

// constants for Rocket class
Rocket.WIDTH = 50;
Rocket.HEIGHT = 100;
Rocket.ANGLE = 90;
Rocket.IMAGE_ROCKET = "rocket";
Rocket.IMAGE_FLAME1 = "flame1";
Rocket.IMAGE_FLAME2 = "flame2";
Rocket.IMAGE_FLAME3 = "flame3";
