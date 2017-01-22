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

  static getDirectionX(direction) {
    return Math.cos(direction * Math.PI / 180);
  }

  static getDirectionY(direction) {
    return Math.sin(direction * Math.PI / 180);
  }

  // creates a new hammer and adds it to the list of hammers
  static createHammer(mouseX, mouseY, centerX, centerY) {
    var angle = 180 + Math.atan2(centerY - mouseY, centerX - mouseX) * 180 / Math.PI;
    var startTime = Date();
    var hammerId = firebase.database().ref().push().key;
    setHammers(centerX, centerY, angle, 1, startTime, hammerId);
    return new Hammer(centerX, centerY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, angle, ASTRONAUT_ID, startTime, hammerId);
  }

  // creates a new asteroid and adds it to the list of asteroids
  static createAsteroid(canvasWidth, canvasHeight) {
    //centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight
    var entering = Math.floor((Math.random() * 4));
    var astronautId = ASTRONAUT_ID;
    var startTime = Date();
    var type = ASTEROID_TYPE;
    var asteroidId = firebase.database().ref().push().key;
    if (entering == 0) {
      // top of screen
      var centerX = Math.floor((Math.random() * canvasWidth));
      var centerY = 0;
      var size = Math.floor((Math.random() * 3) + 1);
      var speed = Math.floor((Math.random() * 60) + 20);
      var direction = Math.random() * 180 + 90;
      return new Asteroid(centerX, centerY, size, speed, canvasWidth, canvasHeight, direction, astronautId, startTime, type, asteroidId);
    } else if (entering == 1) {
      // right of screen
      var centerX = Math.floor((Math.random() * canvasWidth));
      var centerY = canvasHeight;
      var size = Math.floor((Math.random() * 3) + 1);
      var speed = Math.floor((Math.random() * 60) + 20);
      var direction = Math.random() * 180 + 180;
      return new Asteroid(centerX, centerY, size, speed, canvasWidth, canvasHeight, direction, astronautId, startTime, type, asteroidId);
    } else if (entering == 2) {
      // bottom of screen
      var centerX = 0;
      var centerY = Math.floor((Math.random() * canvasHeight));
      var size = Math.floor((Math.random() * 3) + 1);
      var speed = Math.floor((Math.random() * 60) + 20);
      var direction = Math.random() * 180 + 270;
      return new Asteroid(centerX, centerY, size, speed, canvasWidth, canvasHeight, direction, astronautId, startTime, type, asteroidId); 
    } else if (entering == 3) {
      // left of screen
      var centerX = canvasWidth;
      var centerY = Math.floor((Math.random() * canvasHeight));
      var size = Math.floor((Math.random() * 3) + 1);
      var speed = Math.floor((Math.random() * 60) + 20);
      var direction = Math.random() * 180 + 90;
      return new Asteroid(centerX, centerY, size, speed, canvasWidth, canvasHeight, direction, astronautId, startTime, type, asteroidId);
    }
  }
}
