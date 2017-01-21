class Rocket extends Base {

  constructor(centerX, centerY, width, height) {
    super(centerX, centerY, width, height, 0, 0, "RocketShip");
  }

  collideWithAsteroid(asteroids) {
    return HelperFunctions.collideWithAsteroid(this, asteroids);
  }
}
