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
}
