class HelperFunctions {

  static rectIntersects(aCenterX, aCenterY, aWidth, aHeight, bCenterX, bCenterY, bWidth, bHeight) {
    if (HelperFunctions.intersects(aCenterX - aWidth / 2, aCenterX + aWidth / 2, bCenterX - bWidth / 2, bCenterX + bWidth / 2)) {
      if (HelperFunctions.intersects(aCenterY - aHeight / 2, aCenterY + aHeight / 2, bCenterY - bHeight / 2, bCenterY + bHeight / 2)) {
        return true;
      }
    }
    return false;
  }

  static intersects(a1, a2, b1, b2) {
    if (a2 < b1) {
      return false;
    }
    if (a1 > b2) {
      return false;
    }

    return true;
  }

  static collideWithAsteroid(obj, asteroids) {
    for (var i = 0; i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      if (HelperFunctions.rectIntersects(obj.centerX, obj.centerY, obj.width, obj.height, asteroid.getCenterX(), asteroid.getCenterY(), asteroid.getWidth(), asteroid.getHeight())) {
        return i;
      }
    }
    return -1;
  }

  static leaveScreen(obj, canvasWidth, canvasHeight) {
    // detect whether asteroid goes off the screen
    if (canvasWidth < obj.getCenterX() - obj.getWidth()) {
      return true;
    } else if (0 > obj.getCenterX() + obj.getWidth()) {
      return true;
    } else if (canvasHeight < obj.getCenterY() - obj.getHeight()) {
      return true;
    } else if (0 > obj.getCenterY() + obj.getHeight()) {
      return true;
    }
    return false;
  }

  // creates a new hammer and adds it to the list of hammers
  static createHammer(mouseX, mouseY, centerX, centerY) {
    var angle = 180 + Math.atan2(centerY - mouseY, centerX - mouseX) * 180 / Math.PI;
    return new Hammer(centerX, centerY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, angle);
  }

  // creates a new asteroid and adds it to the list of asteroids
  static createAsteroid(canvasWidth, canvasHeight) {
    //centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight
    var entering = Math.floor((Math.random() * 4));
    if (entering == 0) {
      var centerX = Math.floor((Math.random() * canvasWidth));
      var centerY = 0;
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 8) - 4);
      var speedY = Math.floor((Math.random() * 3) + 1);
      return new Asteroid(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight);
    } else if (entering == 1) {
      var centerX = Math.floor((Math.random() * canvasWidth));
      var centerY = canvasHeight;
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 8) - 4);
      var speedY = - Math.floor((Math.random() * 3) + 1);
      return new Asteroid(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight);
    } else if (entering == 2) {
      var centerX = 0;
      var centerY = Math.floor((Math.random() * canvasHeight));
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 3) + 1);
      var speedY = Math.floor((Math.random() * 8) - 4);
      return new Asteroid(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight);
    } else if (entering == 3) {
      var centerX = canvasWidth;
      var centerY = Math.floor((Math.random() * canvasHeight));
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = - Math.floor((Math.random() * 3) + 1);
      var speedY = Math.floor((Math.random() * 8) - 4);
      return new Asteroid(centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight);
    }
  }
}
