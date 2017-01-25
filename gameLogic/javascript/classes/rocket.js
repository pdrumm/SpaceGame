class Rocket extends Base {

  constructor(centerX, centerY) {
    super(centerX, centerY, Rocket.WIDTH, Rocket.HEIGHT, Rocket.IMAGE_ROCKET);
    this.angle = 90;
    this.flame1 = document.getElementById(Rocket.IMAGE_FLAME1);
    this.flame2 = document.getElementById(Rocket.IMAGE_FLAME2);
    this.flame3 = document.getElementById(Rocket.IMAGE_FLAME3);

    let flameCenterX = this.centerX - this.width * 2 / 1.5;
    let flameCenterY = this.centerY;
    let flameWidth = this.width / 2;
    let flameHeight = this.height / 2;
    this.flame_1 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME1);
    this.flame_1.angle = 90;
    this.flame_2 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME2);
    this.flame_2.angle = 90;
    this.flame_3 = new Base(flameCenterX, flameCenterY, flameWidth, flameHeight, Rocket.IMAGE_FLAME3);
    this.flame_3.angle = 90;
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

Rocket.WIDTH = 50;
Rocket.HEIGHT = 100;
Rocket.IMAGE_ROCKET = "rocket";
Rocket.IMAGE_FLAME1 = "flame1";
Rocket.IMAGE_FLAME2 = "flame2";
Rocket.IMAGE_FLAME3 = "flame3";
