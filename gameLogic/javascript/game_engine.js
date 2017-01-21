class GameEngine {

  constructor(width, height, canvas) {
    this.CANVAS_WIDTH = width; //window.innerWidth;
    this.CANVAS_HEIGHT = height; // window.innerHeight;
    this.canvas = canvas;
    this.init();
  }

  init() {
    this.rocket = new Rocket(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2, 50, 50);
    this.astronaut = new Astronaut(100, 100, 20, 20, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.asteroids = new Array();
    this.hammers = new Array();
    this.createAsteroid();
    this.lastAsteroid = Date.now();
    this.keys = new Array();
    this.gameOver = false;
  }

  update() {
    if (Date.now() - this.lastAsteroid > 500) {
      this.createAsteroid();
      this.lastAsteroid = Date.now();
    }

    // this.player.update(this.bricks, this.keys);
    this.astronaut.update(this.keys);
    for (var i = 0; i < this.asteroids.length; i++) {
      var remove = this.asteroids[i].update();
      if (remove) {
        this.asteroids.splice(i, 1);
        i += -1;
      }
    }

    for (var i = 0; i < this.hammers.length; i++) {
      var remove = this.hammers[i].update();
      if (remove) {
        this.hammers.splice(i, 1);
        i += -1;
      }
    }

    this.collisions();
  }

  // detects any collisions
  collisions() {
    for (var i = 0; i < this.asteroids.length; i++) {
      var index = this.asteroids[i].collideWithHammer(this.hammers);
      if (index != -1) {
        this.asteroids.splice(i, 1);
        this.hammers.splice(index, 1);
        i += -1;
      }
    }

    var dead = this.astronaut.collideWithAsteroid(this.asteroids);
    if (dead != -1) {
      this.gameOver = true;
    }

    var crash = this.rocket.collideWithAsteroid(this.asteroids);
    if (crash != -1) {
      this.gameOver = true;
    }
  }

  draw() {
    // resetting canvas
    this.canvas.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.canvas.fillStyle = "#C0E3C0";
    this.canvas.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    // rocket
    this.rocket.draw(this.canvas);
    // astronaut
    this.astronaut.draw(this.canvas);
    // asteroids
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.canvas);
    }
    // hammers
    for (var i = 0; i < this.hammers.length; i++) {
      this.hammers[i].draw(this.canvas);
    }
    // game over screen
    if (this.gameOver) {
      canvas.fillStyle = "#000000";
      canvas.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
      canvas.fillStyle = "#666666";
      canvas.textAlign = "center";
      canvas.font = "18px serif";
      canvas.fillText("Game Over :( Spacebar to play again", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    }
  }

  // when a key is pressed down
  keyDownHandler(event) {
    var keyPressed = event.key.toLowerCase();
    if (!this.keys.includes(keyPressed)) {
        this.keys.push(keyPressed);
    }
  }

  // when a key is released
  keyUpHandler(event) {
    var keyPressed = event.key.toLowerCase();
    if(this.keys.includes(keyPressed)) {
      this.keys.splice(this.keys.indexOf(keyPressed), 1);
    }
    if (this.gameOver && keyPressed == " ") {
      this.init();
    }
  }

  // when the mouse is clicked
  mouseDownHandler(event) {
    this.createHammer(event.pageX - 24, event.pageY - 8);
  }

  // creates a new asteroid and adds it to the list of asteroids
  createAsteroid() {
    //centerX, centerY, size, angle, speedX, speedY, canvasWidth, canvasHeight
    var entering = Math.floor((Math.random() * 4));
    if (entering == 0) {
      var centerX = Math.floor((Math.random() * this.CANVAS_WIDTH));
      var centerY = 0;
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 8) - 4);
      var speedY = Math.floor((Math.random() * 3) + 1);
      this.asteroids.push(new Asteroid(centerX, centerY, size, angle, speedX, speedY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
    } else if (entering == 1) {
      var centerX = Math.floor((Math.random() * this.CANVAS_WIDTH));
      var centerY = this.CANVAS_HEIGHT;
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 8) - 4);
      var speedY = - Math.floor((Math.random() * 3) + 1);
      this.asteroids.push(new Asteroid(centerX, centerY, size, angle, speedX, speedY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
    } else if (entering == 2) {
      var centerX = 0;
      var centerY = Math.floor((Math.random() * this.CANVAS_HEIGHT));
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = Math.floor((Math.random() * 3) + 1);
      var speedY = Math.floor((Math.random() * 8) - 4);
      this.asteroids.push(new Asteroid(centerX, centerY, size, angle, speedX, speedY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
    } else if (entering == 3) {
      var centerX = this.CANVAS_WIDTH;
      var centerY = Math.floor((Math.random() * this.CANVAS_HEIGHT));
      var size = Math.floor((Math.random() * 3) + 1);
      var angle = Math.floor((Math.random() * 360));
      var speedX = - Math.floor((Math.random() * 3) + 1);
      var speedY = Math.floor((Math.random() * 8) - 4);
      this.asteroids.push(new Asteroid(centerX, centerY, size, angle, speedX, speedY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
    }

  }

  // creates a new hammer and adds it to the list of hammers
  createHammer(mouseX, mouseY) {
    // centerX, centerY, speedX, speedY, canvasWidth, canvasHeight
    var centerX = this.astronaut.getCenterX();
    var centerY = this.astronaut.getCenterY();
    var angle = 180 + Math.atan2(centerY - mouseY, centerX - mouseX) * 180 / Math.PI;
    var speedX = 0;
    var speedY = 0;
    var boost = 10;
    if (angle < 90) {
      speedX = (90 - angle) / 90 * boost;
      speedY = (angle) / 90 * boost;
    } else if (angle < 180) {
      angle = angle - 90;
      speedX = - (angle) / 90 * boost;
      speedY = (90 - angle) / 90 * boost;
    } else if (angle < 270) {
      angle = angle - 180;
      speedX = - (90 - angle) / 90 * boost;
      speedY = (- angle) / 90 * boost;
    } else if (angle < 360) {
      angle = angle - 270;
      speedX = (angle) / 90 * boost;
      speedY = - (90 - angle) / 90 * boost;
    }
    this.hammers.push(new Hammer(centerX, centerY, speedX, speedY, this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
  }

}
